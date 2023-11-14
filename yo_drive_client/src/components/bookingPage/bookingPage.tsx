import React, {useEffect, useState} from 'react';
import styles from './bookingPage.module.css';
import Header from '../header/header';
import FilterPanel from './filterPanel/filterPanel';
import {CarBookingModel, GearBoxEnum} from '../../models/Booking/CarBookingModel';
import carr from '../../assets/car1.png'
import Popup from './Popup/bookingPagePopup'; 
import FeedbackPopup from './Popup/bookingPageFeedbackPopup'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'
import ru from 'date-fns/locale/ru';
import { format } from 'date-fns';
import BookingService from "../../services/BookingService";
import { Rating } from 'react-simple-star-rating';

export function BookingPage() {
    const [openCarId, setOpenCarId] = useState<number | null>(null);
    const [cars, setCars] = useState<CarBookingModel[] | undefined>([]);
    const [feedbackPopupOpen, setFeedbackPopupOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
    ]);

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await BookingService.getAllCars();
                console.log(response);
                setCars(response.data);
            } catch (error) {
                // Чтобы не включать бек
                setCars(testModels);
                console.error('Error fetching cars:', error);
            }
        }

        fetchCars();
    }, []);


    // Чтобы не включать бек
    let testModels: CarBookingModel[] = [
        {
            carId: 1,
            carModel: {
                carModelId: 1,
                carBrand: {
                    carBrandId: 1,
                    name: "Mercedes-Benz"
                },
                modelName: "G63 AMG"
            },
            carClass: {
                carClassId: 1,
                className: "Седан"
            },
            filial: {
                filialId: 1,
                address: "ул. Луначарского",
                phoneNumber: "+78005553535"
            },
            year: 2020,
            stateNumber: "А444МР12",
            gearBox: 0,
            costDay: "20000",
            carImage: undefined,
            rating: 3.5
        },
        {
            carId: 2,
            carModel: {
                carModelId: 2,
                carBrand: {
                    carBrandId: 2,
                    name: "BMW"
                },
                modelName: "M8"
            },
            carClass: {
                carClassId: 2,
                className: "Купе"
            },
            filial: {
                filialId: 1,
                address: "ул. Луначарского",
                phoneNumber: "+78005553535"
            },
            year: 2022,
            stateNumber: "Х152АВ12",
            gearBox: 0,
            costDay: "16000",
            carImage: undefined,
            rating: 1.4
        },
        {
            carId: 3,
            carModel: {
                carModelId: 2,
                carBrand: {
                    carBrandId: 2,
                    name: "BMW"
                },
                modelName: "M8"
            },
            carClass: {
                carClassId: 2,
                className: "Купе"
            },
            filial: {
                filialId: 1,
                address: "ул. Луначарского",
                phoneNumber: "+78005553535"
            },
            year: 2022,
            stateNumber: "Х162АВ12",
            gearBox: 0,
            costDay: "16000",
            carImage: undefined,
            rating: 1.8
        },
        {
            carId: 4,
            carModel: {
                carModelId: 2,
                carBrand: {
                    carBrandId: 2,
                    name: "BMW"
                },
                modelName: "M8"
            },
            carClass: {
                carClassId: 2,
                className: "Купе"
            },
            filial: {
                filialId: 1,
                address: "ул. Луначарского",
                phoneNumber: "+78005553535"
            },
            year: 2022,
            stateNumber: "Х662АВ12",
            gearBox: 0,
            costDay: "16000",
            carImage: undefined,
            rating: 3.8
        }
    ]

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

    const toggleFeedbackPopup = () => {
        setFeedbackPopupOpen(!feedbackPopupOpen);
    };      
    
    const daysDifference = Math.floor((selectedDate[0].endDate.getTime() - selectedDate[0].startDate.getTime()) / (1000 * 3600 * 24)) + 1;

    let listItems = cars?.map((car) =>
        <li key={car.carId} className={styles.catalogItem}>
            <img src={car.carImage} width={'452px'} height={'194px'}/>
            <div className={styles.itemConteiner}>
                <div className={styles.catalogItemInfo}>
                    <p className={styles.carName}>{car.carModel.carBrand.name + car.carModel.modelName}</p>
                    <button className={styles.carStars} onClick={() => toggleFeedbackPopup()}>
                        <Rating size={22} readonly initialValue={car.rating} allowFraction fillColor="#CCB746" emptyColor="#D9D9D9" SVGstrokeColor="#CCB746" SVGstorkeWidth={1}/>
                        <p className={styles.carStarsNumber}>{car.rating}</p>
                    </button>
                    <FeedbackPopup isOpen={feedbackPopupOpen} handleClose={toggleFeedbackPopup} content={
                    <div>
                        <div className={styles.totalRating}>
                            <p className={styles.totalRatingNum}>4.0</p>
                            <Rating className={styles.totalRatingStars} size={32} readonly initialValue={4} fillColor="#CCB746" emptyColor="#BDBCB4"/>
                            <p className={styles.totalRatingText}>на основании 5 оценок</p>
                        </div>
                        <div className={styles.starRatingChartContainer}>
                            <div className={styles.starRatingChart}>
                                <Rating size={23} readonly initialValue={5} fillColor="#CCB746" emptyColor="#BDBCB4"/>
                                <Rating size={23} readonly initialValue={4} fillColor="#CCB746" emptyColor="#BDBCB4"/>
                                <Rating size={23} readonly initialValue={3} fillColor="#CCB746" emptyColor="#BDBCB4"/>
                                <Rating size={23} readonly initialValue={2} fillColor="#CCB746" emptyColor="#BDBCB4"/>
                                <Rating size={23} readonly initialValue={1} fillColor="#CCB746" emptyColor="#BDBCB4"/>
                            </div>
                            <img className={styles.starRatingImg} src={car.carImage} width={'345px'} height={'147px'}/>
                        </div>
                        <div className={styles.rewiew}>
                            <div className={styles.rewiewSort}>
                            </div>           
                        </div>
                    </div>} />
                    <p className={styles.carYear}>{car.year} год выпуска</p>
                    <p className={styles.carBox}>{GearBoxEnum[car.gearBox]} коробка передач</p>
                    <p className={styles.carClass}>Тип кузова: {car.carClass.className}</p>
                </div>
                <div className={styles.itemConteinerPrice}>
                    <p className={styles.carPrice}>{parseFloat(car.costDay).toLocaleString('ru-RU')}₽/сутки</p>
                    <button className={styles.carButton} onClick={() => togglePopup(car.carId)}>Забронировать</button>
                    <Popup car={car} isOpen={openCarId === car.carId} handleClose={() => togglePopup(car.carId)} selectedDate={selectedDate} rentCost={daysDifference * parseFloat(car.costDay)} content={
                        <div className={styles.popupItem}>
                            <div className={styles.popupItemInfo}>
                                <img className={styles.popupCarImg} src={car.carImage} width={'452px'} height={'194px'}/>
                                <p className={styles.popupСarName}>{car.carModel.carBrand.name + ' ' + car.carModel.modelName}</p>
                                <p className={styles.popupСarYear}>{car.year} год выпуска</p>
                                <p className={styles.popupСarBox}>{GearBoxEnum[car.gearBox]} коробка передач</p>
                                <p className={styles.popupСarClass}>Тип кузова: {car.carClass.className}</p>
                                <p className={styles.popupDayCost}>Тариф: <span className={styles.popupHighlight}>{parseFloat(car.costDay).toLocaleString('ru-RU')}</span> ₽/сутки</p>
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
                                    <p className={styles.popupSumCost}>Итого: <span className={styles.popupHighlightCost}>{(daysDifference * parseFloat(car.costDay)).toLocaleString('ru-RU')}</span> ₽</p>
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
                    <p className={styles.subtitleFind}>(найдено {listItems === undefined ? 0 : listItems.length}):</p>
                </div>
                <ul className={styles.catalog}>{listItems}</ul>
            </div>
        </div>
    );
}

export default BookingPage;