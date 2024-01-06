import {useEffect, useState} from 'react'
import styles from './story.module.css'
import star from '../../../assets/star.svg'
import rewiev from '../../../assets/rewiev.svg'
import StoryFeedbackPopup from './storyFeedbackPopUp'
import {BookingResponseModel} from '../../../models/Booking/BookingResponseModel'
import RentService from "../../../services/RentService";
import { Rating } from 'react-simple-star-rating';
import {useStore} from "../../../index";
import FeedbackService from "../../../services/FeedbackService"
interface monthProps{
    selectedMonth?: Date;
}
const StoryBlock: React.FC<monthProps> = (props) => {
    const [rents, setRents] = useState<BookingResponseModel[]>([]);
    const [sortMonth, setSortMonth] = useState<Date>(
      props.selectedMonth || new Date()
    );
    console.log(sortMonth);
   
    let sortedRents = rents;
    if (sortMonth) {
        const currentMonthDate = new Date(2023, 12);
        sortedRents = sortedRents.filter(
          (rent) => new Date(rent.startDate) >= currentMonthDate &&
                     new Date(rent.startDate) < new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + 1, 1)
        )};
    
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
    const handleSubmit = async () => {
        if (openBookingId !== null) {
          try {
            const response = await FeedbackService.createFeedback(
              {
                rentId: openBookingId,
                response: feedback,
                stars: rating,
                feedbackDate: new Date(),
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            );
      
              setOpenBookingId(null);
              setRating(0);
              setFeedback('');
              alert("Отзыв отправлен, спасибо за обратную связь!")
          } catch (error) {
            console.error('Ошибка при отправке отзыва:', error);
          }
        }
      };

      let listItems = rents?.sort((a, b) => new Date(a.startDate).getMonth() - new Date(b.startDate).getMonth()).map((rent) => (
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
      ))
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

export default StoryBlock;