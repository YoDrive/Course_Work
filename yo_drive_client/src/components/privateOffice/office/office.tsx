import React, {useState} from 'react';
import styles from './office.module.css';
import User from '../../../assets/user.svg';
import { Story } from './story';
import { Data } from './data';

export function Office() {
    const[data, setData] = useState(true);
    const[story, setStory] = useState(false);
    const dateHandler = () =>{
        setData(true);
        setStory(false);
    }
    const storyHandler= ()=>{
        setData(false);
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
                            <button onClick={storyHandler} className={styles.menuButton}>История бронирований</button>
                            <button  className={styles.menuButton}>Забронировать автомобиль</button>
                            <button  className={styles.menuButton}>Выход</button>
                        </div>
                    </div>
                    {data && <Data/>}
                    {story && <Story/>}
            </div>
        </div>
        </div>
    );
}

export default Office;