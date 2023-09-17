import React from 'react';
import styles from './footer.module.css';
import vkImg from '../../assets/vk.svg';
import tgImg from '../../assets/tg.svg';
import ytImg from '../../assets/yt.svg';
import instImg from '../../assets/inst.svg';

export function Footer() {
    
    return (
        <div className={styles.footer}>
            <p className={styles.footerInfo}>© 2023. YoDrive. Компания аренды автомобилей.<br/>Официальный сайт.</p>
            <div className={styles.links}>
                <p className={styles.linksText}>Наши соцсети</p>
                <img src={vkImg} alt=""/>
                <img src={tgImg} alt=""/>
                <img src={ytImg} alt=""/>
                <img src={instImg} alt=""/>
            </div>
            <p className={styles.footerLink}>Правовая информация</p>
        </div>
    )
}

export default Footer;