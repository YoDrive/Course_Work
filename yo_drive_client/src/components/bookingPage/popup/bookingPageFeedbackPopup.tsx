import React, {FunctionComponent, useEffect, useState} from "react";
import styles from "./bookingPageFeedbackPopup.module.css"
import {format} from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import {CarViewModel} from "../../../models/Booking/CarBookingModel";
import {FeedbackModel} from "../../../models/Feedback/FeedbackModel";
import {Rating} from "react-simple-star-rating";
import emptyImageCar from "../../../assets/emptyImageCar.png";
import rowsPopup from "../../../assets/rowsPopu.svg";
import popupGalOpen from "../../../assets/popupSort.svg"
import popupGalClose from "../../../assets/popupSortClose.svg"
import CarService from "../../../services/CarService";
import FeedbackService from "../../../services/FeedbackService";

interface PopupProps {
    handleClose: () => void;
    isOpen: boolean;
    carId: number;
}

const FeedbackPopup: FunctionComponent<PopupProps> = (props) => {
    const {isOpen, handleClose, carId} = props;
    const [car, setCar] = useState<CarViewModel | undefined>(undefined);
    const [feedbacks, setFeedback] = useState<FeedbackModel[] | undefined>(undefined);
    const [isPopupListExpanded, setPopupListExpanded] = useState(false);
    const [selectedSortTextPopup, setSelectedSortTextPopup] = useState('Сортировка');
    const [selectedSort, setSelectedSort] = useState(popupGalOpen);
    const fiveStarsCount = feedbacks == undefined ? 0 : feedbacks.filter(feedback => feedback.stars === 5).length;
    const fourStarsCount = feedbacks == undefined ? 0 : feedbacks.filter(feedback => feedback.stars === 4).length;
    const threeStarsCount = feedbacks == undefined ? 0 : feedbacks.filter(feedback => feedback.stars === 3).length;
    const twoStarsCount = feedbacks == undefined ? 0 : feedbacks.filter(feedback => feedback.stars === 2).length;
    const oneStarCount = feedbacks == undefined ? 0 : feedbacks.filter(feedback => feedback.stars === 1).length;

    const formattedDate = (date: Date) => {
        return format(date, 'd MMMM yyyyг.', {locale: ruLocale});
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

    useEffect(() => {
        async function fetchFeedback() {
            try {
                const response = await FeedbackService.getCarFeedback(carId);
                setFeedback(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            }
        }

        if (isOpen) {
            fetchFeedback();
        }
    }, [isOpen, carId]);

    const togglePopupListExpand = () => {
        setPopupListExpanded(!isPopupListExpanded);
    };

    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const onSubmitPopupList =(selectedValue: string)=> {
      
        switch (selectedValue) {
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
        console.log(selectedSortTextPopup);
        toggleSortOrder(); 
        setPopupListExpanded(false);
      };

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const sortOptions = [
        { label: 'По умолчанию', value: 'startState' },
        { label: 'По рейтингу', value: 'rating' },
        { label: 'По дате', value: 'date' },
    ];

    const sortedFeedbacks = feedbacks?.slice();

    sortedFeedbacks?.sort((a, b) => {
    const orderMultiplier = sortOrder === 'asc' ? 1 : -1;

    switch (selectedSortTextPopup) {
        case 'По рейтингу':
        return orderMultiplier * (b.stars - a.stars);
        case 'По дате':
        return orderMultiplier * (new Date(b.feedbackDate).getTime() - new Date(a.feedbackDate).getTime());
        default:
        return 0;
    }
    });
    
    const feedbackList = sortedFeedbacks?.map((feedback) =>
        <li key={feedback.feedbackId} className={styles.rewiewCard}>
            <div className={styles.rewiewData}>
                <p className={styles.rewiewName}>{feedback.userName}</p>
                <Rating className={styles.rewiewStars} size={23} readonly initialValue={feedback.stars}
                        fillColor="#CCB746" emptyColor="#BDBCB4"/>
                <p className={styles.rewiewDate}>{formattedDate(new Date(feedback.feedbackDate))}</p>
            </div>
            <p className={feedback.response.length > 0 ? styles.rewiewText : styles.rewiewTextEmpty}>
                {feedback.response.length > 0 ? feedback.response : 'Пользователь оставил только оценку..'}
            </p>
        </li>
    );
    const getFeedbackText = (count:number) => {
        const lastDigit = count % 10;
        const lastTwoDigits = count % 100;
    
        if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
            return 'оценок'; 
        }
    
        if (lastDigit === 1) {
            return 'оценки'; 
        }
    
        if (lastDigit >= 2 && lastDigit <= 4) {
            return 'оценок'; 
        }
    
        return 'оценок'; 
    };

    return (
        car == undefined ?
            <div className={styles.popupBox} style={{display: isOpen ? "block" : "none"}}>
              Ошибка сервера. Попробуйте позже.
            </div>
            :
            <div className={styles.popupBox} style={{display: isOpen ? "block" : "none"}}>
                <div className={styles.box}>
                    <div className={styles.popupClose}><span className={styles.popupCloseIcon}
                                                             onClick={handleClose}>x</span></div>
                    <p className={styles.popupTitle}>Отзывы</p>
                    <div>
                        <div className={styles.totalRating}>
                            <p className={styles.totalRatingNum}>{car.rating.toFixed(1)}</p>
                            <Rating className={styles.totalRatingStars} size={32} readonly initialValue={car.rating}
                                    fillColor="#CCB746" emptyColor="#BDBCB4"/>
                            <p className={styles.totalRatingText}>на основании {car.feedbackCount} {getFeedbackText(car.feedbackCount)}</p>
                        </div>
                        <div className={styles.starRatingChartContainer}>
                            <div className={styles.starRatingChart}>
                                <div className={styles.starRatingContainer}>
                                    <Rating size={23} readonly initialValue={5} fillColor="#CCB746"
                                            emptyColor="#BDBCB4"/>
                                    <input type="range" min="0" max={feedbacks == undefined ? 0 : feedbacks.length}
                                           value={fiveStarsCount} readOnly/>
                                    <p className={styles.starRatingNum}>{fiveStarsCount}</p>
                                </div>
                                <div className={styles.starRatingContainer}>
                                    <Rating size={23} readonly initialValue={4} fillColor="#CCB746"
                                            emptyColor="#BDBCB4"/>
                                    <input type="range" min="0" max={feedbacks == undefined ? 0 : feedbacks.length}
                                           value={fourStarsCount} readOnly/>
                                    <p className={styles.starRatingNum}>{fourStarsCount}</p>
                                </div>
                                <div className={styles.starRatingContainer}>
                                    <Rating size={23} readonly initialValue={3} fillColor="#CCB746"
                                            emptyColor="#BDBCB4"/>
                                    <input type="range" min="0" max={feedbacks == undefined ? 0 : feedbacks.length}
                                           value={threeStarsCount} readOnly/>
                                    <p className={styles.starRatingNum}>{threeStarsCount}</p>
                                </div>
                                <div className={styles.starRatingContainer}>
                                    <Rating size={23} readonly initialValue={2} fillColor="#CCB746"
                                            emptyColor="#BDBCB4"/>
                                    <input type="range" min="0" max={feedbacks == undefined ? 0 : feedbacks.length}
                                           value={twoStarsCount} readOnly/>
                                    <p className={styles.starRatingNum}>{twoStarsCount}</p>
                                </div>
                                <div className={styles.starRatingContainer}>
                                    <Rating size={23} readonly initialValue={1} fillColor="#CCB746"
                                            emptyColor="#BDBCB4"/>
                                    <input type="range" min="0" max={feedbacks == undefined ? 0 : feedbacks.length}
                                           value={oneStarCount} readOnly/>
                                    <p className={styles.starRatingNum}>{oneStarCount}</p>
                                </div>
                            </div>
                            {car != undefined && car.image && (
                                <img
                                    src={`data:image/png;base64,${car.image}`}
                                    alt={`${car.carModel.modelName}`}
                                    width={'345px'} height={'147px'}
                                />
                            )}
                            {car == undefined || !car.image &&
                                <img src={emptyImageCar} width={'345px'} height={'147px'}/>}
                        </div>
                        <div className={styles.rewiew}>
                            <form className={styles.rewiewSort}
                                  onClick={() => (isPopupListExpanded === false) && (selectedSort === popupGalOpen) ? setSelectedSort(popupGalClose) : setSelectedSort(popupGalOpen)}>
                                <div className={styles.rewiewSubSortBtn} onClick={() => togglePopupListExpand()}>
                                    <img className={styles.rewiewSortGal} src={selectedSort} alt="Sorting options"/>
                                    <p className={styles.rewiewSortText}>{selectedSortTextPopup}</p>
                                    <img className={styles.rewiewSortRows} src={rowsPopup} alt="Sort rows"/>
                                </div>
                                <div className={styles.dropDownPopup}
                                     style={{height: isPopupListExpanded ? 'auto' : '0px', border: isPopupListExpanded ? 'solid 1px #212528' : 'none'}}>
                                    <label className={styles.dropMenu}>
                                        <input
                                            type="radio"
                                            value="default"
                                            className={styles.dropBtn}
                                            checked={selectedSort === 'default'}
                                            onChange={() => onSubmitPopupList('default')} 
                                        />
                                        <p className={styles.btnText}>По умолчанию</p>
                                    </label>
                                    <label className={styles.dropMenu}>
                                        <input
                                            type="radio"
                                            value="rating"
                                            className={styles.dropBtn}
                                            checked={selectedSort === 'rating'}
                                            onChange={() => onSubmitPopupList('rating')}
                                        />
                                        <p className={styles.btnText}>По рейтингу</p>
                                    </label>
                                    <label className={styles.dropMenu}>
                                        <input
                                            type="radio"
                                            value="date"
                                            className={styles.dropBtn}
                                            checked={selectedSort === 'date'}
                                            onChange={() => onSubmitPopupList('date')}
                                        />
                                        <p className={styles.btnText}>По дате</p>
                                    </label>
                                </div>
                            </form>
                            { feedbackList && feedbackList?.length > 0 ? 
                            <ul>{feedbackList}</ul>:<p className={styles.emptyMessage}>...Oops у машины пока что нет отзывов</p>}
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default FeedbackPopup;
