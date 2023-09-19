import React from 'react';
import styles from './contact.module.css';
import phoneImg from '../../../assets/phoneMini.svg';
import mark from '../../../assets/mark.svg';

export function Contact() {

    return (
        <div className={styles.contactContainer}>
            <h2 className={styles.title}>Связаться с нами</h2>
            <div className={styles.container}>
                <div className={styles.contacts}>
                    <div className={styles.contactsInfo}>
                        <h3 className={styles.contactsSubtitle}>Телефон:</h3>
                        <div className={styles.contactsCouple}>
                            <img src={phoneImg} alt=""/>
                            <p className={styles.contactsText}>8(800)535-35-35</p>
                        </div>
                    </div>
                    <div className={styles.contactsInfo}>
                        <h3 className={styles.contactsSubtitle}>Адрес:</h3>
                        <div className={styles.contactsCouple}>
                            <img src={mark} alt=""/>
                            <p className={styles.contactsText}>г.Йошкар-Ола, Эшкинина 10В</p>
                        </div>
                    </div>
                </div>
                <iframe className={styles.map} src="https://yandex.ru/map-widget/v1/?ll=47.912418%2C56.631159&mode=search&whatshere%5Bpoint%5D=47.907271%2C56.630982&whatshere%5Bzoom%5D=17&z=17.2"></iframe>
            </div>
        </div>
    )
}

export default Contact;