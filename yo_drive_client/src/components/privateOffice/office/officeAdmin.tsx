import React, {useState} from 'react';
import styles from './officeAdmin.module.css';
import User from '../../../assets/user.svg'
import { Statistics } from './statistics';
import { Data } from './data'
import { Editor } from './editor'
import {useStore} from "../../../index";


export function OfficeAdmin() {
    const[data, setData] = useState(true);
    const[statistics, setStatistics] = useState(false);
    const[editor, setEditor] = useState(false);
    const store = useStore();
    const dateHandler = () =>{
        setData(true);
        setStatistics(false);
        setEditor(false)
    }
    const statisticsHandler = ()=>{
        setData(false);
        setStatistics(true);
        setEditor(false);
    }

    const handleLogout = async () => {
        try {
            await store.logout();
        } catch (error) {
            console.log(error);
        }
    };

    const editorHandler = () =>{
        setData(false);
        setStatistics(false);
        setEditor(true);
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.mainPart}>
                    <div className={styles.menu}>
                        <div className={styles.menuHead}>
                            <p className={styles.headRole}>Администратор</p>
                            <img className={styles.headIcon} src={User} alt=""></img>
                            <p className={styles.headName}>Фамилия Имя Oтчество</p>
                        </div>
                        <div className={styles.menuButtons}>
                            <button onClick={dateHandler} className={styles.menuButton}>Мои данные</button>
                            <button onClick={statisticsHandler} className={styles.menuButton}>Статистика</button>
                            <button onClick={editorHandler} className={styles.menuButton}>Редактор автомобилей</button>
                            <button onClick={handleLogout} className={styles.menuButton}>Выход</button>
                        </div>
                    </div>
                    {data && <Data/>}
                    {statistics && <Statistics/>}
                    {editor && <Editor/>}
                </div>
            </div>
        </div>
    );
}

export default OfficeAdmin;