import {useEffect, useState} from 'react'
import styles from './story.module.css'
import star from '../../../assets/star.svg'
import rewiev from '../../../assets/rewiev.svg'
import StoryFeedbackPopup from './storyFeedbackPopUp'
import {useForm} from "react-hook-form"
import {BookingResponseModel} from '../../../models/Booking/BookingResponseModel'
import RentService from "../../../services/RentService";

export function StoryBlock() {
    const [rents, setRents] = useState<BookingResponseModel[] | undefined>([]);
    const [openBookingId, setOpenBookingId] = useState<number | null>(null);

    useEffect(() => {
        async function fetchBookings() {
            try {
                const response = await RentService.GetUserRents(1);
                setRents(response.data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        }
        fetchBookings();
    }, []);

    const resField = () => {
        if (getValues("feedback") != null) {
            resetField("feedback")
        }
    };
    const {
        register,
        handleSubmit,
        resetField,
        getValues
    } = useForm({
        mode: "onBlur"
    });

    const toggleFeedbackPopup = (bookingId: number) => {
        if (openBookingId === bookingId) {
            setOpenBookingId(null);
        } else {
            setOpenBookingId(bookingId);
        }
    }
    const onSubmit = (data: any) => {
        console.log(data);
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
                            <div className={styles.popupRating}>
                            </div>
                        </div>

                        <form className={styles.popUpForm} onSubmit={handleSubmit(onSubmit)}>
                <textarea className={styles.formInput} placeholder='Оставить отзыв...'
                          {...register("feedback")}/>
                        </form>
                        <div className={styles.popUpBtns}>
                            <button className={styles.btnReset} onClick={resField}>Отменить</button>
                            <button className={styles.btnSubmit} onClick={handleSubmit(onSubmit)}>Оставить отзыв
                            </button>
                        </div>

                    </div>
                }/>
            </div>
        </li>
    )
    return (
        <ul className={styles.listItems}>{listItems}</ul>
    )
}