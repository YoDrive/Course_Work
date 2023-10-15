import styles from './story.module.css'
import star from '../../../assets/star.svg'
import rewiev from '../../../assets/rewiev.svg'

 export function StoryBlock(){
    return(
        <li className={styles.storyBlock}>
            <p className={styles.blockText_first}>Mercedes-Benz G63 AMG</p>
            <p className={styles.blockText_second}>11500₽/сутки</p>
            <p className={styles.blockText_third}>23 000 ₽</p>
            <p className={styles.blockText_fourth}>13 окт. 2023 - 31 окт.2023</p>
            <p className={styles.blockText_rewiev }>
                <img className={styles.rewiev_star} src={star}></img>
                <p className={styles.rewiev_digit}>5.0</p>
                <img className={styles.rewiev_icon} src={rewiev}></img>
            </p>
        </li>
    )
 }