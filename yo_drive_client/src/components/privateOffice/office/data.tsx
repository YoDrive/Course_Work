import React, {useState} from 'react';
import {useForm} from "react-hook-form"
import styles from './office.module.css';
import {UserModel, UserUpdatePhotoModel} from "../../../models/User/UserModel";
import UserService from "../../../services/UserService";
import {UserUpdateModel} from "../../../models/User/UserUpdateModel";
import LkService from '../../../services/lkService';

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
    const [user, setUser] = useState(props.user);

    const setUserForm = () => {
        setForm(!form);
    }

    const onSubmit = async (data: any) => {
        setUserForm();
        try {
            const userData: UserUpdateModel = {
                userId: props.user.userId,
                firstName: data.firstName,
                surname: data.surname,
                patronymic: data.patronymic,
                phoneNumber: data.phoneNumber,
                email: data.email,
            };
            await UserService.UserUpdateInfo(userData);

            setUser((prevUser) => ({
                ...prevUser,
                firstName: data.firstName,
                surname: data.surname,
                patronymic: data.patronymic,
                phoneNumber: data.phoneNumber,
                email: data.email,
            }));

            alert('Данные успешно обновлены!');
        } catch (error) {
            alert('Ошибка при обновлении данных:');
            console.error('Ошибка при обновлении данных:', error);
        }
    }
    const [image, setImage] = useState<File>()
    const [userUpdateData, setUserUpdateData] = useState<UserUpdatePhotoModel>()

    const setUserPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
    
        if (selectedFile) {
            setImage(selectedFile);
            handleSave();
        }
    }
   
    const handleSave = async () => {
        try {
            if (image && (user.userId !== 0)) {
                const updatedUserPhoto = {
                    ...userUpdateData,
                    image: image,
                    userId: user.userId,
                };
                setUserUpdateData(updatedUserPhoto);
                await UserService.updateUserPhoto(updatedUserPhoto);
                alert("Фото успешно обновлено");
                setUserUpdateData(
                    {userId: 0,
                    image: undefined});
                setImage(undefined);
            }
        } catch (error) {
            alert("Ошибка при обновлении фото");
        }
    };
    return (
        <div className={styles.info}>
            <h1 className={styles.infoHeader}>Мои данные</h1>
            <form className={styles.infoText} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.infoName}>
                    <h2 className={styles.name}>Фамилия</h2>
                    {!form && <p className={styles.nameInfo}>{user.surname || ""}</p>}
                    {form && <input className={styles.nameInput} defaultValue={user.surname || ""}
                                    {...register("surname")}/>}
                </div>
                <div className={styles.infoName}>
                    <h2 className={styles.name}>Имя</h2>
                    {!form && <p className={styles.nameInfo}>{user.firstName || ""}</p>}
                    {form && <input className={styles.nameInput} defaultValue={user.firstName || ""}
                                    {...register("firstName")}/>}
                </div>
                <div className={styles.infoName}>
                    <h2 className={styles.name}>Отчество</h2>
                    {!form && <p className={styles.nameInfo}>{user.patronymic || ""}</p>}
                    {form && <input className={styles.nameInput} defaultValue={user.patronymic || ""}
                                    {...register("patronymic")}/>}
                </div>
                <div className={styles.infoName_phone}>
                    <h2 className={styles.name}>Телефон</h2>
                    {!form && <p className={styles.nameInfo}>{user.phoneNumber || ""}</p>}
                    {form && <input className={styles.nameInput} defaultValue={user.phoneNumber || ""}
                                    {...register("phoneNumber")}/>}
                </div>
                <div className={styles.infoName}>
                    <h2 className={styles.name}>Почта</h2>
                    {!form && <p className={styles.nameInfo}>{user.email || ""}</p>}
                    {form && <input className={styles.nameInput} defaultValue={user.email || ""}
                                    {...register("email")}/>}
                </div>
            </form>
            <div className={styles.buttons}>
                {!form &&
                    <button className={styles.buttonEdit} onClick={() => setUserForm()}>Редактировать данные</button>}
                {form &&
                    <button className={styles.buttonEdit} onClick={handleSubmit(onSubmit)}>Сохранить данные</button>}
                <label htmlFor="userImg" className={styles.buttonImg}>Загрузить изображение</label>
                <input type='file' accept=".png, .jpg,.jpeg" id="userImg" className={styles.imgIcon}  onChange={(e) => setUserPhoto(e)}></input>
                <button className={styles.buttonDelete} onClick={handleSave}>Удалить аккаунт</button>
            </div>
        </div>
    )
}