import React, {useContext, useState} from 'react';
import styles from './office.module.css';
import User from '../../../assets/user.svg';
import { Story } from './story';
import { Data } from './data';
import {useNavigate} from "react-router-dom";
import {useStore} from "../../../index";

export function Office() {
    const navigate = useNavigate();
    const[data, setData] = useState(true);
    const[story, setStory] = useState(false);
    const store = useStore();
    const dataHandler = () =>{
        setData(true);
        setStory(false);
    }
    const storyHandler= ()=>{
        setData(false);
        setStory(true);
    }

    const handleLogout = async () => {
        try {
            await store.logout();
        } catch (error) {
            console.log(error);
        }
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

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
                            <button onClick={dataHandler} className={styles.menuButton}>Мои данные</button>
                            <button onClick={storyHandler} className={styles.menuButton}>История бронирований</button>
                            <button onClick={() => handleNavigation('/bookingPage')}
                                    className={styles.menuButton}>Забронировать автомобиль
                            </button>
                            <button onClick={handleLogout} className={styles.menuButton}>Выход</button>
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