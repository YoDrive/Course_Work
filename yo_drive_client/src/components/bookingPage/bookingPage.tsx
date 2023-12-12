import {useForm} from "react-hook-form";
import React, {useEffect, useState} from 'react';
import styles from './bookingPage.module.css';
import Header from '../header/header';
import FilterPanel from './filterPanel/filterPanel';
import {CarViewModel} from '../../models/Booking/CarBookingModel';
import galOpen from "../../assets/whgaloshkaClose.svg";
import galClose from "../../assets/whgalochkaOpen.svg"
import rows from "../../assets/rows.svg"
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'
import BookingService from "../../services/BookingService";
import CarCard from "./carCard/сarCard";

export function BookingPage() {
    const [cars, setCars] = useState<CarViewModel[] | undefined>([]);
    const [selected, setSelected] = useState(galOpen);
    const [isExpanded, setExpanded] = useState(false);

    const {
        register,
        handleSubmit,
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit=(data:any) =>{
        console.log(data);
        toggleExpand();
    };

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await BookingService.getAllCars();
                setCars(response.data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        }

        fetchCars();
    }, []);

    const toggleExpand = () => {
        setExpanded(!isExpanded);
    };

    let listItems = cars?.map((car) =>
        <li key={car.carId} className={styles.catalogItem}>
            <CarCard car={car}/>
        </li>
    );

    return (
        <div className={styles.bookingPageContainer}>
            <Header/>
            <h1 className={styles.title}>Бронирование автомобиля</h1>
            <div className={styles.catalogContainer}>
                <FilterPanel/>
                <div className={styles.subtitle}>
                    <div className={styles.subText}>
                        <p className={styles.subtitleText}>Автомобили </p>
                        <p className={styles.subtitleFind}>(найдено {listItems?.length}):</p>
                    </div>
                    <form className={styles.subSort} onClick={() => (isExpanded === false)&&(selected === galOpen) ? setSelected(galClose) : setSelected(galOpen)}  onChange={handleSubmit(onSubmit)} >
                        <div className={styles.subSortBtn} onClick={() => toggleExpand()}>
                            <img className={styles.sortGal} src={selected}></img>
                            <p className={styles.sortText}>Сортировка</p>
                            <img className={styles.sortRows} src={rows}></img>
                        </div>
                        <div className={styles.dropDown} style={{ height: isExpanded ? "100%" : "0px" }}>
                            <label className={styles.dropMenu}>
                                <input type="radio" value="По рейтингу" className={styles.dropBtn} 
                                {...register("sortType")}  onClick={()=> toggleExpand()}
                                    />
                                <p className={styles.btnText}>По рейтингу</p>
                            </label>
                            <label className={styles.dropMenu}>
                                <input type="radio" value="По цене" className={styles.dropBtn} 
                                {...register("sortType")} onClick={()=> toggleExpand()}
                                    />
                                <p className={styles.btnText}>По цене</p>
                            </label>
                        </div>
                    </form>
                </div>
                <ul className={styles.catalog}>{listItems}</ul>
            </div>
        </div>
    );
}

export default BookingPage;