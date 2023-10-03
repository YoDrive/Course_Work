import React from 'react';
import styles from './office.module.css';
import User from '../../../assets/user.svg'
import Header from "../../header/header";

export function Office() {

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <Header/>
                <div className={styles.mainPart}>
                    <div className={styles.menu}>
                        <div className={styles.menuHead}>
                            <img className={styles.headIcon} src={User} alt=""></img>
                            <p className={styles.headName}>Фамилия Имя Oтчество</p>
                        </div>
                        <div className={styles.menuButtons}>
                            <button  className={styles.menuButton}>Мои данные</button>
                            <button  className={styles.menuButton}>Редактировать профиль</button>
                            <button  className={styles.menuButton}>История бронирований</button>
                            <button  className={styles.menuButton}>Забронировать автомобиль</button>
                            <button  className={styles.menuButton}>Настройки</button>
                            <button  className={styles.menuButton}>Выход</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Office;