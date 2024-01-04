import React, {useState} from 'react';
import {useForm} from "react-hook-form"
import styles from './office.module.css';
import {UserModel} from "../../../models/User/UserModel";
import UserService from "../../../services/UserService";
import {UserUpdateModel} from "../../../models/User/UserUpdateModel";

interface Props {
    user: UserModel;
}

export function Data(props: Props) {
    const {
        register,
        handleSubmit,
    } = useForm({
        mode: "onBlur"
    });

    const [form, setForm] = useState(false);

    const setUserForm = () => {
        setForm(!form);
    }

    const onSubmit = async (data: any) => {
        setUserForm();
        const userData: UserUpdateModel = {
            userId: props.user.userId,
            firstName: data.firstName,
            surname: data.surname,
            patronymic: data.patronymic,
            phoneNumber: data.phoneNumber,
            email: data.email,
        };
        await UserService.UserUpdateInfo(userData);
    }

    return (
        <div className={styles.info}>
            <h1 className={styles.infoHeader}>Мои данные</h1>
            <form className={styles.infoText} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.infoName}>
                    <h2 className={styles.name}>Фамилия</h2>
                    {!form && <p className={styles.nameInfo}>{props.user.surname || ""}</p>}
                    {form && <input className={styles.nameInput} defaultValue={props.user.surname || ""}
                                    {...register("surname")}/>}
                </div>
                <div className={styles.infoName}>
                    <h2 className={styles.name}>Имя</h2>
                    {!form && <p className={styles.nameInfo}>{props.user.firstName || ""}</p>}
                    {form && <input className={styles.nameInput} defaultValue={props.user.firstName || ""}
                                    {...register("firstName")}/>}
                </div>
                <div className={styles.infoName}>
                    <h2 className={styles.name}>Отчество</h2>
                    {!form && <p className={styles.nameInfo}>{props.user.patronymic || ""}</p>}
                    {form && <input className={styles.nameInput} defaultValue={props.user.patronymic || ""}
                                    {...register("patronymic")}/>}
                </div>
                <div className={styles.infoName_phone}>
                    <h2 className={styles.name}>Телефон</h2>
                    {!form && <p className={styles.nameInfo}>{props.user.phoneNumber || ""}</p>}
                    {form && <input className={styles.nameInput} defaultValue={props.user.phoneNumber || ""}
                                    {...register("phoneNumber")}/>}
                </div>
                <div className={styles.infoName}>
                    <h2 className={styles.name}>Почта</h2>
                    {!form && <p className={styles.nameInfo}>{props.user.email || ""}</p>}
                    {form && <input className={styles.nameInput} defaultValue={props.user.email || ""}
                                    {...register("email")}/>}
                </div>
            </form>
            <div className={styles.buttons}>
                {!form &&
                    <button className={styles.buttonEdit} onClick={() => setUserForm()}>Редактировать данные</button>}
                {form &&
                    <button className={styles.buttonEdit} onClick={handleSubmit(onSubmit)}>Сохранить данные</button>}
                <button className={styles.buttonImg}>Загрузить изображение</button>
                <button className={styles.buttonDelete}>Удалить аккаунт</button>
            </div>
        </div>
    )
}