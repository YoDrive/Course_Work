import React from 'react';
import styles from "./lkClient.module.css"
import OfficeAdmin from './office/officeAdmin'
import Header from '../header/header';

export function LKAdmin() {

    return (
        <div className={styles.lkClientContainer}>
            <Header/>
            <OfficeAdmin/>
        </div>
    );
}

export default LKAdmin;