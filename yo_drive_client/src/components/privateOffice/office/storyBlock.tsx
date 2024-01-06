import {useEffect, useState} from 'react'
import styles from './story.module.css'
import star from '../../../assets/star.svg'
import rewiev from '../../../assets/rewiev.svg'
import StoryFeedbackPopup from './storyFeedbackPopUp'
import {BookingResponseModel} from '../../../models/Booking/BookingResponseModel'
import RentService from "../../../services/RentService";
import { Rating } from 'react-simple-star-rating';
import {useStore} from "../../../index";

export function StoryBlock() {
    const [rents, setRents] = useState<BookingResponseModel[] | undefined>([]);
    const [openBookingId, setOpenBookingId] = useState<number | null>(null);
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState(0);

    const handleRating = (rate: number) => {
        setRating(rate)
    }; 
    const handleFeedback = (event:any) => {
        const feedback = event.target.value;
        setFeedback(feedback)
    }; 
    const store = useStore();


    useEffect(() => {
        async function fetchBookings() {
            try {
                const response = await RentService.GetUserRents(store.user.Id);
                setRents(response.data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        }
        fetchBookings();
    }, []);

    const toggleFeedbackPopup = (bookingId: number) => {
        if (openBookingId === bookingId) {
            setOpenBookingId(null);
            setRating(0);
        } else {
            setOpenBookingId(bookingId);
            setRating(0);
        }
    }
    const resField =()=>{
        setRating(0);
        const feedbackTextarea = document.getElementById('feedbackTextarea');
        if (feedbackTextarea instanceof HTMLTextAreaElement) {
            feedbackTextarea.value = '';
          }
    }
    const handleSubmit = () => {
        console.log(
            rating,
            feedback
        )
    }

    let listItems = rents?.map((rent) =>
        <li key={rent.rentId} className={styles.storyBlock}>
            <p className={styles.blockText_first}>{rent.car.carModel.carBrand.name + ' ' + rent.car.carModel.modelName}</p>
            <p className={styles.blockText_second}>{rent.car.costDay}₽/сутки</p>
            <p className={styles.blockText_third}>{rent.rentCost}₽</p>
            <p className={styles.blockText_fourth}>{ new Date(rent.startDate).toLocaleDateString('ru-RU') } - { new Date(rent.endDate).toLocaleDateString('ru-RU') }</p>
            <div className={styles.blockText_rewiev}>
                <img className={styles.rewiev_star} src={star}></img>
                <p className={styles.rewiev_digit}>{rent.car.rating.toFixed(1)}</p>
                <img className={styles.rewiev_icon} src={rewiev}
                     onClick={() => toggleFeedbackPopup(rent.rentId)}></img>
            </div>
            <div>
                <StoryFeedbackPopup booking={rent} handleClose={() => toggleFeedbackPopup(rent.rentId)}
                                    isOpen={openBookingId === rent.rentId} content={
                    <div className={styles.popup}>
                        <div className={styles.popupHead}>
                            <div className={styles.popupText}>
                                <div className={styles.textItems}>
                                    <p className={styles.itemOne}>Автомобиль: </p>
                                    <p className={styles.itemSecond}>{rent.car.carModel.carBrand.name + ' ' + rent.car.carModel.modelName}</p>
                                </div>
                                <div className={styles.textItems}>
                                    <p className={styles.itemOne}>Дата:</p>
                                    <p className={styles.itemSecond}>{ new Date(rent.startDate).toLocaleDateString('ru-RU') } - { new Date(rent.endDate).toLocaleDateString('ru-RU') }</p>
                                </div>
                            </div>
                        <div className={styles.rating}>{rating.toFixed(1)}</div>
                        <Rating className={styles.starRating}  initialValue={rating} onClick={handleRating} size={36} fillColor="#CCB746" emptyColor="#D9D9D9" SVGstrokeColor="#CCB746" SVGstorkeWidth={1}/>
                        </div>
                         <form className={styles.popUpForm}>
                         <textarea className={styles.formInput}  id="feedbackTextarea" defaultValue={feedback} onChange={handleFeedback} placeholder='Оставить отзыв...'/>
                        </form>
                        <div className={styles.popUpBtns}>
                            <button className={styles.btnReset} onClick={resField}>Отменить</button>
                            <button className={styles.btnSubmit} onClick={handleSubmit}>Оставить отзыв</button>
                        </div>

                    </div>
                }/>
            </div>
        </li>
    )
    return (
        <div>
        { rents !== undefined && (rents.length > 0) ? (
            <ul className={styles.catalog}>{listItems}</ul>
        ) : (
            <p className={styles.listItemsEmpty}>...Oops у вас пока нет бронирований</p>
        )}
        </div>
        
    )
}