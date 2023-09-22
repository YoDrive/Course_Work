import React from 'react';
import styles from "./privateOffice.module.css"
import Footer from '../footer/footer';
import Header from '../header/header'
import Office from '../privateOffice/office/office'

export function PrivateOffice() {

    return (
        <div className={styles.privateOfficeContainer}>
            <Header/>
            <Office/>
            <Footer/>
        </div>
    );
}

export default PrivateOffice;