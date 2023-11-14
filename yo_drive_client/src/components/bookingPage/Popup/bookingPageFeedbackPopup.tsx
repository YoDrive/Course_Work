import React, {FunctionComponent} from "react";
import styles from "./bookingPageFeedbackPopup.module.css"

interface PopupProps {
  handleClose: () => void;
  content: React.ReactNode;
  isOpen: boolean;
}

const FeedbackPopup: FunctionComponent<PopupProps> = (props) => {
  const {isOpen, handleClose, content} = props;

  return (
    <div className={styles.popupBox} style={{ display: isOpen ? "block" : "none" }}>
      <div className={styles.box}>
        <div className={styles.popupClose}><span className={styles.popupCloseIcon} onClick={handleClose}>x</span></div>
        <p className={styles.popupTitle}>Отзывы</p>
        {content}
      </div>
    </div>
  );
};

export default FeedbackPopup;
