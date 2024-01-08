import styles from './preview.module.css'
import rewiev from '../../../assets/rewiev.svg'
import trash from '../../../assets/trash.svg'
import React, {useEffect, useState, useRef} from "react";
import { CarViewModel} from "../../../models/Booking/CarBookingModel";
import {fetchCars, getCarClasses} from "../../../services/CarService";
import {Rating} from "react-simple-star-rating";
import {GearBoxEnum} from "../../../models/CarModel";
import emptyImageCar from '../../../assets/emptyImageCar.png';
import EditCarPopup from "./editCarPopUp"
import CarService from '../../../services/CarService';
import { Filter } from '../../../models/Booking/FilterBookingModel';
import { getCarsByFilter } from '../../../services/CarService';
interface FilterPopUpProps {
    filters: Filter;
}
function formatReviews(count: number) {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastDigit === 1 && lastTwoDigits !== 11) {
        return `${count} отзыв`;
    } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
        return `${count} отзыва`;
    } else {
        return `${count} отзывов`;
    }
}

const Preview: React.FC<FilterPopUpProps> = ({ filters }) => {
    const [cars, setCars] = useState<CarViewModel[] | undefined>([]);
    const [openCarId, setOpenCarId] = useState<number | null>(null);
    const togglePopup = (carId: number) => {
        if (openCarId === carId) {
          setOpenCarId(null);
        } else {
          setOpenCarId(carId);
        }
      }
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

    const fetchData = async () => {
        try {
          const response = await getCarsByFilter(filters);
      
          if (response) {
            setCars(response);
          } 
        } catch (error) {
          console.error('Error fetching cars:', error);
        }
      };
      
      useEffect(() => {
        fetchData();
      }, [filters]);

    let listItems = cars?.map((car) =>
        <li key={car.carId} className={styles.carBlock}>
            {car.image && (
                <img
                    src={`data:image/png;base64,${car.image}`}
                    alt={`${car.carModel.modelName}`}
                    className={styles.carImg}
                />
            )}
            {!car.image && <img src={emptyImageCar} className={styles.carImg}/>}
            <div className={styles.carInfo}>
                <div className={styles.infoHeader}>
                    <p className={styles.headerText}>{car.carModel.carBrand.name + ' ' + car.carModel.modelName}</p>
                </div>
                <div className={styles.infoText}>
                    <div className={styles.infoRewiev}>
                        <div className={styles.carStars}>
                            <Rating size={18} readonly initialValue={car.rating} allowFraction fillColor="#CCB746" emptyColor="#D9D9D9" SVGstrokeColor="#CCB746" SVGstorkeWidth={1}/>
                            <p className={styles.carStarsNumber}>{car.rating.toFixed(1)}</p>
                        </div>
                        <p className={styles.rewievQuantity}>{formatReviews(car.feedbackCount)}</p>
                    </div>
                    <p className={styles.infoYear}>{car.year} года выпуска</p>
                    <p className={styles.infoGearbox}>{GearBoxEnum[car.gearBox]} коробка передач</p>
                    <p className={styles.infoType}>Тип кузова: {car.carClass.className}</p>
                    <p className={styles.infoPrice}>{car.costDay}₽/сутки</p>
                </div>
            </div>
            <div className={styles.carTools}>
            <img className={styles.toolEdit} src={rewiev} onClick={()=>togglePopup(car.carId)}></img>
                <EditCarPopup car={car} isOpen={openCarId === car.carId} handleClose={() => togglePopup(car.carId)}/>
                <img className={styles.toolDelete} src={trash} onClick={() => handleDelete(car.carId)}></img>
            </div>
        </li>
    );
    return(
        <div className={styles.previewBlock}>
            <ul className={styles.carBlocks}>
                {listItems}
            </ul>
        </div>
    )
}

export default Preview;