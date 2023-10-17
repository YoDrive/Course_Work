import React, {useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import styles from "./login.module.css"
import {useForm} from "react-hook-form"
import Header from "../header/header"


export function LoginPage() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context);
    const {
        register,
        formState: {errors},
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = (data: any) =>{
        alert(JSON.stringify(data));
        reset()
    }
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.content}>
                 <div className={styles.registrationForm}>
                      <h1 className={styles.registrationTitle}>Авторизация</h1>
                          <form onSubmit={handleSubmit(onSubmit)}>
                                 <label className={styles.registrationItem}>
                                    E-mail
                                    <input className={styles.itemInput} placeholder="ivanov.ivan@mail.ru"
                                    {...register("email", {
                                        required:"Поле обязательно к заполнению",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "invalid email address"
                                        }
                                        })}
                                    />
                                </label>
                                <div style={{height: 13}}>
                                    {errors?.email && <p className={styles.itemError}>{errors?.root?.message||"*Поле обязательно к заполнению"}</p>}
                                </div>
                                <div style={{height: 13}}>
                                    {errors?.phoneNumber?.message && <p className={styles.itemError}>{errors?.root?.message ||"*Поле обязательно к заполнению"}</p>}
                                </div>
                                <label className={styles.registrationItem}>
                                    Пароль
                                    <input type="password"className={styles.itemInput}
                                    {...register("password", {
                                        required:"Поле обязательно к заполнению",
                                        })}
                                    />
                                </label>
                                <div style={{height: 13}}>
                                    {errors?.password && <p className={styles.itemError}>{errors?.root?.message||"*Поле обязательно к заполнению"}</p>}
                                </div>
                                <div className={styles.registrationButtons}>
                                    <input className={styles.buttonRegistration} onClick={() => handleNavigation('/Registration')} type="button" value="Регистрация"></input>
                                    <input className={styles.loginButton} type="submit" value="Вход"></input>
                                </div>
                            </form>
                </div>
            </div> 
        </div>
    );
}

export default observer(LoginPage);