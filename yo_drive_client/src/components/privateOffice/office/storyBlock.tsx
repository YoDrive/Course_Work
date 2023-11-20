import { useState } from 'react'
import styles from './story.module.css'
import star from '../../../assets/star.svg'
import rewiev from '../../../assets/rewiev.svg'
import StoryFeedbackPopup from './storyFeedbackPopUp'
import { useForm} from "react-hook-form"
import { BookingResponseModel } from '../../../models/Booking/BookingResponseModel'

 export function StoryBlock(){
    const resField =() =>{
        if(getValues("feedback") != null){
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
    const [feedbackPopupOpen, setFeedbackPopupOpen] = useState(false);
  
    const toggleFeedbackPopup = () => {
        setFeedbackPopupOpen(!feedbackPopupOpen);
    };    
    const onSubmit=(data:any) =>{
        console.log(data);
    }
    const [bookings, setBookings] = useState<BookingResponseModel[] | undefined>([]);
    //врменные даты
    const data1 = new Date(2023,11,11);
    const data2 = new Date(2023,11,29);
    //шобы бэк не врубать
    let testModels: BookingResponseModel[] = [
        {
            rentId: 1,
            user:{
                firstName: "",
                surname: "string",
                patronymic: "string",
                phoneNumber: "string",
                email: "string"
            },
            car: {
                carId: 1,
                carModel:{
                    carBrand:{
                        carBrandId: 1,
                        name:"Mercedes-Benz"
                    },
                    carModelId: 1,
                    modelName: "G63 AMG"
                },
                carClass:{
                    carClassId: 1,
                    className: "внедорожник"
                },
                filial:{
                    filialId: 1,
                    address: "ул. Луначарского",
                    phoneNumber: "+78005553535"
                },
                year: 2020,
                stateNumber: "",
                gearBox: 0,
                carImage: undefined,
                costDay: "2300",
                rating: 5.0
            },
            startDate: data1,
            endDate: data2,
            rentCost: 220000,
            feedback:undefined
        },
        {
            rentId: 2,
            user:{
                firstName: "",
                surname: "string",
                patronymic: "string",
                phoneNumber: "string",
                email: "string"
            },
            car: {
                carId: 1,
                carModel:{
                    carBrand:{
                        carBrandId: 2,
                        name:"Lada"
                    },
                    carModelId: 1,
                    modelName: "Priora"
                },
                carClass:{
                    carClassId: 1,
                    className: "внедорожник"
                },
                filial:{
                    filialId: 1,
                    address: "ул. Луначарского",
                    phoneNumber: "+78005553535"
                },
                year: 2020,
                stateNumber: "",
                gearBox: 0,
                carImage: undefined,
                costDay: "2400",
                rating: 4.9
            },
            startDate: data1,
            endDate: data2,
            rentCost: 220000,
            feedback:undefined
        },
        {
            rentId: 3,
            user:{
                firstName: "",
                surname: "string",
                patronymic: "string",
                phoneNumber: "string",
                email: "string"
            },
            car: {
                carId: 1,
                carModel:{
                    carBrand:{
                        carBrandId: 2,
                        name:"Renault"
                    },
                    carModelId: 1,
                    modelName: "Logan"
                },
                carClass:{
                    carClassId: 1,
                    className: "внедорожник"
                },
                filial:{
                    filialId: 1,
                    address: "ул. Луначарского",
                    phoneNumber: "+78005553535"
                },
                year: 2020,
                stateNumber: "",
                gearBox: 0,
                carImage: undefined,
                costDay: "1000400",
                rating: 4.9
            },
            startDate: data1,
            endDate: data2,
            rentCost: 220000,
            feedback:undefined
        },
        
    ]
    let listItems = testModels?.map((booking) =>
    <li key={booking.rentId} className={styles.storyBlock}>
        <p className={styles.blockText_first}>{booking.car.carModel.carBrand.name} {booking.car.carModel.modelName}</p>
        <p className={styles.blockText_second}>{booking.car.costDay}₽/сутки</p>
        <p className={styles.blockText_third}>{booking.rentCost}₽</p>
        <p className={styles.blockText_fourth}>{booking.startDate.toLocaleDateString()} - {booking.endDate.toLocaleDateString()}</p>
        <div className={styles.blockText_rewiev}>
        <img className={styles.rewiev_star} src={star}></img>
        <p className={styles.rewiev_digit}>{booking.car.rating.toFixed(1)}</p>
        <img className={styles.rewiev_icon} src={rewiev} onClick={()=>toggleFeedbackPopup()}></img>
        <StoryFeedbackPopup handleClose={toggleFeedbackPopup} isOpen={feedbackPopupOpen} content={
        <div className={styles.popup}>
          <div className={styles.popupHead}>
            <div className={styles.popupText}>
                <div className={styles.textItems}>
                    <p className={styles.itemOne}>Автомобиль: </p>
                    <p className={styles.itemSecond}> {booking.car.carModel.carBrand.name} {booking.car.carModel.modelName}</p>
                </div>
                <div className={styles.textItems}>
                    <p className={styles.itemOne}>Дата:</p>
                    <p className={styles.itemSecond}>{booking.startDate.toLocaleDateString()} - {booking.endDate.toLocaleDateString()}</p>
                </div>
            </div>
            <div className={styles.popupRating}>
            </div>
          </div>
            <form className={styles.popUpForm} onSubmit={handleSubmit(onSubmit)}>
                <textarea  className={styles.formInput} placeholder='Оставить отзыв...'
                {...register("feedback")}/>
            </form>
            <div className={styles.popUpBtns}>
                <button className={styles.btnReset} onClick={resField}>Отменить</button>
                <button className={styles.btnSubmit} onClick={handleSubmit(onSubmit)}>Оставить отзыв</button>
            </div> 
          </div>
        }/>
        </div>  
    </li>
    )
    return(
        <ul className={styles.listItems}>{listItems}</ul>
    )}