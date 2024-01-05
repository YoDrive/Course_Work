import {useForm} from "react-hook-form";
import React, {useEffect, useState} from 'react';
import styles from './bookingPage.module.css';
import Header from '../header/header';
import FilterPanel from './filterPanel/filterPanel';
import {BookingPageModel, CarResponsePage, CarViewModel} from '../../models/Booking/CarBookingModel';
import galOpen from "../../assets/whgaloshkaClose.svg";
import galClose from "../../assets/whgalochkaOpen.svg"
import rows from "../../assets/rows.svg"
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'
import BookingService from "../../services/BookingService";
import CarCard from "./carCard/сarCard";
import Paginator from "./paginator/paginator";

const paginateData = (data: CarViewModel[], pageNumber: number, pageSize: number) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return data.slice(startIndex, endIndex);
};

export function BookingPage() {
    const [cars, setCars] = useState<CarResponsePage | undefined>();
    const [carsCount, setCarsCount] = useState<number>(0);
    const [selected, setSelected] = useState(galOpen);
    const [isExpanded, setExpanded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const toggleExpand = () => {
        setExpanded(!isExpanded);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    const [sortDirection, setSortDirection] = useState<'asc' | 'dsc'>('asc');
    const [sortField, setSortField] = useState<string>('');
    const fetchData = async () => {
        try {
            const bookingPageModel: BookingPageModel = {
                page: {
                    pageNumber: 1, 
                    pageSize: 999,  
                },
                filter: {
                    // Заполните поля фильтра в соответствии с вашей логикой
                },
                sort: {
                    dir: sortDirection,
                    field: sortField,
                },
            };
    
            const response = await BookingService.getCarsByPage(bookingPageModel);
            setCars({
                ...response.data,
            });
    
            setCarsCount(response.data.count);
            let totalPages = Math.ceil(response.data.count / 10);
            setTotalPages(totalPages);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };


    const handleSortChange = (newSortField: string) => {
    if (newSortField.toLowerCase() === sortField.toLowerCase()) {
      setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'dsc' : 'asc'));
    } else {
      setSortDirection('asc');
    }
  
    setSortField(newSortField);
    fetchData();
    };
    
    useEffect(() => {
        fetchData();
    }, [sortField, sortDirection]);
    
    const sortCars = () => {
        if (!cars?.items) return [];
    
        return cars.items.slice().sort((a, b) => {
            if (sortField === 'rating') {
                return sortDirection === 'asc' ? a.rating - b.rating : b.rating - a.rating;
            } else if (sortField === 'price') {
                return sortDirection === 'asc' ? a.costDay - b.costDay : b.costDay - a.costDay;
            }
            return 0;
        });
    };
    let listItems = paginateData(sortCars(), currentPage, 10).map((car) => (
        <li key={car.carId} className={styles.catalogItem}>
            <CarCard car={car} />
        </li>
    ));

    return (
        <div className={styles.bookingPageContainer}>
            <Header/>
            <h1 className={styles.title}>Бронирование автомобиля</h1>
            <div className={styles.catalogContainer}>
                <FilterPanel/>
                <div className={styles.subtitle}>
                    <div className={styles.subText}>
                        <p className={styles.subtitleText}>Автомобили </p>
                        <p className={styles.subtitleFind}>(найдено {carsCount}):</p>
                    </div>
                    <form className={styles.subSort} onClick={() => (isExpanded === false)&&(selected === galOpen) ? setSelected(galClose) : setSelected(galOpen)} >
                        <div className={styles.subSortBtn} onClick={() => toggleExpand()}>
                            <img className={styles.sortGal} src={selected}></img>
                            <p className={styles.sortText}>Сортировка</p>
                            <img className={styles.sortRows} src={rows}></img>
                        </div>
                        <div className={styles.dropDown} style={{ height: isExpanded ? "150px" : "0px" }}>
                            <label className={styles.dropMenu}>
                            <input
                                type="radio"
                                value="rating"
                                className={styles.dropBtn}
                                onClick={() => handleSortChange('rating')}
                                />
                                <p className={styles.btnText}>По рейтингу</p>
                            </label>
                            <label className={styles.dropMenu}>
                            <input
                                type="radio"
                                value="price"
                                className={styles.dropBtn}
                                onClick={() => handleSortChange('price')}
                                />
                                <p className={styles.btnText}>По цене</p>
                            </label>
                        </div>
                    </form>
                </div>
                <ul className={styles.catalog}>{listItems}</ul>
                <Paginator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export default BookingPage;