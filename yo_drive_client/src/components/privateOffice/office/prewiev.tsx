import styles from './prewiev.module.css'
import car from '../../../assets/carPhoto.png'
import rewiev from '../../../assets/rewiev.svg'
import stars from '../../../assets/stars.svg'
import trash from '../../../assets/trash.svg'
export function Prewiev(){
    return(
        <div className={styles.prewievBlock}>
            <div className={styles.carBlocks}>
                <div className={styles.carBlock}>
                    <img className={styles.carImg} src={car}></img>
                    <div className={styles.carInfo}>
                        <div className={styles.infoHeader}>
                            <p className={styles.headerText}>Mercedes-Benz G63 AMG</p>
                        </div>
                        <div className={styles.infoText}>
                            <div className={styles.infoRewiev}>
                                <img className={styles.rewievStars} src={stars}></img>
                                <p className={styles.rewievScore}>5.0</p>
                                <p className={styles.rewievQuantity}>5 отзывов</p>
                            </div>
                            <p className={styles.infoYear}>2020 года выпуска</p>
                            <p className={styles.infoGearbox}>Автоматическая коробка передач</p>
                            <p className={styles.infoType}>Тип кузова: внедорожник</p>
                            <p className={styles.infoPrice}>11500₽/сутки</p>
                        </div>
                    </div>
                    <div className={styles.carTools}>
                        <img className={styles.toolEdit} src={rewiev}></img>
                        <img className={styles.toolDelete} src={trash}></img>
                    </div>
                </div>
            </div>
            
        </div>
    )
}