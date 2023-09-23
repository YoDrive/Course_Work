import React from 'react';
import styles from './authorization.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export function AuthorizationPage() {

    return (
        //      Без bootstrap
        //     <div className={styles.authBox}>
        //         <h1 className={styles.title}>Авторизация</h1>
        //         <div className={styles.inputContainer}>
        //             <div className={styles.form}>
        //                 <p className={styles.inputText}>Email:</p>
        //                 <input className={styles.inputForm} type="text"/>
        //             </div>
        //             <div className={styles.form}>
        //                 <p className={styles.inputText}>Пароль:</p>
        //                 <input className={styles.inputForm} type="text"/>
        //             </div>
        //         </div>
        //         <div className={styles.buttons}>
        //             <button className={styles.registerBtn}>Регистрация</button>
        //             <button className={styles.enterBtn}>Вход</button>
        //         </div>
        //     </div>

        <div className={styles.container}>
            <div className={styles.authBox}>
                <h1 className={styles.title}>Авторизация</h1>
                <Form className={styles.inputContainer}>
                    <Form.Group className={styles.form} controlId="formBasicEmail">
                        <Form.Label className={styles.inputText} >Email</Form.Label>
                        <Form.Control className={styles.inputForm} type="email" />
                    </Form.Group>
                    <Form.Group className={styles.form} controlId="formBasicPassword">
                        <Form.Label className={styles.inputText}>Пароль</Form.Label>
                        <Form.Control className={styles.inputForm} type="password" />
                    </Form.Group>
                    <div className={styles.buttons}>
                         <Button className={styles.registerBtn} variant="dark" type="submit">Регистрация</Button>
                         <Button className={styles.enterBtn} variant="dark" type="submit">Вход</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default AuthorizationPage;