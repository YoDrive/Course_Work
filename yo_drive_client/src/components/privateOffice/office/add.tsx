import styles from "./add.module.css"
import space from "../../../assets/space.svg"
export function Add(){
    return(
        <div className={styles.addBlock}>
            <div className={styles.blockImg}>
                <div className={styles.imgSpace}>
                    <img className={styles.spaceIcon} src={space}></img>
                </div>
                <button className={styles.imgButton}>Загрузить изображение</button>
            </div>
            <div className={styles.blockInfo}>
                <div className={styles.infoItem}>
                    <label className={styles.itemName}>Марка:</label>
                    <input type="text" list="carBrand" className={styles.itemInput}></input>
                    <datalist className={styles.inputList} id="carBrand">
                        <option className={styles.listItem} value="Mercedes-Benz">Mercedes-Benz</option>
                        <option className={styles.listItem} value="BMW">BMW</option>
                    </datalist>
                </div>
                <div className={styles.infoItem}>
                    <label className={styles.itemName}>Модель:</label>
                    <input type="text" list="carModel" className={styles.itemInput}></input>
                    <datalist className={styles.inputList} id="carModel">
                        <option className={styles.listItem} value="G63 AMG">G63 AMG</option>
                    </datalist>
                </div>
                <div className={styles.infoItem}>
                    <label className={styles.itemName}>Год выпуска:</label>
                    <input type="text" list="carYear" className={styles.itemInput}></input>
                    <datalist className={styles.inputList} id="carYear">
                        <option className={styles.listItem} value="2020">2020</option>
                    </datalist>
                </div>
                <div className={styles.infoItem}>
                    <label className={styles.itemName}>Тип КПП:</label>
                    <input type="text" list="carGear" className={styles.itemInput}></input>
                    <datalist className={styles.inputList} id="carGear">
                        <option className={styles.listItem} value="АКПП">АКПП</option>
                        <option className={styles.listItem} value="МКПП">МКПП</option>
                    </datalist>
                </div>
                <div className={styles.infoItem}>
                    <label className={styles.itemName}>Тип кузова:</label>
                    <input type="text" list="carType" className={styles.itemInput}></input>
                    <datalist className={styles.inputList} id="carType">
                        <option className={styles.listItem} value="внедорожник">Внедорожник</option>
                    </datalist>
                </div>
                <div className={styles.infoItem}>
                <label className={styles.itemName}>Цена аренды в сутки:</label>
                    <input type="text" list="carPrice" className={styles.itemInput}></input>
                </div>
                <div className={styles.infoButtons}>
                    <button className={styles.buttonCancel}>Отмена</button>
                    <button className={styles.buttonSave}>Сохранить</button>
                </div>
            </div>
        </div>
    )
}