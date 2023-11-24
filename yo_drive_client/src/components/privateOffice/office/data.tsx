import React, { useState} from 'react';
import styles from './office.module.css';
//import { User } from '../../../models/Auth/User.model';
export function Data(){
   // let testModels: BookingResponseModel[] = []
    const [form, setForm] = useState(false);
    const setUserForm =()=>{
        setForm(!form)
    }
    return(
        <div className={styles.info}>
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
        </div>
    )
}