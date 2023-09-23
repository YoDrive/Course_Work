import React from 'react';
import styles from './authorization.module.css';
export function AuthorizationPage() {

    return (
        <div className={styles.container}>
            <div className={styles.authBox}>
                <h1 className={styles.title}>Авторизация</h1>
                <div className={styles.inputContainer}>
                    <div className={styles.form}>
                        <p className={styles.inputText}>Email:</p>
                        <input className={styles.inputForm} type="text"/>
                    </div>
                    <div className={styles.form}>
                        <p className={styles.inputText}>Пароль:</p>
                        <input className={styles.inputForm} type="text"/>
                    </div>
                </div>
                <div className={styles.buttons}>
                    <button className={styles.registerBtn}>Регистрация</button>
                    <button className={styles.enterBtn}>Вход</button>
                </div>
            </div>
        </div>
    );
}

export default AuthorizationPage;