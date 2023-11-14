import React, {useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import styles from "./login.module.css"
import {SubmitHandler, useForm} from "react-hook-form"
import Header from "../header/header"
import {User} from "../../models/Auth/User.model";

export function LoginPage() {
    const [shown, setShown] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context);
    const {
        register,
        formState: {errors},
        handleSubmit
    } = useForm<User>({
        mode: "onBlur"
    });

    const onSubmit: SubmitHandler<User> = async (data) => {
        try {
            await store.login(data);
            store.isAdmin() ? handleNavigation('/lkAdmin') : handleNavigation('/lkClient');
        }
        catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert("Произошла ошибка");
            }
        }
    }

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
                            <input className={styles.itemInput} placeholder="ivanov.ivan@mail.ru" autoComplete="off"
                                   {...register("email", {
                                       required:"Поле обязательно к заполнению",
                                       pattern: {
                                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                           message: "Неправильно введён адрес почты"
                                       }
                                   })}
                            />
                        </label>
                        <div style={{height: 13}}>
                            {errors?.email && <p className={styles.itemError}>{errors?.email.message||"*Поле обязательно к заполнению"}</p>}
                        </div>
                        <label className={styles.registrationItem}>
                            Пароль
                            <input type={shown ? "text" : "password"} className={styles.itemInput} autoComplete="off"
                                   {...register("password", {
                                       required:"Поле обязательно к заполнению",
                                   })}/>
                            <div className={styles.passwordShow}>       
                                <input type="checkbox" className={styles.checkbox} onClick={() => setShown(!shown)} />
                                <label className={styles.showPas}>Показать пароль</label>
                            </div>
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