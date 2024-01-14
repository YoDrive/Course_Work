import React, {useEffect, useState} from 'react';
import styles from './office.module.css';
import User from '../../../../assets/user.svg';
import { Story } from '../rentStory/story';
import {useNavigate} from "react-router-dom";
import {useStore} from "../../../../index";
import {UserModel} from "../../../../models/User/UserModel";
import LkService from "../../../../services/lkService";
import SuccessPopUp from "../../../extentions/successPopUp";
import {Data} from "../data";

export function Office() {
    const navigate = useNavigate();
    const [data, setData] = useState(true);
    const [story, setStory] = useState(false);
    const [user, setUser] = useState<UserModel>();
    const [loading, setLoading] = useState(true);
    const [isSuccessPopUpVisible, setSuccessPopUpVisible] = useState(false);
    const store = useStore();

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

    const dataHandler = () =>{
        setData(true);
        setStory(false);
    }
    const storyHandler= ()=>{
        setData(false);
        setStory(true);
    }

    const handleLogout = async () => {
        try {
            setSuccessPopUpVisible(false);
            await store.logout();
        } catch (error) {
            console.log(error);
        }
    };

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    if (loading) {
        return <p></p>;
    }


    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.mainPart}>
                    <div className={styles.menu}>
                        <div className={styles.menuHead}>
                            {user && user.image ? <img className={styles.headIconUser} src={`data:image;base64,${user.image}`} alt=""></img>
                            : <img className={styles.headIcon} src={User} alt=""></img>}
                            <p className={styles.headName}>
                                {user ? `${user.surname} ${user.firstName} ${user.patronymic}` : 'Загрузка...'}
                            </p>
                        </div>
                        <div className={styles.menuButtons}>
                            <button onClick={dataHandler} className={styles.menuButton}>Мои данные</button>
                            <button onClick={storyHandler} className={styles.menuButton}>История бронирований</button>
                            <button onClick={() => handleNavigation('/bookingPage')} className={styles.menuButton}>
                                Забронировать автомобиль
                            </button>
                            <button onClick={() => setSuccessPopUpVisible(true)} className={styles.menuButton}>Выход</button>
                            <SuccessPopUp
                                onConfirm={handleLogout}
                                text="Вы уверены, что хотите выйти?"
                                isVisible={isSuccessPopUpVisible}
                                onClose={() => setSuccessPopUpVisible(false)}
                            />
                        </div>
                    </div>
                    {data && <Data user = {user!} logout={handleLogout}/>}
                    {story && <Story/>}
                </div>
            </div>
        </div>
    );
}

export default Office;