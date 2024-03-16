import styles from './story.module.css';
import {useState} from 'react';
import StoryBlock  from './storyBlock';

export function Story(){
    const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
    const [selectedMonthDate, setSelectedMonthDate] = useState<Date>(new Date);
    const [allRent, setAllRent] = useState(false);

    const rentHandler =() =>{
      setAllRent(true)
    }
    function getCurrentMonth() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        let month = currentDate.getMonth() + 1; 
        return `${year}-${month.toString().padStart(2, '0')}`;
      }
      function getCurrentMonthDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        return new Date(year, month, 1); 
      }
      const handleMonthChange = (event: any) => {
        const selectedDate = new Date(event.target.value + "-01");;
        setSelectedMonthDate(selectedDate);
        setAllRent(false)
      };
    return(
        <div className={styles.info}>
            <div className={styles.headerBlock}>
               <h1 className={styles.infoHeader}>История бронирований</h1>
               <div className={styles.headerButtons}>
                <button className={styles.allButton} onClick={rentHandler}>Все</button>
                <button className={styles.calendar}>
                <input type="month" className={styles.calendarStyles}  defaultValue={selectedMonth} 
            onChange={handleMonthChange} />
                </button>
                </div>
            </div>
            <div className={styles.infoStory}>
                <div className={styles.storyHeaders}>
                    <p className={styles.storyHeader_auto}>Автомобиль</p>
                    <p className={styles.storyHeader_price}>Цена за сутки</p>
                    <p className={styles.storyHeader_total}>Итого</p>
                    <p className={styles.storyHeader_date}>Дата</p>
                    <p className={styles.storyHeader_rewiev}>Отзывы</p>
                </div>
                <StoryBlock  selectedMonth={selectedMonthDate} allRent={allRent}/>
            </div>
         </div>
    )
}