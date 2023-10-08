import React, {useState} from 'react';
import styles from './officeAdmin.module.css';
import User from '../../../assets/user.svg'
import { Statics } from './statics';
import { Data } from './data'
import { Editor } from './editor'


export function OfficeAdmin() {
    const[data, setData] = useState(true);
    const[statics, setStatics] = useState(false);
    const[editor, setEditor] = useState(false);
    const dateHandler = () =>{
        setData(true);
        setStatics(false);
        setEditor(false)
    }
    const staticsHandler = ()=>{
        setData(false);
        setStatics(true);
        setEditor(false);
    }
    const editorHandler = () =>{
        setData(false);
        setStatics(false);
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
                            <button onClick={staticsHandler}className={styles.menuButton}>Статистика</button>
                            <button onClick={editorHandler} className={styles.menuButton}>Редактор автомобилей</button>
                            <button  className={styles.menuButton}>Выход</button>
                        </div>
                    </div>
                    {data && <Data/>}
                    {statics && <Statics/>}
                    {editor && <Editor/>}
            </div>
        </div>
        </div>
    );
}

export default OfficeAdmin;