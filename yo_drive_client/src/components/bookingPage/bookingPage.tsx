import {useForm} from "react-hook-form";
import React, {useEffect, useState} from 'react';
import styles from './bookingPage.module.css';
import Header from '../header/header';
import FilterPanel from './filterPanel/filterPanel';
import {BookingPageModel, CarResponsePage, CarViewModel} from '../../models/Booking/CarBookingModel';
import galOpen from "../../assets/whgaloshkaClose.svg";
import galClose from "../../assets/whgalochkaOpen.svg"
import rows from "../../assets/rows.svg"
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'
import BookingService from "../../services/BookingService";
import CarCard from "./carCard/сarCard";
import Paginator from "./paginator/paginator";

export function BookingPage() {
    const [cars, setCars] = useState<CarResponsePage | undefined>();
    const [carsCout, setCarsCount] = useState<number>(0);
    const [selected, setSelected] = useState(galOpen);
    const [isExpanded, setExpanded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const {
        register,
        handleSubmit,
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit=(data:any) =>{
        toggleExpand();
    };

    const fetchData = async () => {
        try {
            const bookingPageModel: BookingPageModel = {
                page: {
                    pageNumber: currentPage,
                    pageSize: 10,
                },
                filter: {
                    // Заполните поля фильтра в соответствии с вашей логикой
                },
                sort: {
                    dir: 'asc', // Например, по умолчанию сортировка по возрастанию
                    field: 'fieldName', // Например, поле, по которому сортируем
                },
            };

            const response = await BookingService.getCarsByPage(bookingPageModel);
            setCars(response.data);
            setCarsCount(response.data.count)
            let totalPages = response.data.count / 10 == 0 ? response.data.count / 10 : (response.data.count / 10) + 1;
            setTotalPages(totalPages);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const toggleExpand = () => {
        setExpanded(!isExpanded);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    let listItems = cars?.items.map((car) =>
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
                        <p className={styles.subtitleFind}>(найдено {carsCout}):</p>
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
                <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export default BookingPage;