import React, {FunctionComponent} from "react";
import styles from "./bookingPageFeedbackPopup.module.css"
import { Rating, ThinRoundedStar} from '@smastrom/react-rating'

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
        {/* <div>
        <Rating style={{ maxWidth: 100 }} readOnly value={5} itemStyles={{itemShapes: ThinRoundedStar, activeFillColor: '#CCB746', inactiveFillColor: '#D9D9D9', itemStrokeWidth: 1, inactiveStrokeColor:'#CCB746', activeStrokeColor: '#CCB746'}}/>
        </div> */}
        {content}
      </div>
    </div>
  );
};

export default FeedbackPopup;
