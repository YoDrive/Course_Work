import React, {FunctionComponent, useCallback, useEffect} from "react";
import styles from "./storyFeedbackPopUp.module.css"
import { BookingResponseModel } from "../../../../models/Booking/BookingResponseModel";
interface FeedbackPopupProps {
    handleClose: () => void;
    content: React.ReactNode;
    isOpen: boolean;
    booking: BookingResponseModel
  }
  
  const StoryFeedbackPopup: FunctionComponent<FeedbackPopupProps> = (props) => {
    const {isOpen, handleClose, content, booking} = props;
  
    return (   
        <div className={styles.popupBox} style={{ display: isOpen ? "block" : "none" }}>
          <div className={styles.box}>
            <div className={styles.popupClose}><span className={styles.popupCloseIcon} onClick={handleClose}>x</span></div>
            <p className={styles.popupTitle}>{!booking.feedback ? "Отзыв": "Редактор отзыва"}</p>
            {content}
          </div>
        </div>
 
    );
  };
  
  export default StoryFeedbackPopup;