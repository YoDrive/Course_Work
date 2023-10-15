import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import styles from './header.module.css';
import logo from '../../assets/logo.svg';
import phoneIcon from '../../assets/phoneIcon.svg';
import authorizationIcon from '../../assets/authorizationIcon.svg';
import menuIcon from '../../assets/menuIcon.svg';
import menuExit from '../../assets/menuExit.svg'

export function Header() {
    const[menu2, setMenu2]= useState(true);
    const[menu1, setMenu1]= useState(false);
    const menu2Handler=() =>{
        setMenu2(false);
        setMenu1(true)
    }
    const menu1Handler=() =>{
        setMenu1(false);
        setMenu2(true)
    }
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };
    
    return (
        <div className={styles.header}>
            <ul className={styles.headerMenuList}>
                <li className={styles.headerList} onClick={() => handleNavigation('/homePage')}>
                    <img className={styles.headerLogo} src={logo} alt=""/>
                </li>
                <li className={styles.headerList}>
                    <img className={styles.headerListIcon} src={phoneIcon} alt=""/>
                    <p className={styles.headerListText}>8(800)535-35-35</p>
                </li>
                {/*TODO: добавить логику, если авторизован, то переход не на страницу авторизации, а на профиль*/}
                <li className={styles.headerList} onClick={() => handleNavigation('/auth')}>
                    <img className={styles.headerListIcon} src={authorizationIcon} alt=""/>
                    <p className={styles.headerListText}>Авторизация</p>
                </li>
                {menu1 &&<li className={styles.headerList} onClick={menu1Handler}>
                    <div className={styles.headerMenu}>
                        <div className={styles.menuItem}>
                            <img className={styles.headerListIcon_Exit} src={menuExit} alt=""/>
                            <p className={styles.headerListText}>Меню</p>
                        </div>
                        <p className={styles.menuItem} onClick={() => handleNavigation('/HomePage')}>Главная</p>
                        <p className={styles.menuItem} onClick={() => handleNavigation('/lkClient')}>Личный кабинет</p>
                        <p className={styles.menuItem}>Бронирование авто</p>
                        </div>
                    </li>
                }
                {menu2 && <li className={styles.headerList} onClick={menu2Handler}>
                        <img className={styles.headerListIcon} src={menuIcon} alt=""/>
                        <p className={styles.headerListText}>Меню</p>
                     </li>}
            </ul>
        </div>
    )
}

export default Header;