import React, {FunctionComponent, useEffect, useState} from "react";
import styles from "./bookingPagePopup.module.css"
import { CarViewModel } from '../../../models/Booking/CarBookingModel';
import axios from "axios"; 
import { DateRange } from 'react-date-range';
import {BookingAdd} from "../../../models/Booking/BookingAddModel";
import BookingService from "../../../services/BookingService";


interface PopupProps {
  handleClose: () => void;
  content: React.ReactNode;
  car: CarViewModel;
  isOpen: boolean;
  selectedDate: { startDate: Date; endDate: Date; key: string; }[]; 
  rentCost: number;
}

const Popup: FunctionComponent<PopupProps> = (props) => {
  const { car, isOpen, handleClose, content, selectedDate, rentCost } = props;

  const handleBooking = async () => {
    const bookingData : BookingAdd = {
      userId: 1,
      carId: car.carId,
      startDate: selectedDate[0].startDate,
      endDate: selectedDate[0].endDate,
      rentCost: rentCost
    };

    try {
      console.log(bookingData)
      const response = await BookingService.booking(bookingData);

      if (response.status === 201) {
        alert('Бронирование успешно отправлено.');
      }
    } catch (error) {
      alert('Ошибка при бронировании.');
    }

    handleClose();
  };

  return (
    <div className={styles.popupBox} style={{ display: isOpen ? "block" : "none" }}>
      <div className={styles.box}>
        <div className={styles.popupClose}><span className={styles.popupCloseIcon} onClick={handleClose}>x</span></div>
        <p className={styles.popupTitle}>Бронирование автомобиля</p>
        {content}
        <button className={styles.popupButton} onClick={handleBooking}>Забронировать</button>
      </div>
    </div>
  );
};

export default Popup;
