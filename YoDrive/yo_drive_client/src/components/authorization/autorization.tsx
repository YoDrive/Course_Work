import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import styles from './authorization.module.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { User } from "../../models/Auth/user.model";


export function AuthorizationPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({email: '', password: ''});

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5083',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({...user, [name]: value});
    }

    const handAuthorization = async () => {
        try
        {
            await axiosInstance.post('/api/auth/login', user);
            alert('Авторизация прошла успешно');
            navigate('/lkClient');
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
                        <Form.Control
                            className={styles.inputForm}
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className={styles.form} controlId="formBasicPassword">
                        <Form.Label className={styles.inputText} onChange={handleInputChange}>Пароль</Form.Label>
                        <Form.Control
                            className={styles.inputForm}
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <div className={styles.buttons}>
                         <Button className={styles.registerBtn} variant="dark">Регистрация</Button>
                         <Button className={styles.enterBtn} onClick={handAuthorization} variant="dark">Вход</Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default AuthorizationPage;