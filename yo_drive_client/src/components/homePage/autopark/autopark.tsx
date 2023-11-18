import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {EffectCoverflow, Navigation} from 'swiper/modules';
import { CarBookingModel } from '../../../models/Swiper/CarSwiperModel';

import styles from './autopark.module.css';
import car from '../../../assets/car1.png';
import car2 from '../../../assets/car2.png';
import priora from '../../../assets/priora.png';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

let cars: CarBookingModel[] =
[
    {
        id: 1,
        img: car,
        name: 'Mercedes-Benz G63 AMG'
    },
    {
        id: 2,
        img: priora,
        name: 'Lada Priora'
    },
    {
        id: 3,
        img: car,
        name: 'KDLLK KLDA'
    },
    {
        id: 4,
        img: car2,
        name: 'KLSKdkd LKDSKLlL'
    }
]

export function Autopark() {

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
                    <SwiperSlide key={car.id}>
                        <img src={car.img} className={styles.img} alt="slide_image" />
                        <p className={styles.carName}>{car.name}</p>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </div>
    );
}

export default Autopark;