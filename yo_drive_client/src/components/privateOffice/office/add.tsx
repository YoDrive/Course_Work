import {useRef, useState} from 'react';
import styles from "./add.module.css"
import space from "../../../assets/space.svg"
import { useForm} from "react-hook-form"
import { CarAdd } from '../../../models/Add/Add.model';

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
        resetField,
        formState: {errors}
    } = useForm<CarAdd>({
    });
    const resFields = ()=>{
        resetField("carImage");
        resetField("carModel.carBrand.name");
        resetField("carModel.modelName");
        resetField("year");
        resetField("gearBox");
        resetField("carClass");
        resetField("costDay");
        resetField("filial");
    }

    const onSubmit = (data: CarAdd) =>{
        console.log(data);
       // alert("*: поле не заполнено\n **: поле заполнено неправильно")
    }
    return(
        <div className={styles.addBlock}>
            <form className={styles.addForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.blockImg} onClick={handleImageClick}>
                    <div className={styles.imgSpace}>
                        {image ? <img src={URL.createObjectURL(image)} style={{width: "100%", height:"100%", objectFit:"contain"}} />:<img className={styles.spaceIcon} src={space}></img>}
                    </div>
                    <div className={styles.itemInp}>
                        <input type="file" accept=".jpg,.jpeg,.png" id="Image" className={styles.inputImg} {
                                ...register("carImage"
                                // ,{
                                //     required:"*"
                                // }
                                )} ref={inputRef} onChange={handleImageChange} />
                            
                        <label htmlFor="Image" className={styles.imgItem}>Загрузить изображение</label>
                        {/* <div style={{height: 13, width: 2}}>
                            {errors?.carImage && <p className={styles.itemError}>{errors?.carImage.message}</p>}
                        </div> */}
                    </div>
                </div>
                <div className={styles.blockInfo}>
                    <div className={styles.infoItem}>
                        <label className={styles.itemName}>Марка:</label>
                        <div className={styles.itemInp}>
                        <input type="text" list="carBrand" className={styles.itemInput} autoComplete="off" {
                            ...register("carModel.carBrand.name",{
                                required:"*"
                            })
                        }
                        />
                        <datalist className={styles.inputList} id="carBrand">
                            <option className={styles.listItem} value="Mercedes-Benz">Mercedes-Benz</option>
                            <option className={styles.listItem} value="BMW">BMW</option>
                        </datalist>
                        <div style={{height: 13, width: 2}}>
                            {errors?.carModel?.carBrand?.name && <p className={styles.itemError}>{errors?.carModel?.carBrand.name.message}</p>}
                        </div>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.itemName}>Модель:</label>
                        <div className={styles.itemInp}>
                        <input type="text" list="carModel" className={styles.itemInput} autoComplete="off" {
                            ...register("carModel.modelName",{
                                required:"*"
                            })
                        }
                        />
                        <datalist className={styles.inputList} id="carModel">
                            <option className={styles.listItem} value="G63 AMG">G63 AMG</option>
                            <option className={styles.listItem} value="X5">X5</option>
                        </datalist>
                        <div style={{height: 13, width: 2}}>
                            {errors?.carModel?.modelName && <p className={styles.itemError}>{errors?.carModel?.modelName.message}</p>}
                        </div>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.itemName}>Год выпуска:</label>
                        <div className={styles.itemInp}>
                        <input type="text" list="carYear" className={styles.itemInput} autoComplete="off" {
                            ...register("year",{
                                required:"*",
                                pattern:{
                                    value: /^(195[1-9]|19[6-9]\d|20[0-1]\d|202[0-4])$/i,
                                    message: "**"
                                }
                            })
                        }
                        />
                        <datalist className={styles.inputList} id="carYear">
                            <option className={styles.listItem} value="2020">2020</option>
                            <option className={styles.listItem} value="2023">2023</option>
                        </datalist>
                        <div style={{height: 13, width: 2}}>
                            {errors?.year && <p className={styles.itemError}>{errors?.year.message}</p>}
                        </div>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.itemName}>Тип КПП:</label>
                        <div className={styles.itemInp}>
                        <input type="text" list="carGear" className={styles.itemInput} autoComplete="off"{
                            ...register("gearBox",{
                                required:"*",
                                pattern:{
                                    value:/^(МКПП|АКПП)$/,
                                    message:"**"
                                }
                            })
                        }
                        />
                        <datalist className={styles.inputList} id="carGear">
                            <option className={styles.listItem} value="АКПП">АКПП</option>
                            <option className={styles.listItem} value="МКПП">МКПП</option>
                        </datalist>
                        <div style={{height: 13, width: 2}}>
                            {errors?.gearBox && <p className={styles.itemError}>{errors?.gearBox.message}</p>}
                        </div>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.itemName}>Тип кузова:</label>
                        <div className={styles.itemInp}>
                        <input type="text" list="carClass" className={styles.itemInput} autoComplete="off"{
                            ...register("carClass",{
                                required:"*"
                            })
                        }
                        />
                        <div style={{height: 13, width: 2}}>
                            {errors?.carClass && <p className={styles.itemError}>{errors?.carClass.message}</p>}
                        </div>
                        </div>
                        <datalist className={styles.inputList} id="carClass">
                            <option className={styles.listItem} value="Внедорожник">Внедорожник</option>
                            <option className={styles.listItem} value="Седан">Седан</option>
                        </datalist>
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.itemName}>Цена аренды в сутки:</label>
                        <div className={styles.itemInp}>
                        <input type="text" list="carPrice" className={styles.itemInputPrice} autoComplete="off"{
                            ...register("costDay",{
                                required:"*",
                                pattern:{
                                    value:/^\d+$/,
                                    message:"**"
                                }
                            })
                        }
                        />
                        <div style={{height: 13, width: 2}}>
                            {errors?.costDay && <p className={styles.itemError}>{errors?.costDay.message}</p>}
                        </div>
                        </div>
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.itemName}>Филиал:</label>
                        <div className={styles.itemInp}>
                        <input type="text" list="filialId" className={styles.itemInput} autoComplete="off"{
                            ...register("filial",{
                                required:"*"
                            })
                        }
                        />
                        <div style={{height: 13, width: 2}}>
                            {errors?.filial && <p className={styles.itemError}>{errors?.filial.message}</p>}
                        </div>
                        </div>
                        <datalist className={styles.inputList} id="filialId">
                            <option className={styles.listItem} value="Эщкинина 10В">Эщкинина 10В</option>
                            <option className={styles.listItem} value="Чехова 15">Чехова 15</option>
                        </datalist>
                    </div>
                    <div className={styles.infoButtons}>
                        <input className={styles.buttonCancel} type="button" onClick={resFields} value="Отмена"></input>
                        <input onClick={handleSubmit(onSubmit)} type="submit" className={styles.buttonSave}
                               value="Сохранить"></input>
                    </div>
                </div>
            </form>
        </div>
    )
}