import {useForm} from "react-hook-form";
import React, {useEffect, useState} from 'react';
import styles from './bookingPage.module.css';
import Header from '../header/header';
import FilterPanel from './filterPanel/filterPanel';
import {CarViewModel} from '../../models/Booking/CarBookingModel';
import { GearBoxEnum } from "../../models/CarModel";
import galOpen from "../../assets/whgaloshkaClose.svg";
import galClose from "../../assets/whgalochkaOpen.svg"
import rows from "../../assets/rows.svg"
import BookingPopup from './Popup/bookingPagePopup';
import FeedbackPopup from './Popup/bookingPageFeedbackPopup'
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'
import BookingService from "../../services/BookingService";
import { Rating } from 'react-simple-star-rating';
import emptyImageCar from '../../assets/emptyImageCar.png';

export function BookingPage() {
    const [openCarId, setOpenCarId] = useState<number | null>(null);
    const [cars, setCars] = useState<CarViewModel[] | undefined>([]);
    const [selected, setSelected] = useState(galOpen);
    const [isExpanded, setExpanded] = useState(false);
    const [openCarIds, setOpenCarIds] = useState<{ [carId: number]: boolean }>({});

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

    const togglePopup = (carId: number) => {
      if (openCarId === carId) {
        setOpenCarId(null);
      } else {
        setOpenCarId(carId);
      }
    }

    const toggleExpand = () => {
        setExpanded(!isExpanded);
    };

    const toggleFeedbackPopup = (carId: number) => {
        setOpenCarIds((prevOpenCarIds) => {
            const isOpen = prevOpenCarIds[carId];
            return { ...prevOpenCarIds, [carId]: !isOpen };
        });
    };

    let listItems = cars?.map((car) =>
        <li key={car.carId} className={styles.catalogItem}>
            {car.image && (
                <img
                    src={`data:image/png;base64,${car.image}`}
                    alt={`${car.carModel.modelName}`}
                    width={'452px'} height={'194px'}
                />
            )}
            {!car.image && <img src={emptyImageCar} width={'452px'} height={'194px'}/>}
            <div className={styles.itemConteiner}>
                <div className={styles.catalogItemInfo}>
                    <p className={styles.carName}>{car.carModel.carBrand.name + " " + car.carModel.modelName}</p>
                    <button className={styles.carStars} onClick={() => toggleFeedbackPopup(car.carId)}>
                        <Rating size={22} readonly initialValue={car.rating} allowFraction fillColor="#CCB746" emptyColor="#D9D9D9" SVGstrokeColor="#CCB746" SVGstorkeWidth={1}/>
                        <p className={styles.carStarsNumber}>{car.rating}</p>
                    </button>
                    <FeedbackPopup isOpen={openCarIds[car.carId] || false} handleClose={() => toggleFeedbackPopup(car.carId)} carId={car.carId} />
                    <p className={styles.carYear}>{car.year} год выпуска</p>
                    <p className={styles.carBox}>{GearBoxEnum[car.gearBox]} коробка передач</p>
                    <p className={styles.carClass}>Тип кузова: {car.carClass.className}</p>
                </div>
                <div className={styles.itemConteinerPrice}>
                    <p className={styles.carPrice}>{car.costDay.toLocaleString('ru-RU')}₽/сутки</p>
                    <button className={styles.carButton} onClick={() => togglePopup(car.carId)}>Забронировать</button>
                    <BookingPopup carId={car.carId} isOpen={openCarId === car.carId} handleClose={() => togglePopup(car.carId)} />
                </div>
            </div>
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