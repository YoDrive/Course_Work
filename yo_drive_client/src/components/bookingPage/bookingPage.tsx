import {useState} from 'react';
import {useForm} from "react-hook-form";
import styles from "./bookingPage.module.css"
import Header from '../header/header';
import FilterPanel from './filterPanel/filterPanel';
import { CarBookingModel } from '../../models/Booking/CarBookingModel';
import carr from '../../assets/car1.png'
import galOpen from "../../assets/whgaloshkaClose.svg";
import galClose from "../../assets/whgalochkaOpen.svg"
import rows from "../../assets/rows.svg"


let cars: CarBookingModel[] =
[
    {
        id: 1,
        img: carr,
        name: 'Mercedes-Benz G63 AMG',
        stars: 4.0,
        year: 2020,
        gearbox: 'Автоматическая',
        class: 'внедорожник',
        price: '11500'
    },
    {
        id: 2,
        img: carr,
        name: 'dkjkf',
        stars: 4.0,
        year: 2000,
        gearbox: 'string',
        class: 'string',
        price: 'string'
    }

]

let listItems = cars.map((car) => 
    <li key={car.id} className={styles.catalogItem}>
        <img src={car.img} width={'452px'} height={'194px'}/>
        <div className={styles.itemConteiner}>
            <div className={styles.catalogItemInfo}>
                <p className={styles.carName}>{car.name}</p>
                <p className={styles.carStars}>{car.stars}</p>
                <p className={styles.carYear}>{car.year} год выпуска</p>
                <p className={styles.carBox}>{car.gearbox} коробка передач</p>
                <p className={styles.carClass}>Тип кузова: {car.class}</p>
            </div>
            <div className={styles.itemConteinerPrice}>
                <p className={styles.carPrice}>{car.price}₽/сутки</p>
                <button className={styles.carButton}>Забронировать</button>
            </div>
        </div>
    </li>
);

export function BookingPage() {
    const [selected, setSelected] = useState(galOpen)
    const {
        register,
        handleSubmit,
    } = useForm({
        mode: "onBlur"
    });

    const [isExpanded, setExpanded] = useState(false);
 
    const toggleExpand = () => {
        setExpanded(!isExpanded);
    };

    const onSubmit=(data:any) =>{
        console.log(data);
        toggleExpand();
    }
    return (
        <div className={styles.bookingPageContainer}>
            <Header/>
            <h1 className={styles.title}>Бронирование автомобиля</h1>
            <div className={styles.catalogContainer}>
                <FilterPanel/>
                <div className={styles.subtitle}>
                    <div className={styles.subText}>
                        <p className={styles.subtitleText}>Автомобили </p>
                        <p className={styles.subtitleFind}>(найдено {listItems.length}):</p>
                    </div>
                    <form className={styles.subSort} onClick={() => (isExpanded === false)&&(selected === galOpen) ? setSelected(galClose) : setSelected(galOpen)}  onChange={handleSubmit(onSubmit)} >
                        <div className={styles.subSortBtn} onClick={() => toggleExpand()}>
                            <img className={styles.sortGal} src={selected}></img>
                            <p className={styles.sortText}>Сортировка</p>
                            <img className={styles.sortRows} src={rows}></img>
                        </div>
                        <div className={styles.dropDown} style={{ height: isExpanded ? "100%" : "0px" }}>
                            <label className={styles.dropMenu}>
                                <input type="radio" value="По рейтингу" className={styles.dropBtn} 
                                {...register("sortType")}
                                    />
                                <p className={styles.btnText}>По рейтингу</p>
                            </label>
                            <label className={styles.dropMenu}>
                                <input type="radio" value="По цене" className={styles.dropBtn} 
                                {...register("sortType")}
                                    />
                                <p className={styles.btnText}>По цене</p>
                            </label>
                        </div>
                    </form>
                </div>
                <ul className={styles.catalog}>{listItems}</ul>
            </div>
        </div>
    );
}

export default BookingPage;