import React, {FunctionComponent, useEffect, useState} from "react";
import styles from "./bookingPageFeedbackPopup.module.css"
import { format } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';
import {CarViewModel} from "../../../models/Booking/CarBookingModel";
import {FeedbackModel} from "../../../models/Feedback/FeedbackModel";
import {Rating} from "react-simple-star-rating";
import emptyImageCar from "../../../assets/emptyImageCar.png";
import rowsPopup from "../../../assets/rowsPopu.svg";
import popupGalOpen from "../../../assets/popupSort.svg"
import popupGalClose from "../../../assets/popupSortClose.svg"
import {useForm} from "react-hook-form";
import CarService from "../../../services/CarService";
import FeedbackService from "../../../services/FeedbackService";

interface PopupProps {
  handleClose: () => void;
  isOpen: boolean;
  carId: number;
}

const FeedbackPopup: FunctionComponent<PopupProps> = (props) => {
  const { isOpen, handleClose, carId } = props;
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
    return format(date, 'd MMMM yyyyг.', { locale: ruLocale });
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

    // Выполняем запрос только при открытии попапа
    if (isOpen) {
      fetchFeedback();
    }
  }, [isOpen, carId]);

  const togglePopupListExpand = () => {
    setPopupListExpanded(!isPopupListExpanded);
  };

  const {
    register,
    handleSubmit,
  } = useForm({
    mode: "onBlur"
  });

  const onSubmitPopupList = (data: any) => {
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

  const feedbackList = feedbacks?.map((feedback) =>
    <li key={feedback.feedbackId} className={styles.rewiewCard}>
      <div className={styles.rewiewData}>
        <p className={styles.rewiewName}>{feedback.userName}</p>
        <Rating className={styles.rewiewStars} size={23} readonly initialValue={feedback.stars} fillColor="#CCB746" emptyColor="#BDBCB4"/>
        <p className={styles.rewiewDate}>{formattedDate(new Date(feedback.feedbackDate))}</p>
      </div>
      <p className={styles.rewiewText}>
        {feedback.response}
      </p>
    </li>
  );

  return (
    <div className={styles.popupBox} style={{ display: isOpen ? "block" : "none" }}>
      <div className={styles.box}>
        <div className={styles.popupClose}><span className={styles.popupCloseIcon} onClick={handleClose}>x</span></div>
        <p className={styles.popupTitle}>Отзывы</p>
        <div>
          <div className={styles.totalRating}>
            <p className={styles.totalRatingNum}>{car == undefined ? 0 : car.rating}</p>
            <Rating className={styles.totalRatingStars} size={32} readonly initialValue={4} fillColor="#CCB746" emptyColor="#BDBCB4"/>
            <p className={styles.totalRatingText}>на основании {car == undefined ? 0 : car.feedbackCount} оценок</p>
          </div>
          <div className={styles.starRatingChartContainer}>
            <div className={styles.starRatingChart}>
              <div className={styles.starRatingContainer}>
                <Rating size={23} readonly initialValue={5} fillColor="#CCB746" emptyColor="#BDBCB4"/>
                <input type="range" min="0" max={feedbacks == undefined ? 0 : feedbacks.length} value={fiveStarsCount} readOnly/>
                <p className={styles.starRatingNum}>{fiveStarsCount}</p>
              </div>
              <div className={styles.starRatingContainer}>
                <Rating size={23} readonly initialValue={4} fillColor="#CCB746" emptyColor="#BDBCB4"/>
                <input type="range" min="0" max={feedbacks == undefined ? 0 : feedbacks.length} value={fourStarsCount} readOnly/>
                <p className={styles.starRatingNum}>{fourStarsCount}</p>
              </div>
              <div className={styles.starRatingContainer}>
                <Rating size={23} readonly initialValue={3} fillColor="#CCB746" emptyColor="#BDBCB4"/>
                <input type="range" min="0" max={feedbacks == undefined ? 0 : feedbacks.length} value={threeStarsCount} readOnly/>
                <p className={styles.starRatingNum}>{threeStarsCount}</p>
              </div>
              <div className={styles.starRatingContainer}>
                <Rating size={23} readonly initialValue={2} fillColor="#CCB746" emptyColor="#BDBCB4"/>
                <input type="range" min="0" max={feedbacks == undefined ? 0 : feedbacks.length} value={twoStarsCount} readOnly/>
                <p className={styles.starRatingNum}>{twoStarsCount}</p>
              </div>
              <div className={styles.starRatingContainer}>
                <Rating size={23} readonly initialValue={1} fillColor="#CCB746" emptyColor="#BDBCB4"/>
                <input type="range" min="0" max={feedbacks == undefined ? 0 : feedbacks.length} value={oneStarCount} readOnly/>
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
            {car == undefined || !car.image && <img src={emptyImageCar} width={'452px'} height={'194px'}/>}
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
            <ul>{feedbackList}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPopup;
