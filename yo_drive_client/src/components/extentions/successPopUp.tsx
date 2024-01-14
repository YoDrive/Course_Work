import React from 'react';
import styles from './successPopUp.module.css';

interface Props {
    onConfirm: () => void;
    text: string;
    isVisible: boolean;
    onClose: () => void;
}

export function SuccessPopUp(props: Props) {

    const handleConfirm = () => {
        props.onConfirm();
        props.onClose();
    };

    const handleCancel = () => {
        props.onClose();
    };

    return (
        <div className={`${styles.container} ${props.isVisible ? styles.visible : styles.hidden}`}>
            <div className={styles.popupContent}>
                <p>{props.text}</p>
                <div className={styles.buttons}>
                    <button onClick={handleCancel} className={styles.btn}>Нет</button>
                    <button onClick={handleConfirm} className={styles.btn}>Да</button>
                </div>
            </div>
        </div>
    );
};

export default SuccessPopUp;