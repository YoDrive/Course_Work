import React, {FunctionComponent, useEffect, useState} from "react";
import styles from "./bookingPagePopup.module.css"
import {CarViewModel} from '../../../models/Booking/CarBookingModel';
import {DateRange} from 'react-date-range';
import {BookingAdd} from "../../../models/Booking/BookingAddModel";
import BookingService from "../../../services/BookingService";
import emptyImageCar from "../../../assets/emptyImageCar.png";
import {GearBoxEnum} from "../../../models/CarModel";
import ru from "date-fns/locale/ru";
import {format} from "date-fns";
import CarService from "../../../services/CarService";


interface PopupProps {
    handleClose: () => void;
    carId: number;
    isOpen: boolean;
}

const BookingPopup: FunctionComponent<PopupProps> = (props) => {
    const {carId, isOpen, handleClose} = props;
    const [car, setCar] = useState<CarViewModel | undefined>(undefined);
    const [selectedDate, setSelectedDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);

    const handleDateChange = (ranges: any) => {
        setSelectedDate([ranges.selection]);
    };

    useEffect(() => {
        async function fetchCar() {
            try {
                const response = await CarService.getCarById(carId);
                setCar(response.data);
            } catch (error) {
                console.error('Error fetching car:', error);
            }
        }

        // Выполняем запрос только при открытии попапа
        if (isOpen) {
            fetchCar();
        }
    }, [isOpen, carId]);

    const formatDate = (date: any) => {
        return format(date, 'dd.MM.yy');
    };

    const daysDifference = Math.floor((selectedDate[0].endDate.getTime() - selectedDate[0].startDate.getTime()) / (1000 * 3600 * 24)) + 1;
    const rentCost= daysDifference * (car == undefined ? 0 : car.costDay)

    const handleBooking = async () => {
        const bookingData: BookingAdd = {
            userId: 1,
            carId: carId,
            startDate: selectedDate[0].startDate,
            endDate: selectedDate[0].endDate,
            rentCost: rentCost
        };
        try {
            console.log(bookingData)
            const response = await BookingService.booking(bookingData);

            if (response.status === 201) {
                alert('Бронирование успешно отправлено.');
            }
        } catch (error) {
            alert('Ошибка при бронировании.');
        }

        handleClose();
    };

    return (
        car == undefined ?
            <div className={styles.popupBox} style={{display: isOpen ? "block" : "none"}}>
                Ошибка сервера, попробуйте позже.
            </div>
            :
            <div className={styles.popupBox} style={{display: isOpen ? "block" : "none"}}>
                <div className={styles.box}>
                    <div className={styles.popupClose}><span className={styles.popupCloseIcon}
                                                             onClick={handleClose}>x</span></div>
                    <p className={styles.popupTitle}>Бронирование автомобиля</p>
                    <div className={styles.popupItem}>
                        <div className={styles.popupItemInfo}>
                            {car.image && (
                                <img
                                    src={`data:image/png;base64,${car.image}`}
                                    alt={`${car.carModel.modelName}`}
                                    width={'452px'} height={'194px'}
                                />
                            )}
                            {!car.image && <img src={emptyImageCar} width={'452px'} height={'194px'}/>}
                            <p className={styles.popupСarName}>{car.carModel.carBrand.name + ' ' + car.carModel.modelName}</p>
                            <p className={styles.popupСarYear}>{car.year} год выпуска</p>
                            <p className={styles.popupСarBox}>{GearBoxEnum[car.gearBox]} коробка передач</p>
                            <p className={styles.popupСarClass}>Тип кузова: {car.carClass.className}</p>
                            <p className={styles.popupDayCost}>Тариф: <span
                                className={styles.popupHighlight}>{car.costDay.toLocaleString('ru-RU')}</span> ₽/сутки
                            </p>
                        </div>
                        <div>
                            <DateRange
                                ranges={selectedDate}
                                onChange={handleDateChange}
                                editableDateInputs={true}
                                moveRangeOnFirstSelection={false}
                                locale={ru}
                            />
                            <div className={styles.popupBookingInfo}>
                                <p className={styles.popupDateRangeText}>Срок бронирования: </p>
                                <p className={styles.popupDateRange}>
                                        <span className={styles.popupHighlight}>
                                        {formatDate(selectedDate[0].startDate) === formatDate(selectedDate[0].endDate)
                                            ? `${formatDate(selectedDate[0].startDate)}`
                                            : `${formatDate(selectedDate[0].startDate)} - ${formatDate(selectedDate[0].endDate)}`
                                        }
                                        </span>
                                </p>
                                <p className={styles.popupCarAdress}>{car.filial.address}</p>
                                <p className={styles.popupSumCost}>Итого: <span
                                    className={styles.popupHighlightCost}>{(daysDifference * car.costDay).toLocaleString('ru-RU')}</span> ₽
                                </p>
                            </div>
                        </div>
                    </div>
                    <button className={styles.popupButton} onClick={handleBooking}>Забронировать</button>
                </div>
            </div>
    );
};

export default BookingPopup;
