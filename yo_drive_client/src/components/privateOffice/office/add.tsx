import {useRef, useState} from 'react';
import styles from "./add.module.css"
import space from "../../../assets/space.svg"
import { useForm} from "react-hook-form"

export function Add(){
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState()

    const handleImageClick = () =>{
        inputRef.current?.focus();
    }
    const handleImageChange = (event:any) =>{
        const file = event.target.files[0];
        setImage(file);
    }
    const {
        register,
        handleSubmit,
        reset
    } = useForm({
    });

    const onSubmit = (data: any) =>{
        console.log(data);
    }
    return(
        <div className={styles.addBlock}>
            <form className={styles.addForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.blockImg} onClick={handleImageClick}>
                    <div className={styles.imgSpace}>
                        {image ? <img src={URL.createObjectURL(image)} style={{width: "100%", height:"100%", objectFit:"contain"}} />:<img className={styles.spaceIcon} src={space}></img>}
                    </div>
                    <input type="file" accept=".jpg,.jpeg,.png" id="Image" className={styles.inputImg} 
                           {
                               ...register("carImage")
                           } ref={inputRef} onChange={handleImageChange} />
                    <label htmlFor="Image" className={styles.imgItem}>Загрузить изображение</label>
                </div>
                <div className={styles.blockInfo}>
                    <div className={styles.infoItem}>
                        <label className={styles.itemName}>Марка:</label>
                        <input type="text" list="carBrand" className={styles.itemInput} autoComplete="off" {
                            ...register("carBrand")
                        }
                        />
                        <datalist className={styles.inputList} id="carBrand">
                            <option className={styles.listItem} value="Mercedes-Benz">Mercedes-Benz</option>
                            <option className={styles.listItem} value="BMW">BMW</option>
                        </datalist>
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.itemName}>Марка:</label>
                        <input type="text" list="carModel" className={styles.itemInput} autoComplete="off" {
                            ...register("carModel")
                        }
                        />
                        <datalist className={styles.inputList} id="carModel">
                            <option className={styles.listItem} value="G63 AMG">G63 AMG</option>
                            <option className={styles.listItem} value="X5">X5</option>
                        </datalist>
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.itemName}>Год выпуска:</label>
                        <input type="text" list="carYear" className={styles.itemInput} autoComplete="off" {
                            ...register("carYear")
                        }
                        />
                        <datalist className={styles.inputList} id="carYear">
                            <option className={styles.listItem} value="2020">2020</option>
                            <option className={styles.listItem} value="2023">2023</option>
                        </datalist>
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.itemName}>Тип КПП:</label>
                        <input type="text" list="carGear" className={styles.itemInput} autoComplete="off"{
                            ...register("carGear")
                        }
                        />
                        <datalist className={styles.inputList} id="carGear">
                            <option className={styles.listItem} value="АКПП">АКПП</option>
                            <option className={styles.listItem} value="МКПП">МКПП</option>
                        </datalist>
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.itemName}>Тип кузова:</label>
                        <input type="text" list="carClass" className={styles.itemInput} autoComplete="off"{
                            ...register("carClass")
                        }
                        />
                        <datalist className={styles.inputList} id="carClass">
                            <option className={styles.listItem} value="Внедорожник">Внедорожник</option>
                            <option className={styles.listItem} value="Седан">Седан</option>
                        </datalist>
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.itemName}>Цена аренды в сутки:</label>
                        <input type="text" list="carPrice" className={styles.itemInputPrice} autoComplete="off"{
                            ...register("carPrice")
                        }
                        />
                    </div>
                    <div className={styles.infoButtons}>
                        <input onClick={reset} className={styles.buttonCancel} type="button" value="Отмена"></input>
                        <input onClick={handleSubmit(onSubmit)} type="submit" className={styles.buttonSave}
                               value="Сохранить"></input>
                    </div>
                </div>
            </form>
        </div>
    )
}