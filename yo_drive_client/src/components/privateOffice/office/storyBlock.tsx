import { useState } from 'react'
import styles from './story.module.css'
import star from '../../../assets/star.svg'
import rewiev from '../../../assets/rewiev.svg'
import StoryFeedbackPopup from './storyFeedbackPopUp'
import { useForm} from "react-hook-form"

 export function StoryBlock(){
    const resField =() =>{
        if(getValues("feedback") != null){
            resetField("feedback")
        }
    }
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
    return(
        <li className={styles.storyBlock}>
            <p className={styles.blockText_first}>Mercedes-Benz G63 AMG</p>
            <p className={styles.blockText_second}>11500₽/сутки</p>
            <p className={styles.blockText_third}>23 000 ₽</p>
            <p className={styles.blockText_fourth}>13 окт. 2023 - 31 окт.2023</p>
            <p className={styles.blockText_rewiev }>
                <img className={styles.rewiev_star} src={star}></img>
                <p className={styles.rewiev_digit}>5.0</p>
                <img className={styles.rewiev_icon} src={rewiev} onClick={()=>toggleFeedbackPopup()}></img>
                <StoryFeedbackPopup handleClose={toggleFeedbackPopup} isOpen={feedbackPopupOpen} content={
                <div className={styles.popup}>
                  <div className={styles.popupHead}>
                    <div className={styles.popupText}>
                        <div className={styles.textItems}>
                            <p className={styles.itemOne}>Автомобиль: </p>
                            <p className={styles.itemSecond}> Mercedes-Benz G63 AMG</p>
                        </div>
                        <div className={styles.textItems}>
                            <p className={styles.itemOne}>Дата:</p>
                            <p className={styles.itemSecond}> 1 авг. 2023 - 3 авг.2023 </p>
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
            </p>
            
        </li>
    )
 }