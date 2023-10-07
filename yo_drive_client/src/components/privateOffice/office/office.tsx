import React, {useState} from 'react';
import styles from './office.module.css';
import User from '../../../assets/user.svg'
import vector from '../../../assets/Vector2.svg'
import star from '../../../assets/star.svg'
import rewiew from '../../../assets/rewiev.svg'


export function Office() {
    const[date, setDate] = useState(true);
    const[story, setStory] = useState(false);
    const dateHandler = () =>{
        setDate(true);
        setStory(false);
    }
    const storyHandler= ()=>{
        setDate(false);
        setStory(true);
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.mainPart}>
                    <div className={styles.menu}>
                        <div className={styles.menuHead}>
                            <img className={styles.headIcon} src={User} alt=""></img>
                            <p className={styles.headName}>Фамилия Имя Oтчество</p>
                        </div>
                        <div className={styles.menuButtons}>
                            <button onClick={dateHandler} className={styles.menuButton}>Мои данные</button>
                            <button onClick={storyHandler}className={styles.menuButton}>История бронирований</button>
                            <button  className={styles.menuButton}>Забронировать автомобиль</button>
                            <button  className={styles.menuButton}>Выход</button>
                        </div>
                    </div>
                    {date && <div className={styles.info}>
                        <h1 className={styles.infoHeader}>Мои данные</h1>
                        <div className={styles.infoText}>
                            <div className={styles.infoName}>
                                <h2 className={styles.name}>Фамилия</h2>
                                <p className ={styles.nameInfo}>Ильдюков</p>
                            </div>
                            <div className={styles.infoName}>
                                <h2 className={styles.name}>Имя</h2>
                                <p className ={styles.nameInfo}>Дмитрий</p>
                            </div>
                            <div className={styles.infoName}>
                                <h2 className={styles.name}>Отчество</h2>
                                <p className ={styles.nameInfo}>Юрьевич</p>
                            </div>
                            <div className={styles.infoName_phone}>
                                <h2 className={styles.name}>Телефон</h2>
                                <p className ={styles.nameInfo}>+79023493444</p>
                            </div>
                            <div className={styles.infoName}>
                                <h2 className={styles.name}>Почта</h2>
                                <p className ={styles.nameInfo}>asdzy@mail.ru</p>
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            <button className={styles.buttonEdit}>Редактировать данные</button>
                            <button className={styles.buttonImg}>Загрузить изображение</button>
                            <button className={styles.buttonDelete}>Удалить аккаунт</button>
                        </div>
                    </div>}
                    {story && <div className={styles.info}>
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
                            <div className={styles.storyBlocks}>
                                <div className={styles.storyBlock}>
                                    <p className={styles.blockText_first}>Mercedes-Benz G63 AMG</p>
                                    <p className={styles.blockText_second}>11500₽/сутки</p>
                                    <p className={styles.blockText_third}>23 000 ₽</p>
                                    <p className={styles.blockText_fourth}>1 окт. 2023 - 3 окт.2023 </p>
                                    <p className={styles.blockText_rewiev }>
                                        <img className={styles.rewiev_star} src={star}></img>
                                        <p className={styles.rewiev_digit}>5.0</p>
                                        <img className={styles.rewiev_icon} src={rewiew}></img>
                                    </p>
                                </div>
                            </div>
                        </div>
                        </div>}
            </div>
        </div>
        </div>
    );
}

export default Office;