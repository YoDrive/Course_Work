import React, {FunctionComponent} from "react";
import styles from "../office/storyFeedbackPopUp.module.css"
interface PopupProps {
    handleClose: () => void;
    content: React.ReactNode;
    isOpen: boolean;
  }
  
  const storyFeedbackPopup: FunctionComponent<PopupProps> = (props) => {
    const {isOpen, handleClose, content} = props;
   
  
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
  
  export default storyFeedbackPopup;