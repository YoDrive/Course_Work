import {useForm} from "react-hook-form"
import styles from "./registration.module.css"
import Header from "../header/header"
export function Registration() {
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
                                   {...register("lastName", {
                                       required: "Поле обязательно к заполнению"
                                   })}
                            />
                        </label>
                        <div style={{height: 13}}>
                            {errors?.lastName &&
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
                                           message: "invalid email address"
                                       }
                                   })}
                            />
                        </label>
                        <div style={{height: 13}}>
                            {errors?.email &&
                                <p className={styles.itemError}>{errors?.root?.message || "*Поле обязательно к заполнению"}</p>}
                        </div>
                        <label className={styles.registrationItem}>
                            Телефон
                            <input className={styles.itemInput} placeholder="+79199191919"
                                   {...register("phoneNumber", {
                                       required: "Поле обязательно к заполнению",
                                       minLength: {
                                           value: 12,
                                           message: "Минимум 12 символов."
                                       }
                                   })}
                            />
                        </label>
                        <div style={{height: 13}}>
                            {errors?.phoneNumber?.message &&
                                <p className={styles.itemError}>{errors?.root?.message || "*Поле обязательно к заполнению"}</p>}
                        </div>
                        <label className={styles.registrationItem}>
                            Пароль
                            <input type="password" className={styles.itemInput}
                                   {...register("password", {
                                       required: "Поле обязательно к заполнению",
                                   })}
                            />
                        </label>
                        <div style={{height: 13}}>
                            {errors?.password &&
                                <p className={styles.itemError}>{errors?.root?.message || "*Поле обязательно к заполнению"}</p>}
                        </div>
                        <div className={styles.registrationButtons}>
                            <input onClick={reset} className={styles.buttonExit} type="button" value="Отмена"></input>
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