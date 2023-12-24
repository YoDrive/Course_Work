import React, {FunctionComponent} from "react";
import styles from "../office/editCarPopUp.module.css"
import { CarAdd } from "../../../models/Add/Add.model";
import { CarViewModel } from "../../../models/Booking/CarBookingModel";


interface PopupProps {
  handleClose: () => void;
  content: React.ReactNode;
  isOpen: boolean;
  car: CarViewModel;
}

const EditCarPopup: FunctionComponent<PopupProps> = (props) => {
  const {isOpen, handleClose, content} = props;

  return (
    <div className={styles.popupBox} style={{ display: isOpen ? "block" : "none" }}>
      <div className={styles.box}>
        <div className={styles.popupClose}><span className={styles.popupCloseIcon} onClick={handleClose}>x</span></div>
        <p className={styles.popupTitle}>Редактор автомобиля</p>
        {content}
      </div>
    </div>
  );
};

export default EditCarPopup;