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
import {Filter} from '../../../src/models/Booking/FilterBookingModel';
import Paginator from "./paginator/paginator";

const BookingPage: React.FC = () => {
    const [cars, setCars] = useState<CarResponsePage | undefined>();
    const [carsCount, setCarsCount] = useState(0);
    const [selected, setSelected] = useState(galOpen);
    const [isExpanded, setExpanded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [sortField, setSortField] = useState<string>('');
    const [filters, setFilters] = useState<Filter>({});

    const handleFiltersChange = (newFilters: Filter) => {
        setCurrentPage(1);
        setFilters(newFilters);
    };

    const toggleExpand = () => {
        setExpanded(!isExpanded);
    };

    const fetchData = async () => {
        try {
            const bookingPageModel: BookingPageModel = {
                page: {
                    pageNumber: currentPage,
                    pageSize: 10,
                },
                filter: {
                    ...filters,
                },
                sort: {
                    dir: sortDirection,
                    field: sortField,
                },
            };

            const response = await BookingService.getCarsByPage(bookingPageModel);

            if (response && response.data) {
                setCars({
                    ...response.data
                });

                setCarsCount(response.data.count);
                let totalPages = response.data.count / 10 == 0 ? response.data.count / 10 : (response.data.count / 10) + 1;
                setTotalPages(totalPages);
            } else {
                console.error('Response or response.data is undefined:', response);
            }
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [currentPage, sortField, sortDirection, filters]);

    const handleSortChange = (newSortField: string) => {
        if (newSortField.toLowerCase() === sortField.toLowerCase()) {
            setSortDirection((prevDirection) => (prevDirection === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortDirection('asc');
        }

        setSortField(newSortField);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };
    let listItems = cars?.items.map((car) => (
        <li key={car.carId} className={styles.catalogItem}>
            <CarCard car={car}/>
        </li>
    ));

    return (
        <div className={styles.bookingPageContainer}>
            <Header/>
            <h1 className={styles.title}>Бронирование автомобиля</h1>
            <div className={styles.catalogContainer}>
                <FilterPanel onFiltersChange={handleFiltersChange}/>
                <div className={styles.subtitle}>
                    <div className={styles.subText}>
                        <p className={styles.subtitleText}>Автомобили </p>
                        <p className={styles.subtitleFind}>(найдено {carsCount}):</p>
                    </div>
                    <form className={styles.subSort}
                          onClick={() => (isExpanded === false) && (selected === galOpen) ? setSelected(galClose) : setSelected(galOpen)}>
                        <div className={styles.subSortBtn} onClick={() => toggleExpand()}>
                            <img className={styles.sortGal} src={selected}></img>
                            <p className={styles.sortText}>Сортировка</p>
                            <img className={styles.sortRows} src={rows}></img>
                        </div>
                        <div className={styles.dropDown} style={{height: isExpanded ? "150px" : "0px"}}>
                            <label className={styles.dropMenu}>
                                <input
                                    type="radio"
                                    value="rating"
                                    className={styles.dropBtn}
                                    onClick={() => handleSortChange('Rating')}
                                />
                                <p className={styles.btnText}>По рейтингу</p>
                            </label>
                            <label className={styles.dropMenu}>
                                <input
                                    type="radio"
                                    value="price"
                                    className={styles.dropBtn}
                                    onClick={() => handleSortChange('CostDay')}
                                />
                                <p className={styles.btnText}>По цене</p>
                            </label>
                        </div>
                    </form>
                </div>
                {listItems?.length ?
                    <ul className={styles.catalog}>{listItems}</ul> :
                    <div><p className={styles.listItemsEmpty}>...Oops ничего не найдено по запросу</p></div>}
                {carsCount > 0 && (
                    <Paginator currentPage={currentPage} totalPages={totalPages || 1} onPageChange={handlePageChange}/>
                )}
            </div>
        </div>
    );
}

export default BookingPage;