import styles from './story.module.css';
import vector from '../../../assets/Vector2.svg'
import { StoryBlock } from './storyBlock';

export function Story(){
    return(
        <div className={styles.info}>
            <div className={styles.headerBlock}>
               <h1 className={styles.infoHeader}>История бронирований</h1>
               <button className={styles.calendar}>
                    <img className={styles.calendarIcon} src={vector}></img>
                    <p className={styles.calendarText}>октябрь 2023</p>
               </button>
            </div>
            <div className={styles.infoStory}>
                <div className={styles.storyHeaders}>
                    <p className={styles.storyHeader_auto}>Автомобиль</p>
                    <p className={styles.storyHeader_price}>Цена за сутки</p>
                    <p className={styles.storyHeader_total}>Итого</p>
                    <p className={styles.storyHeader_date}>Дата</p>
                    <p className={styles.storyHeader_rewiev}>Отзывы</p>
                </div>
                <StoryBlock/>
            </div>
         </div>
    )
}