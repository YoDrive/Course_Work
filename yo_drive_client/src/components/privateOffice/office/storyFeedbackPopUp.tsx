import React, {FunctionComponent, useCallback, useEffect} from "react";
import styles from "../office/storyFeedbackPopUp.module.css"
import { BookingResponseModel } from "../../../models/Booking/BookingResponseModel";
interface FeedbackPopupProps {
    handleClose: () => void;
    content: React.ReactNode;
    isOpen: boolean;
    booking: BookingResponseModel
  }
  
  const StoryFeedbackPopup: FunctionComponent<FeedbackPopupProps> = (props) => {
    const {isOpen, handleClose, content, booking} = props;
    const handleKeyPress = useCallback((event: any) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    }, [handleClose]);
    useEffect(() => {
      document.addEventListener('keydown', handleKeyPress);
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }, [handleKeyPress]);
  
    return (   
        <div className={styles.popupBox} style={{ display: isOpen ? "block" : "none" }}>
          <div className={styles.box}>
            <div className={styles.popupClose}><span className={styles.popupCloseIcon} onClick={handleClose}>x</span></div>
            <p className={styles.popupTitle}>Отзыв</p>
            {content}
          </div>
        </div>
 
    );
  };
  
  export default StoryFeedbackPopup;