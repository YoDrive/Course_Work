import React, { useState} from 'react';
import { useForm} from "react-hook-form"
import styles from './office.module.css';
import { UserModel } from '../../../models/Booking/BookingResponseModel';
export function Data(){
    let testModels: UserModel[] = [
        {
            firstName: "Димочка",
            surname: "Ильдюков",
            patronymic: "Юрьевич",
            email: "asdzy@mail.ru",
            phoneNumber: "iueffe"
        }
    ]
    const {
        register,
        handleSubmit,
    } = useForm({
        mode: "onBlur"
    });
    const [form, setForm] = useState(false);
    const setUserForm =()=>{
        setForm(!form)
    }
    const onSubmit=(data:any) =>{
        console.log(data);
        setUserForm()
    }
    return(
        <div className={styles.info}>
            <h1 className={styles.infoHeader}>Мои данные</h1>
            <form className={styles.infoText} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.infoName}>
                    <h2 className={styles.name}>Фамилия</h2>
                    {!form &&<p className ={styles.nameInfo}>Ильдюков</p>}
                    {form && <input className={styles.nameInput} defaultValue={"Ильдюков"}
                    { ...register("firstName")}/>}
                </div>
                <div className={styles.infoName}>
                    <h2 className={styles.name}>Имя</h2>
                    {!form &&<p className ={styles.nameInfo}>Дмитрий</p>}
                    {form && <input className={styles.nameInput} defaultValue={"Дмитрий"}
                    {...register("surName")}/>}
                </div>
                <div className={styles.infoName}>
                    <h2 className={styles.name}>Отчество</h2>
                    {!form &&<p className ={styles.nameInfo}>Юрьевич</p>}
                    {form && <input className={styles.nameInput} defaultValue={"Юрьевич"}
                    {...register("patronymic")}/>}
                </div>
                <div className={styles.infoName_phone}>
                    <h2 className={styles.name}>Телефон</h2>
                    {!form &&<p className ={styles.nameInfo}>+79023493444</p>}
                    {form && <input className={styles.nameInput} defaultValue={"+79023493444"}
                    {...register("phoneNumber")}/>}
                </div>
                <div className={styles.infoName}>
                    <h2 className={styles.name}>Почта</h2>
                    {!form &&<p className ={styles.nameInfo}>asdzy@mail.ru</p>}
                    {form && <input className={styles.nameInput} defaultValue={"asdzy@mail.ru"}
                    {...register("email")}/>}
                </div>
            </form>
            <div className={styles.buttons}>
                {!form &&<button className={styles.buttonEdit} onClick={()=>setUserForm()}>Редактировать данные</button>}
                {form &&<button className={styles.buttonEdit} onClick={(handleSubmit(onSubmit))}>Сохранить данные</button>}
                <button className={styles.buttonImg}>Загрузить изображение</button>
                <button className={styles.buttonDelete}>Удалить аккаунт</button>
            </div>
        </div>
    )
}