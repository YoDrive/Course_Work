import {useForm} from "react-hook-form";
import React, {useEffect, useState} from 'react';
import styles from './bookingPage.module.css';
import Header from '../header/header';
import FilterPanel from './filterPanel/filterPanel';
import {CarBookingModel, GearBoxEnum} from '../../models/Booking/CarBookingModel';
import galOpen from "../../assets/whgaloshkaClose.svg";
import galClose from "../../assets/whgalochkaOpen.svg"
import rows from "../../assets/rows.svg"
import Popup from './Popup/bookingPagePopup'; 
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'
import ru from 'date-fns/locale/ru';
import { format } from 'date-fns';
import BookingService from "../../services/BookingService";
import { Rating , ThinRoundedStar} from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

export function BookingPage() {
    const [openCarId, setOpenCarId] = useState<number | null>(null);
    const [cars, setCars] = useState<CarBookingModel[] | undefined>([]);
    const [selectedDate, setSelectedDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ]);

    const [selected, setSelected] = useState(galOpen)
    const [isExpanded, setExpanded] = useState(false);
    const {
        register,
        handleSubmit,
    } = useForm({
        mode: "onBlur"
    });

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

    const toggleExpand = () => {
        setExpanded(!isExpanded);
    };

    const onSubmit=(data:any) =>{
        console.log(data);
        toggleExpand();
    }

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
    ]

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
    
    const daysDifference = Math.floor((selectedDate[0].endDate.getTime() - selectedDate[0].startDate.getTime()) / (1000 * 3600 * 24)) + 1;

    let listItems = cars?.map((car) =>
        <li key={car.carId} className={styles.catalogItem}>
            <img src={car.carImage} width={'452px'} height={'194px'}/>
            <div className={styles.itemConteiner}>
                <div className={styles.catalogItemInfo}>
                    <p className={styles.carName}>{car.carModel.carBrand.name + car.carModel.modelName}</p>
                    <button className={styles.carStars}>
                        <Rating style={{ maxWidth: 100 }} readOnly value={car.rating} itemStyles={{itemShapes: ThinRoundedStar, activeFillColor: '#CCB746', inactiveFillColor: '#D9D9D9'}}/>
                        <p className={styles.carStarsNumber}>{car.rating}</p>
                    </button>
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
                                {...register("sortType")}
                                    />
                                <p className={styles.btnText}>По рейтингу</p>
                            </label>
                            <label className={styles.dropMenu}>
                                <input type="radio" value="По цене" className={styles.dropBtn} 
                                {...register("sortType")}
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