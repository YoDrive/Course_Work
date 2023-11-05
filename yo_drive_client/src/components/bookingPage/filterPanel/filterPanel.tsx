import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import styles from './filterPanel.module.css';
import galOpen from "../../../assets/galochkaClose.svg";
import galClose from "../../../assets/galochkaOpen.svg"
import lupa from "../../../assets/lupa.svg"
import location from "../../../assets/location.svg"

export function FilterPanel() {
    const [isExpanded, setExpanded] = useState(false);
 
    const toggleExpand = () => {
        setExpanded(!isExpanded);
    };

    const [selected, setSelected] = useState(galOpen)
    const {
        register,
        handleSubmit,
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit=(data:any) =>{
        console.log(data);
    }
    return (
        <div className={styles.container}>
            <div className={styles.formHead}>
                <div className={styles.toggle} onClick={() => toggleExpand()}> 
                    <button className={styles.toggleButton} onClick={() => (selected === galOpen) ? setSelected(galClose) : setSelected(galOpen)} >
                        <img className={styles.imgToggle} src={selected}></img>
                        <p>Фильтры:</p>
                        <p className={styles.countForm}>(выбрано 0)</p>
                    </button>
                </div>
                <button className={styles.formButton} onClick={handleSubmit(onSubmit)} type="submit">
                    <img className={styles.imgForm} src={lupa} ></img>
                    <p>Поиск</p>
                </button>
            </div>
           <form  onSubmit={handleSubmit(onSubmit)} className={styles.filterForm} style={{ height: isExpanded ? "83px" : "0px" }}>
                <label className={styles.filterItem}>
                    с
                    <input type='date' className={styles.dateItem} autoComplete="off"
                     {...register("dateStart")}                       
                        />
                </label>
                <label className={styles.filterItem}>
                    по
                    <input type='date' className={styles.dateItem} autoComplete="off"
                     {...register("dateEnd")}
                        />
                </label>
                <label className={styles.filterItem}>
                    от
                    <input type='text' className={styles.textItem} autoComplete="off" placeholder='1000₽/сутки'
                     {...register("costFrom")}
                        />
                </label>
                <label className={styles.filterItem}>
                    до
                    <input type='text' className={styles.textItem} autoComplete="off" placeholder='1500₽/сутки' 
                     {...register("costTo")}
                        />
                </label>
                <label className={styles.filterItem}>
                    <img className={styles.locationImg} src={location}></img>
                    <input type='text' list="location" className={styles.dropItem} autoComplete="off" placeholder='Эшкинина 10В'
                     {...register("location")}
                        />
                    <datalist className={styles.inputList} id="location">
                        <option className={styles.listItem} value="Эшкинина 10В"></option>
                        <option className={styles.listItem} value="Чехова 15"></option>
                    </datalist>
                </label>
                <div className={styles.filterScnd}>
                    <div >
                    <p className={styles.scndText}>Класс</p>
                    <label className={styles.filterItem}>
                        <input type='text' list="carClass" className={styles.dropItem} placeholder='Седан' autoComplete="off"
                        {...register("carClass")}
                            />
                        <datalist className={styles.inputList} id="carClass" >
                            <option className={styles.listItem} value="Внедорожник">Внедорожник</option>
                            <option className={styles.listItem} value="Лимузин">Лимузин</option>
                        </datalist>
                    </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div className={styles.inputBlock}>
                    <p className={styles.scndText}>Марка</p>
                    <label className={styles.filterItem}>
                        <input type='text' list="carBrand" className={styles.dropItem} placeholder='Mercedes-Benz' autoComplete="off"
                        {...register("carBrand")}
                            />
                        <datalist className={styles.inputList} id="carBrand" >
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
                        <input type='text' list="carModel" className={styles.dropItem} placeholder='E63 AMG' autoComplete="off"
                        {...register("carModel")}
                            />
                        <datalist className={styles.inputList} id="carModel">
                            <option className={styles.listItem} value="BMW">BMW</option>
                            <option className={styles.listItem} value="Mercedes-Benz">Mercedes-Benz</option>
                        </datalist>
                    </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div className={styles.radioBtns}>
                    <p className={styles.scndText}>Коробка передач</p>
                    <div className={styles.btnsRadio}>
                        <label className={styles.filterItem}>
                            <input type="checkbox" value="Механическая" className={styles.checkboxItem}
                            {...register("carGear")}
                                />
                            <p className={styles.radioText} >Механическая</p>
                        </label>
                        <label className={styles.filterItem}>
                            <input type="checkbox" value="Автоматическая" className={styles.checkboxItem}
                            {...register("carGear")}
                                />
                            <p className={styles.radioText}>Автоматическая</p>
                        </label>
                    </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FilterPanel;