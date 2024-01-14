import styles from './clientOffice/office.module.css';
import vector from '../../../assets/Vector2.svg'
import vector1 from "../../../assets/Vector21.svg"
import { useState} from 'react';
import Preview  from './preview/preview'
import { Add } from './addCar/add'
import FilterPopUp from './filterPopUp/filterPopUp';
import { Filter } from '../../../models/Booking/FilterBookingModel';
export function Editor(){
    const[pUpFilter, setPUpFilter] = useState(false);
    const pUpFilterHandler = () =>{
        setPUpFilter(!pUpFilter)
    }
    const[filter, setFilter] = useState(true);
    const[preview, setpreview] = useState(true);
    const[add, setAdd] = useState(false);
    const previewHandler = () =>{
        setpreview(true);
        setAdd(false);
        setFilter(true);
    }
    const addHandler = () =>{
        setAdd(true);
        setpreview(false);
    }
    const filterHandler = () =>{
        setFilter(false);
    }
    const addFunc = () =>{
        addHandler();
        filterHandler();
        setPUpFilter(false);
    }
    const [filters, setFilters] = useState<Filter>({});
    const handleFiltersChange = (newFilters: Filter) => {
        setFilters(newFilters);
    };
    return(
        <div className={styles.info}>
            <div className={styles.headerBlock}>
                <h1 className={styles.infoHeader}>Редактор автомобилей</h1>
                <div className={styles.headerButtons}>
                    <button onClick={previewHandler} className={preview ? styles.buttonPreviewActive: styles.buttonPreviewNotActive}>Просмотреть список авто</button>
                    {filter &&<div className={styles.filter} onClick={pUpFilterHandler}>
                        <img className={styles.filterImg} src={pUpFilter ? vector1 : vector}></img>
                        <button className={styles.filterButton}>Фильтр</button>
                    </div>}
                    <button onClick={addFunc} className={add ? styles.buttonAddActive : styles.buttonAddNotActive}>Добавить авто</button>
                </div>
            </div>
            {pUpFilter && <FilterPopUp onFiltersChange={handleFiltersChange}/>}
            {preview && <Preview filters={filters}/>}
            {add && <Add/>}
        </div>
    )
}