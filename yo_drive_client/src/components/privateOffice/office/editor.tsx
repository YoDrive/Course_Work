import styles from './office.module.css';
import vector from '../../../assets/Vector2.svg'
import { useState} from 'react';
import { Prewiev } from './prewiev'
import { Add } from './add'

export function Editor(){
    const[filter, setFilter]=useState(true);
    const[prewiev, setPrewiev] = useState(true);
    const[add, setAdd] = useState(false);
    const prewievHandler = () =>{
        setPrewiev(true);
        setAdd(false);
        setFilter(true);
    }
    const addHandler = () =>{
        setAdd(true);
        setPrewiev(false);
    }
    const filterHandler = () =>{
        setFilter(false);
    }
    const addFunc = () =>{
        addHandler();
        filterHandler();
    }
    return(
        <div className={styles.info}>
            <div className={styles.headerBlock}>
                <h1 className={styles.infoHeader}>Редактор автомобилей</h1>
                <div className={styles.headerButtons}>
                    <button onClick={prewievHandler} className={styles.buttonPrewiev}>Просмотреть список авто</button>
                    {filter &&<div className={styles.filter}>
                        <img className={styles.filterImg} src={vector}></img>
                        <button className={styles.filterButton}>Фильтр</button>
                    </div>}
                    <button onClick={addFunc} className={styles.buttonAdd}>Добавить авто</button>
                </div>
            </div>
            {prewiev && <Prewiev/>}
            {add && <Add/>}
        </div>
    )
}