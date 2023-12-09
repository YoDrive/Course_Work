import {useForm} from "react-hook-form";
import React, {useEffect, useState} from 'react';
import styles from './bookingPage.module.css';
import Header from '../header/header';
import FilterPanel from './filterPanel/filterPanel';
import {CarBookingModel} from '../../models/Booking/CarBookingModel';
import { GearBoxEnum } from "../../models/CarModel";
import galOpen from "../../assets/whgaloshkaClose.svg";
import galClose from "../../assets/whgalochkaOpen.svg"
import rows from "../../assets/rows.svg"
import rowsPopup from "../../assets/rowsPopu.svg";
import popupGalOpen from "../../assets/popupSort.svg"
import popupGalClose from "../../assets/popupSortClose.svg"
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

    const [selected, setSelected] = useState(galOpen);
    const [selectedSort, setSelectedSort] = useState(popupGalOpen);
    const [isExpanded, setExpanded] = useState(false);
    const [isPopupListExpanded, setPopupListExpanded] = useState(false);
    const [selectedSortTextPopup, setSelectedSortTextPopup] = useState('Сортировка');
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

    const toggleExpand = () => {
        setExpanded(!isExpanded);
    };

    const togglePopupListExpand = () => {
        setPopupListExpanded(!isPopupListExpanded);
    };

    const onSubmit=(data:any) =>{
        console.log(data);
        toggleExpand();
    };

    const onSubmitPopupList = (data: any) => {
        console.log(data);
        switch (data.sortType) {
            case 'rating':
              setSelectedSortTextPopup('По рейтингу');
              break;
            case 'date':
              setSelectedSortTextPopup('По дате');
              break;
            default:
              setSelectedSortTextPopup('Сортировка');
              break;
          }
        setPopupListExpanded(false);
    };

    const sortOptions = [
        { label: 'По умолчанию', value: 'startState'},
        { label: 'По рейтингу', value: 'rating' },
        { label: 'По дате', value: 'date' },
    ];
    

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
            feedbackCount: 4,
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
            feedbackCount: 5,
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
            feedbackCount: 6,
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
            feedbackCount: 10,
            gearBox: 0,
            costDay: "16000",
            carImage: undefined,
            rating: 3.8
        }
    ]

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await BookingService.getAllCars();
                setCars(response.data);
            } catch (error) {
                // Чтобы не включать бек
                setCars(testModels);
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

    const toggleFeedbackPopup = () => {
        setFeedbackPopupOpen(!feedbackPopupOpen);
    };      
    
    const daysDifference = Math.floor((selectedDate[0].endDate.getTime() - selectedDate[0].startDate.getTime()) / (1000 * 3600 * 24)) + 1;

    let listItems = cars?.map((car) =>
        <li key={car.carId} className={styles.catalogItem}>
            {car.image && (
                <img
                    src={`data:image/png;base64,${car.image}`}
                    alt={`${car.carModel.modelName}`}
                    width={'452px'} height={'194px'}
                />
            )}
            {/*TODO: Картинка загушка*/}
            {!car.image && <img src={''} width={'452px'} height={'194px'}/>}
            <div className={styles.itemConteiner}>
                <div className={styles.catalogItemInfo}>
                    <p className={styles.carName}>{car.carModel.carBrand.name + " " + car.carModel.modelName}</p>
                    <button className={styles.carStars} onClick={() => toggleFeedbackPopup()}>
                        <Rating size={22} readonly initialValue={car.rating} allowFraction fillColor="#CCB746" emptyColor="#D9D9D9" SVGstrokeColor="#CCB746" SVGstorkeWidth={1}/>
                        <p className={styles.carStarsNumber}>{car.rating}</p>
                    </button>
                    <FeedbackPopup isOpen={feedbackPopupOpen} handleClose={toggleFeedbackPopup} content={
                    <div>
                        <div className={styles.totalRating}>
                            <p className={styles.totalRatingNum}>4.1</p>
                            <Rating className={styles.totalRatingStars} size={32} readonly initialValue={4} fillColor="#CCB746" emptyColor="#BDBCB4"/>
                            <p className={styles.totalRatingText}>на основании {car.feedbackCount} оценок</p>
                        </div>
                        <div className={styles.starRatingChartContainer}>
                            <div className={styles.starRatingChart}>
                                <div className={styles.starRatingContainer}>
                                    <Rating size={23} readonly initialValue={5} fillColor="#CCB746" emptyColor="#BDBCB4"/>
                                    <input type="range" min="0" max="10" value="5" readOnly/>
                                    <p className={styles.starRatingNum}>5</p>
                                </div>
                                <div className={styles.starRatingContainer}>
                                    <Rating size={23} readonly initialValue={4} fillColor="#CCB746" emptyColor="#BDBCB4"/>
                                    <input type="range" min="0" max="10" value="3" readOnly/>
                                    <p className={styles.starRatingNum}>3</p>
                                </div>
                                <div className={styles.starRatingContainer}>
                                    <Rating size={23} readonly initialValue={3} fillColor="#CCB746" emptyColor="#BDBCB4"/>
                                    <input type="range" min="0" max="10" value="1" readOnly/>
                                    <p className={styles.starRatingNum}>1</p>
                                </div>
                                <div className={styles.starRatingContainer}>
                                    <Rating size={23} readonly initialValue={2} fillColor="#CCB746" emptyColor="#BDBCB4"/>
                                    <input type="range" min="0" max="10" value="0" readOnly/>
                                    <p className={styles.starRatingNum}>0</p>
                                </div>
                                <div className={styles.starRatingContainer}>
                                    <Rating size={23} readonly initialValue={1} fillColor="#CCB746" emptyColor="#BDBCB4"/>
                                    <input type="range" min="0" max="10" value="1" readOnly/>
                                    <p className={styles.starRatingNum}>1</p>
                                </div>
                            </div>
                            {car.image && (
                                <img
                                    src={`data:image/png;base64,${car.image}`}
                                    alt={`${car.carModel.modelName}`}
                                    width={'452px'} height={'194px'}
                                />
                            )}
                            {/*TODO: Картинка загушка*/}
                            {!car.image && <img src={''} width={'452px'} height={'194px'}/>}
                        </div>
                        <div className={styles.rewiew}>
                            <form className={styles.rewiewSort} onClick={() => (isPopupListExpanded === false)&&(selectedSort === popupGalOpen) ? setSelectedSort(popupGalClose) : setSelectedSort(popupGalOpen)}  onChange={handleSubmit(onSubmitPopupList)}>
                                <div className={styles.rewiewSubSortBtn} onClick={() => togglePopupListExpand()}>
                                    <img className={styles.rewiewSortGal} src={selectedSort} alt="Sorting options" />
                                    <p className={styles.rewiewSortText}>{selectedSortTextPopup}</p>
                                    <img className={styles.rewiewSortRows} src={rowsPopup} alt="Sort rows" />
                                </div>
                                <div className={styles.dropDownPopup} style={{ height: isPopupListExpanded ? 'auto' : '0px', border: isPopupListExpanded ? 'solid 1px #212528' : 'none'}}>
                                {sortOptions.map((option) => (
                                    <label key={option.value} className={styles.dropMenuPopup}>
                                    <input
                                        type="radio"
                                        value={option.value}
                                        className={styles.dropBtnPopup}
                                        {...register('sortType')}
                                    />
                                    <p className={styles.btnTextPopup}>{option.label}</p>
                                    </label>
                                ))}
                                </div>
                            </form>
                            <div className={styles.rewiewCard}>
                                <div className={styles.rewiewData}>
                                    <p className={styles.rewiewName}>Александр Т.</p>
                                    <Rating className={styles.rewiewStars} size={23} readonly initialValue={3} fillColor="#CCB746" emptyColor="#BDBCB4"/>
                                    <p className={styles.rewiewDate}>22 сентября 2023г.</p>
                                </div>
                                <p className={styles.rewiewText}>Покатался на новом гелике G63 AMG, погонял недельку, Покатался на новом гелике G63 AMG, погонял недельку, радости полные штаны, советую! Буду брать авто в аренду теперь только тут!!!радости полные штаны, советую! Буду брать авто в аренду теперь только тут!!!</p>
                            </div> 
                            <div className={styles.rewiewCard}>
                                <div className={styles.rewiewData}>
                                    <p className={styles.rewiewName}>Александр Т.</p>
                                    <Rating className={styles.rewiewStars} size={23} readonly initialValue={3} fillColor="#CCB746" emptyColor="#BDBCB4"/>
                                    <p className={styles.rewiewDate}>22 сентября 2023г.</p>
                                </div>
                                <p className={styles.rewiewText}>Покатался на новом гелике G63 AMG, погонял недельку, Покатался на новом гелике G63 AMG, погонял недельку, радости полные штаны, советую! Буду брать авто в аренду теперь только тут!!!радости полные штаны, советую! Буду брать авто в аренду теперь только тут!!!</p>
                            </div>    
                            <div className={styles.rewiewCard}>
                                <div className={styles.rewiewData}>
                                    <p className={styles.rewiewName}>Александр Т.</p>
                                    <Rating className={styles.rewiewStars} size={23} readonly initialValue={3} fillColor="#CCB746" emptyColor="#BDBCB4"/>
                                    <p className={styles.rewiewDate}>22 сентября 2023г.</p>
                                </div>
                                <p className={styles.rewiewText}>Покатался на новом гелике G63 AMG, погонял недельку, Покатался на новом гелике G63 AMG, погонял недельку, радости полные штаны, советую! Буду брать авто в аренду теперь только тут!!!радости полные штаны, советую! Буду брать авто в аренду теперь только тут!!!</p>
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
                                {car.image && (
                                    <img
                                        src={`data:image/png;base64,${car.image}`}
                                        alt={`${car.carModel.modelName}`}
                                        width={'452px'} height={'194px'}
                                    />
                                )}
                                {/*TODO: Картинка загушка*/}
                                {!car.image && <img src={''} width={'452px'} height={'194px'}/>}
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