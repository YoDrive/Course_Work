import styles from './story.module.css';
import {useState} from 'react';
import vector from '../../../assets/Vector2.svg'
import { StoryBlock } from './storyBlock';
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/primereact.min.css';

export function Story(){
    const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

    function getCurrentMonth() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1; // Месяцы в JavaScript начинаются с 0
        return `${year}-${month.toString().padStart(2, '0')}`;
      }

  const handleMonthChange = (event:any) => {
    setSelectedMonth(event.target.value);
  };
    const[date, setDate]= useState();
    const dateHandler =()=>{
        setDate(date);
        console.log(date);
    }
    return(
        <div className={styles.info}>
            <div className={styles.headerBlock}>
               <h1 className={styles.infoHeader}>История бронирований</h1>
               <button className={styles.calendar}>
               <input type="month" className={styles.calendarStyles}  defaultValue={selectedMonth}
          onChange={handleMonthChange} />
         
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