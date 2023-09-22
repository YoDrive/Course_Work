import React from 'react';
import styles from "./lkClient.module.css"
import Office from './office/office'

export function LKClient() {

    return (
        <div className={styles.lkClientContainer}>
            <Office/>
        </div>
    );
}

export default LKClient;