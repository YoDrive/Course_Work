import styles from "./filterPopUp.module.css"
import {useForm} from 'react-hook-form'
import location from "../../../assets/location.svg"
export function FilterPopUp(){
    const {
        register,
        handleSubmit,
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit=(data:any) =>{
        console.log(data)
    }
return(
    <div className={styles.filterBox}>
         <form  onSubmit={handleSubmit(onSubmit)} className={styles.filterForm} >
                <div className={styles.filterScnd}>
                    <div className={styles.inputBlock}>
                    <p className={styles.scndText}>Марка</p>
                    <label className={styles.filterItem}>
                        <input type='text' list="carBrandId" className={styles.dropItem} placeholder='Mercedes-Benz' autoComplete="off"
                        {...register("carBrandId")} 
                            />
                        <datalist className={styles.inputList} id="carBrandId" >
                            <option className={styles.listItem} value="BMW">BMW</option>
                            <option className={styles.listItem} value="Mercedes-Benz">Mercedes-Benz</option>
                        </datalist>
                    </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div>
                    <p className={styles.scndText}>Модель</p>
                    <label className={styles.filterItem}>
                        <input type='text' list="modelId" className={styles.dropItem} placeholder='E63 AMG' autoComplete="off"
                        {...register("modelId")}
                            />
                        <datalist className={styles.inputList} id="modelId">
                            <option className={styles.listItem} value="BMW">BMW</option>
                            <option className={styles.listItem} value="Mercedes-Benz">Mercedes-Benz</option>
                        </datalist>
                    </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div >
                    <p className={styles.scndText}>Тип кузова</p>
                    <label className={styles.filterItem}>
                        <input type='text' list="classId" className={styles.dropItem} placeholder='Седан' autoComplete="off"
                        {...register("classId")}
                            />
                        <datalist className={styles.inputList} id="classId" >
                            <option className={styles.listItem} value="Внедорожник">Внедорожник</option>
                            <option className={styles.listItem} value="Лимузин">Лимузин</option>
                        </datalist>
                    </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div>
                    <p className={styles.scndText}>Коробка передач</p>
                        <label className={styles.filterItem}>
                            <input type="text" list="gearBox" placeholder="Механическая" className={styles.dropItem} defaultChecked={true}
                            {...register("gearBox")}
                                />
                        <datalist className={styles.inputList} id="gearBox">
                            <option className={styles.listItem} value="Автоматическая">АКПП</option>
                            <option className={styles.listItem} value="Механическая">МКПП</option>
                             <option className={styles.listItem} value="Все">Все</option>
                        </datalist>
                        </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div className={styles.scndLineBlock}>
                    <p className={styles.scndText}>Рейтинг</p>
                        <label className={styles.filterItem}>
                            <input type="text" list="rating" placeholder="5.0" className={styles.dropItem} defaultChecked={true}
                            {...register("rating")}
                                />
                        <datalist className={styles.inputList} id="rating">
                            <option className={styles.listItem} value="Автоматическая">АКПП</option>
                            <option className={styles.listItem} value="Механическая">МКПП</option>
                        </datalist>
                        </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div className={styles.scndLineBlock}>
                    <p className={styles.scndText}>От</p>
                        <label className={styles.filterItem}>
                            <input type="text" placeholder="1400₽/сутки" className={styles.textItem} defaultChecked={true}
                            {...register("minCostDay")}
                                />
                        </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div className={styles.scndLineBlock}>
                    <p className={styles.scndText}>До</p>
                        <label className={styles.filterItem}>
                            <input type="text" placeholder="1600₽/сутки" className={styles.textItem} defaultChecked={true}
                            {...register("maxCostDay")}
                                />
                        </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div className={styles.scndLineBlock}>
                    <p className={styles.scndText}>Филиал</p>
                        <label className={styles.filterItem}>
                            <input type="text" list="filial" placeholder="Эшкинина 10В"  className={styles.dropItem} defaultChecked={true}
                            {...register("filial")}
                                />
                        <datalist className={styles.inputList} id="filial">
                            <option className={styles.listItem} value="Эшкинина 10В">Эшкинина 10В</option>
                            <option className={styles.listItem} value="Чехова 15">Чехова 15</option>
                        </datalist>
                        </label>
                    </div>
                </div>
            </form>
            <button className={styles.formButton} onClick={handleSubmit(onSubmit)} type="submit">Поиск
            </button>
    </div>
);}