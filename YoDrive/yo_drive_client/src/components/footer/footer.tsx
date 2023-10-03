import React from 'react';
import styles from './footer.module.css';
import vkImg from '../../assets/vk.svg';
import tgImg from '../../assets/tg.svg';
import ytImg from '../../assets/yt.svg';
import instImg from '../../assets/inst.svg';

export function Footer() {
    
    return (
        <div className={styles.container}>
            <div className={styles.footer}>
                <p className={styles.footerInfo}>© 2023. YoDrive. Компания аренды автомобилей.<br/>Официальный сайт.</p>
                <div className={styles.links}>
                    <p className={styles.linksText}>Наши соцсети</p>
                    <img className={styles.linksIcon} src={vkImg} alt=""/>
                    <img className={styles.linksIcon} src={tgImg} alt=""/>
                    <img className={styles.linksIcon} src={ytImg} alt=""/>
                    <img className={styles.linksIcon} src={instImg} alt=""/>
                </div>
                <p className={styles.footerLink}>Правовая информация</p>
            </div>
        </div>
    )
}

export default Footer;