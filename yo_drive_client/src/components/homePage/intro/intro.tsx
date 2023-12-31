import React from 'react';
import styles from './intro.module.css';
import firstImage from '../../../assets/firstImage.svg';
import secondImage from '../../../assets/secondImage.svg';
import thirdImage from '../../../assets/thirdImage.svg';
import Header from "../../header/header";
import { useNavigate } from "react-router-dom";

export function Intro() {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div className={styles.content}>
            <Header/>
            <div className={styles.introInfoContainer}>
                <div className={styles.introInfo}>
                    <h1 className={styles.title}>YoDrive</h1>
                    <h2 className={styles.subTitle}>Хочешь драйва - тебе к нам</h2>
                    <p className={styles.info}>YoDrive - компания аренды автомобилей в Йошкар-Оле. Более 5 лет на рынке. Лучшие цены в городе.</p>
                    <button className={styles.searchCarBtn} onClick={() => handleNavigation('/bookingPage')}>Найти автомобиль</button>
                </div>
            </div>
            <ul className={styles.benefit}>
                <li className={styles.benefitItem}>
                    <img className={styles.benefitImage} src={firstImage} alt=""></img>
                    <p className={styles.benefitText}>Более 50 автомобилей различных марок и моделей в автопарке</p>
                </li>
                <li className={styles.benefitItem}>
                    <img className={styles.benefitImage} src={secondImage} alt=""></img>
                    <p className={styles.benefitText}>Надежность сделки закреплена договором</p>
                </li>
                <li className={styles.benefitItem}>
                    <img className={styles.benefitImage} src={thirdImage} alt=""></img>
                    <p className={styles.benefitText}>Высокая скорость оформления сделки</p>
                </li>
            </ul>
        </div>
    );
}

export default Intro;