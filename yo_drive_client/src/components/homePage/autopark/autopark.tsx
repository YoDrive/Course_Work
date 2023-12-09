import React, {useEffect, useState} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {EffectCoverflow, Navigation} from 'swiper/modules';
import {CarSwiperModel} from '../../../models/Swiper/CarSwiperModel';
import styles from './autopark.module.css';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import BookingService from "../../../services/BookingService";

export function Autopark() {
    const [cars, setCars] = useState<CarSwiperModel[]>([]);

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await BookingService.getAutopark();
                setCars(response.data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        }

        fetchCars();
    }, []);

    return (
        <div className={styles.autoparkContainer}>
            <h2 className={styles.tytle}>Наш автопарк</h2>
            <div className={styles.swiperContainer}>
                <Swiper 
                modules={[EffectCoverflow, Navigation]}
                effect={'coverflow'}
                centeredSlides={true}
                loop={true}
                slidesPerView={2}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 40,
                    depth: 50,
                    modifier: 4.5,
                    scale: 1,
                    slideShadows: false 
                }}
                navigation = {true}>
                {cars.map((car) => (
                    <SwiperSlide key={car.carId}>
                        <img
                            src={`data:image/png;base64,${car.image}`}
                            alt={`${car.name}`}
                            className={styles.img}
                        />
                        <p className={styles.carName}>{car.name}</p>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </div>
    );
}

export default Autopark;