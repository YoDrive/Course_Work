import React, {useState}from "react";
import { useNavigate } from "react-router-dom";
import Store from "../../store/Store";
import {useForm, SubmitHandler} from "react-hook-form"
import styles from "./registration.module.css"
import Header from "../header/header"
import {RegistrationModel} from "../../models/Auth/Registration.model";

export function Registration() {
    const [shown, setShown] = useState(false);
    const navigate = useNavigate();
    const store = new Store();
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm<RegistrationModel>({
        mode: "onBlur"
    });

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    const onSubmit: SubmitHandler<RegistrationModel> = async (data) => {
        await store.registration(data);
        store.isAdmin() ? handleNavigation('/lkAdmin') : handleNavigation('/lkClient');
    }

    return (
        <div className={styles.container}>
            <Header/>
            <div className={styles.content}>
                <div className={styles.registrationForm}>
                    <h1 className={styles.registrationTitle}>Регистрация</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label className={styles.registrationItem}>
                            Фамилия
                            <input className={styles.itemInput} placeholder="Иванов"
                                   {...register("surName", {
                                       required: "Поле обязательно к заполнению"
                                   })}
                            />
                        </label>
                        <div style={{height: 13}}>
                            {errors?.surName &&
                                <p className={styles.itemError}>{errors?.root?.message || "*Поле обязательно к заполнению"}</p>}
                        </div>
                        <label className={styles.registrationItem}>
                            Имя
                            <input className={styles.itemInput} placeholder="Иван"
                                   {...register("firstName", {
                                       required: "Поле обязательно к заполнению"
                                   })}
                            />
                        </label>
                        <div style={{height: 13}}>
                            {errors?.firstName &&
                                <p className={styles.itemError}>{errors?.root?.message || "*Поле обязательно к заполнению"}</p>}
                        </div>
                        <label className={styles.registrationItem}>
                            Отчество
                            <input className={styles.itemInput} placeholder="Иванович"
                                   {...register("patronymic", {
                                       required: "Поле обязательно к заполнению"
                                   })}
                            />
                        </label>
                        <div style={{height: 13}}>
                            {errors?.patronymic &&
                                <p className={styles.itemError}>{errors?.root?.message || "*Поле обязательно к заполнению"}</p>}
                        </div>
                        <label className={styles.registrationItem}>
                            E-mail
                            <input className={styles.itemInput} placeholder="ivanov.ivan@mail.ru"
                                   {...register("email", {
                                       required: "Поле обязательно к заполнению",
                                       pattern: {
                                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                           message: "Неправильно введён адрес почты"
                                       }
                                   })}
                            />
                        </label>
                        <div style={{height: 13}}>
                            {errors?.email &&
                                <p className={styles.itemError}>{errors?.email?.message || "*Поле обязательно к заполнению"}</p>}
                        </div>
                        <label className={styles.registrationItem}>
                            Телефон
                            <input className={styles.itemInput} placeholder="+79199191919"
                                   {...register("phoneNumber", {
                                       required: "Поле обязательно к заполнению",
                                       pattern:{
                                        value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i,
                                        message: "Неправильный номер телеофона"
                                        },
                                       minLength: {
                                           value: 12,
                                           message: "Минимум 12 символов."
                                       }
                                   })}
                            />
                        </label>
                        <div style={{height: 13}}>
                            {errors?.phoneNumber?.message &&
                                <p className={styles.itemError}>{errors?.phoneNumber?.message || "*Поле обязательно к заполнению"}</p>}
                        </div>
                        <label className={styles.registrationItem}>
                            Пароль
                            <input type={shown ? "text" : "password"} className={styles.itemInput}
                                   {...register("password", {
                                       required: "Поле обязательно к заполнению",
                                   })}
                            />
                            <div className={styles.passwordShow}>       
                                <input type="checkbox" className={styles.checkbox} onClick={() => setShown(!shown)} />
                                <label className={styles.showPas}>Показать пароль</label>
                            </div>
                        </label>
                        <div style={{height: 13}}>
                            {errors?.password &&
                                <p className={styles.itemError}>{errors?.root?.message || "*Поле обязательно к заполнению"}</p>}
                        </div>
                        <div className={styles.registrationButtons}>
                            <input onClick={() => handleNavigation('/HomePage')} className={styles.buttonExit} type="button" value="Отмена"></input>
                            <input className={styles.registrationButton} type="submit"
                                   value="Зарегистрироваться"></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Registration;