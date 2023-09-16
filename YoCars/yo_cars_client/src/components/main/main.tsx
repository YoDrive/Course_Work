import React from 'react';
import styles from './main.module.css';
import firstImage from '../../assets/firstImage.svg';
import secondImage from '../../assets/secondImage.svg';
import thirdImage from '../../assets/thirdImage.svg';


export function Main() {
    
    return (
        <div className={styles.main}>
             <div className={styles.mainBackground}></div>
             <div className={styles.mainInfo}>
                <h1 className={styles.mainTitle}>YoDrive</h1> 
                <h2 className={styles.mainSubtitle}>Хочешь драйва — тебе к нам</h2>
                <p className={styles.mainText}>YoDrive - компания аренды автомобилей в Йошкар-Оле. Более 5 лет на рынке. Лучшие цены в городе.</p>
            </div>
            <button className={styles.button}>Найти автомобиль</button>
            <ul className={styles.mainAdvantage}>
               <li className={styles.advantageItem}>
                   <img className={styles.advantageImage} src={firstImage} alt=""></img>
                   <p className={styles.advantageText}>Более 50 автомобилей различных марок и моделей в автопарке</p>
               </li>
               <li className={styles.advantageItem}>
                   <img className={styles.advantageImage} src={secondImage} alt=""></img>
                   <p className={styles.advantageText}>Надежность сделки закреплена договором</p>
               </li>
               <li className={styles.advantageItem}>
                   <img className={styles.advantageImage} src={thirdImage} alt=""></img>
                   <p className={styles.advantageText}>Высокая скорость оформления</p>
               </li>
            </ul>
        </div>
    );
};

export default Main;