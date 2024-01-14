import React, {useEffect, useState} from 'react';
import styles from './officeAdmin.module.css';
import User from '../../../assets/user.svg'
import { Statistics } from './dashboard/statistics';
import { Data } from './data'
import { Editor } from './editor'
import {useStore} from "../../../index";
import {UserModel} from "../../../models/User/UserModel";
import LkService from "../../../services/lkService";
import {useNavigate} from "react-router-dom";


export function OfficeAdmin() {
    const [data, setData] = useState(true);
    const [statistics, setStatistics] = useState(false);
    const [editor, setEditor] = useState(false);
    const [user, setUser] = useState<UserModel>();
    const [loading, setLoading] = useState(true);
    const store = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUserData() {
            try {
                const userData = await LkService.GetUserData(store.user.Id);
                setUser(userData.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                handleNavigation('/homePage');
            }
        }

        fetchUserData();
    }, []);

    const handleNavigation = (path: string) => {
        navigate(path);
    };

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

    if (loading) {
        return <p></p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.mainPart}>
                    <div className={styles.menu}>
                        <div className={styles.menuHead}>
                            <p className={styles.headRole}>Администратор</p>
                            {user && user.image ? <img className={styles.headIconUser} src={`data:image;base64,${user.image}`} alt=""></img>
                            : <img className={styles.headIcon} src={User} alt=""></img>}
                            <p className={styles.headName}>
                                {user ? `${user.surname} ${user.firstName} ${user.patronymic}` : 'Загрузка...'}
                            </p>
                        </div>
                        <div className={styles.menuButtons}>
                            <button onClick={dateHandler} className={styles.menuButton}>Мои данные</button>
                            <button onClick={statisticsHandler} className={styles.menuButton}>Статистика</button>
                            <button onClick={editorHandler} className={styles.menuButton}>Редактор автомобилей</button>
                            <button onClick={handleLogout} className={styles.menuButton}>Выход</button>
                        </div>
                    </div>
                    {data && <Data user={user!}/>}
                    {statistics && <Statistics/>}
                    {editor && <Editor/>}
                </div>
            </div>
        </div>
    );
}

export default OfficeAdmin;