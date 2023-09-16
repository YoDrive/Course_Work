import React from 'react';
import styles from './contact.module.css';
import phoneImg from '../../../assets/phoneMini.svg';
import mark from '../../../assets/mark.svg';

export function Contact() {

    return (
        <div className={styles.contactContainer}>
            <h2 className={styles.tytle}>Связаться с нами</h2>
            <div className={styles.container}>
                <div className={styles.contacts}>
                    <div>
                        <h3>По телефону:</h3>
                        <div>
                            <img src={phoneImg} alt=""/>
                            <p>8(800)535-35-35</p>
                        </div>
                    </div>
                    <div>
                        <h3>Адрес:</h3>
                        <div>
                            <img src={mark} alt=""/>
                            <p>г.Йошкар-Ола, Ленинский проспект 18б</p>
                        </div>
                    </div>
                </div>
                <div className={styles.map}>

                </div>
            </div>
        </div>
    );
}

export default Contact;