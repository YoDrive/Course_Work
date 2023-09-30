import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from './header.module.css';
import logo from '../../assets/logo.svg';
import phoneIcon from '../../assets/phoneIcon.svg';
import authorizationIcon from '../../assets/authorizationIcon.svg';
import menuIcon from '../../assets/menuIcon.svg';

export function Header() {
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
                <li className={styles.headerList}>
                    {/*TODO: Компонент бургер меню*/}
                    <img className={styles.headerListIcon} src={menuIcon} alt=""/>
                    <p className={styles.headerListText}>Меню</p>
                </li>
            </ul>
        </div>
    )
}

export default Header;