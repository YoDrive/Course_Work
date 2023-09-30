import React, { useState, ChangeEvent } from 'react';
import axios from "axios";
import styles from './authorization.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

interface User {
    email: string;
    password: string;
}

export function AuthorizationPage() {

    const [user, setUser] = useState<User>({email: '', password: ''});

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5083', // Укажите нужный адрес и порт
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({...user, [name]: value});
    }

    const handAuthorization = async () => {
        console.log(user);

        try
        {
            await axiosInstance.post('/api/auth', user);
            alert('Авторизация прошла успешно');
        }
        catch (error)
        {
            console.error('Ошибка авторизации: ', error);
            alert('Ошибка при авторизации');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.authBox}>
                <h1 className={styles.title}>Авторизация</h1>
                <Form className={styles.inputContainer}>
                    <Form.Group className={styles.form} controlId="formBasicEmail">
                        <Form.Label className={styles.inputText} onChange={handleInputChange}>Email</Form.Label>
                        <Form.Control className={styles.inputForm} type="email" />
                    </Form.Group>
                    <Form.Group className={styles.form} controlId="formBasicPassword">
                        <Form.Label className={styles.inputText} onChange={handleInputChange}>Пароль</Form.Label>
                        <Form.Control className={styles.inputForm} type="password" />
                    </Form.Group>
                    <div className={styles.buttons}>
                         <Button className={styles.registerBtn} variant="dark" type="submit">Регистрация</Button>
                         <Button className={styles.enterBtn} onClick={handAuthorization} variant="dark" type="submit">Вход</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default AuthorizationPage;