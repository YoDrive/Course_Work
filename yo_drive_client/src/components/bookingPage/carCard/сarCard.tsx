import React, {FunctionComponent, useState} from 'react';
import {CarViewModel} from "../../../models/Booking/CarBookingModel";
import emptyImageCar from "../../../assets/emptyImageCar.png";
import styles from "./сarCard.module.css";
import {Rating} from "react-simple-star-rating";
import FeedbackPopup from "../popup/bookingPageFeedbackPopup";
import {GearBoxEnum} from "../../../models/CarModel";
import BookingPopup from "../popup/bookingPagePopup";

interface CarCardProps {
    car: CarViewModel;
}

const CarCard : FunctionComponent<CarCardProps> = (props) => {
    const { car } = props;
    const [openCarIds, setOpenCarIds] = useState<{ [carId: number]: boolean }>({});
    const [openCarId, setOpenCarId] = useState<number | null>(null);

    const toggleFeedbackPopup = (carId: number) => {
        setOpenCarIds((prevOpenCarIds) => {
            const isOpen = prevOpenCarIds[carId];
            return { ...prevOpenCarIds, [carId]: !isOpen };
        });
    };

    const togglePopup = (carId: number) => {
        if (openCarId === carId) {
            setOpenCarId(null);
        } else {
            setOpenCarId(carId);
        }
    }

    return(
        <>
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
        </>
    )
};

export default CarCard;