import React, { useState } from 'react';
import styles from './bookingPage.module.css';
import Header from '../header/header';
import FilterPanel from './filterPanel/filterPanel';
import { CarBookingModel } from '../../models/Booking/CarBookingModel';
import carr from '../../assets/car1.png'
import Popup from './Popup/bookingPagePopup'; 
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'
import ru from 'date-fns/locale/ru';
import { format } from 'date-fns';

let cars: CarBookingModel[] =
[
    {
        id: 1,
        img: carr,
        name: 'Mercedes-Benz G63 AMG',
        stars: 4.0,
        year: 2020,
        gearbox: 'Автоматическая',
        class: 'внедорожник',
        price: '11500',
        address: 'ул.Луначарского, 10' 
    },
    {
        id: 2,
        img: carr,
        name: 'dkjkf',
        stars: 4.0,
        year: 2000,
        gearbox: 'string',
        class: 'string',
        price: '10500',
        address: 'ул.Эшкинина, 10' 
    }

]

export function BookingPage() {
    const [openCarId, setOpenCarId] = useState<number | null>(null);
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
    
    const formatDate = (date: any) => {
        return format(date, 'dd.MM.yy');
    };

    const togglePopup = (carId: number) => {
      if (openCarId === carId) {
        setOpenCarId(null);
      } else {
        setOpenCarId(carId);
      }
    }
    
    const daysDifference = Math.floor((selectedDate[0].endDate.getTime() - selectedDate[0].startDate.getTime()) / (1000 * 3600 * 24)) + 1;

    let listItems = cars.map((car) => 
        <li key={car.id} className={styles.catalogItem}>
            <img src={car.img} width={'452px'} height={'194px'}/>
            <div className={styles.itemConteiner}>
                <div className={styles.catalogItemInfo}>
                    <p className={styles.carName}>{car.name}</p>
                    <p className={styles.carStars}>{car.stars}</p>
                    <p className={styles.carYear}>{car.year} год выпуска</p>
                    <p className={styles.carBox}>{car.gearbox} коробка передач</p>
                    <p className={styles.carClass}>Тип кузова: {car.class}</p>
                </div>
                <div className={styles.itemConteinerPrice}>
                    <p className={styles.carPrice}>{parseFloat(car.price).toLocaleString('ru-RU')}₽/сутки</p>
                    <button className={styles.carButton} onClick={() => togglePopup(car.id)}>Забронировать</button>
                    <Popup car={car} isOpen={openCarId === car.id} handleClose={() => togglePopup(car.id)} selectedDate={selectedDate} rentCost={daysDifference * parseFloat(car.price)} content={
                        <div className={styles.popupItem}>
                            <div className={styles.popupItemInfo}>
                                <img className={styles.popupCarImg} src={car.img} width={'452px'} height={'194px'}/>
                                <p className={styles.popupСarName}>{car.name}</p>
                                <p className={styles.popupСarYear}>{car.year} год выпуска</p>
                                <p className={styles.popupСarBox}>{car.gearbox} коробка передач</p>
                                <p className={styles.popupСarClass}>Тип кузова: {car.class}</p>
                                <p className={styles.popupDayCost}>Тариф: <span className={styles.popupHighlight}>{parseFloat(car.price).toLocaleString('ru-RU')}</span> ₽/сутки</p>
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
                                    <p className={styles.popupCarAdress}>{car.address}</p>
                                    <p className={styles.popupSumCost}>Итого: <span className={styles.popupHighlightCost}>{(daysDifference * parseFloat(car.price)).toLocaleString('ru-RU')}</span> ₽</p>
                                </div>
                            </div>
                        </div>
                    } />
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
                    <p className={styles.subtitleText}>Автомобили </p>
                    <p className={styles.subtitleFind}>(найдено {listItems.length}):</p>
                </div>
                <ul className={styles.catalog}>{listItems}</ul>
            </div>
        </div>
    );
}

export default BookingPage;