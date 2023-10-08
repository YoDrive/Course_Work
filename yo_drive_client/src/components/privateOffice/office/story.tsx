import styles from './story.module.css';
import vector from '../../../assets/Vector2.svg'
import { StoryBlock } from './storyBlock';

export function Story(){
    return(
        <div className={styles.info}>
                        <div className={styles.headerBlock}>
                           <h1 className={styles.infoHeader}>История бронирований</h1>
                           <div className={styles.calendar}>
                                <img className={styles.calendarIcon} src={vector}></img>
                                <p className={styles.calendarText}>октябрь 2023</p>
                           </div>
                        </div>
                        <div className={styles.infoStory}>
                            <div className={styles.storyHeaders}>
                                <p className={styles.storyHeader}>Автомобиль</p>
                                <p className={styles.storyHeader}>Цена за сутки</p>
                                <p className={styles.storyHeader}>Итого</p>
                                <p className={styles.storyHeader}>Дата</p>
                                <p className={styles.storyHeader_rewiev}>Отзывы</p>
                            </div>
                            <ul className={styles.storyBlocks}>
                                <StoryBlock/>
                            </ul>
                        </div>
         </div>
    )
}