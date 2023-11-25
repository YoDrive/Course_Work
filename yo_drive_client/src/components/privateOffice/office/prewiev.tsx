import styles from './prewiev.module.css'
import rewiev from '../../../assets/rewiev.svg'
import stars from '../../../assets/stars.svg'
import trash from '../../../assets/trash.svg'
import React, {useEffect, useState} from "react";
import {CarBookingModel, GearBoxEnum} from "../../../models/Booking/CarBookingModel";
import CarService, {fetchCars} from "../../../services/CarService";
import {Rating} from "react-simple-star-rating";

export function Prewiev(){
    const [cars, setCars] = useState<CarBookingModel[] | undefined>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchCars();
                setCars(response);
            } catch (error) {
                alert('Ошибка сервера.');
            }
        }

        fetchData();
    }, []);

    const handleDelete = async (carId: number) => {
        try {
            const response = await CarService.DeleteCar(carId);
            if (response) {
                const carsData = await fetchCars();
                setCars(carsData);
            }
        } catch (error) {
            alert('Ошибка сервера.');
        }
    };

    let listItems = cars?.map((car) =>
        <li key={car.carId} className={styles.carBlock}>
            <img src={car.carImage} className={styles.carImg}/>
            <div className={styles.carInfo}>
                <div className={styles.infoHeader}>
                    <p className={styles.headerText}>{car.carModel.carBrand.name + ' ' + car.carModel.modelName}</p>
                </div>
                <div className={styles.infoText}>
                    <div className={styles.infoRewiev}>
                        <div className={styles.carStars}>
                            <Rating size={18} readonly initialValue={car.rating} allowFraction fillColor="#CCB746" emptyColor="#D9D9D9" SVGstrokeColor="#CCB746" SVGstorkeWidth={1}/>
                            <p className={styles.carStarsNumber}>{car.rating}</p>
                        </div>
                        <p className={styles.rewievQuantity}>{car.feedbackCount} отзывов</p>
                    </div>
                    <p className={styles.infoYear}>{car.year} года выпуска</p>
                    <p className={styles.infoGearbox}>{GearBoxEnum[car.gearBox]} коробка передач</p>
                    <p className={styles.infoType}>Тип кузова: {car.carClass.className}</p>
                    <p className={styles.infoPrice}>{car.costDay}₽/сутки</p>
                </div>
            </div>
            <div className={styles.carTools}>
                <img className={styles.toolEdit} src={rewiev}></img>
                <img className={styles.toolDelete} src={trash} onClick={() => handleDelete(car.carId)}></img>
            </div>
        </li>
    );


    return(
        <div className={styles.prewievBlock}>
            <ul className={styles.carBlocks}>
                {listItems}
            </ul>
        </div>
    )
}