import React from 'react';
import styles from "./lkClient.module.css"
import Office from './office/office'
import Header from '../header/header';

export function LKClient() {

    return (
        <div className={styles.lkClientContainer}>
            <Header/>
            <Office/>
        </div>
    );
}

export default LKClient;