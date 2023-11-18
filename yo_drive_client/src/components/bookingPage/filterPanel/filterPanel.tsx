import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import styles from './filterPanel.module.css';
import galOpen from "../../../assets/galochkaClose.svg";
import galClose from "../../../assets/galochkaOpen.svg"
import lupa from "../../../assets/lupa.svg"
import location from "../../../assets/location.svg"
import { Filter } from '../../../models/Booking/FilterBookingModel';
export function getCurrentDate(separator='-'){

    let myCurrentDate = new Date()
    let date = myCurrentDate.getDate();
    let month = myCurrentDate.getMonth() + 1;
    let year = myCurrentDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
    }

export function FilterPanel() {
    const [counter, setCounter] = useState(1);
    const handleInputChange = (event:any) => {
        const inputValue = event.target.value.trim();
        const wasEmpty = inputValue === '';
        const wasNotEmpty = event.target.dataset.prevValue && event.target.dataset.prevValue.trim() !== '';
        
        if (wasEmpty && wasNotEmpty) {
        setCounter((prevCount) => Math.max(prevCount - 1, 0));
        } else if (!wasEmpty && !wasNotEmpty) {
        setCounter((prevCount) => prevCount + 1);
        }
        
        event.target.dataset.prevValue = inputValue;
    };
    const [isExpanded, setExpanded] = useState(false);
    const [minValue, setMinValue] = useState(new Date())

    const setValue =(param:Date) =>{
        setMinValue(param);
    }
    const minStart = minValue.toString();
    const toggleExpand = () => {
        setExpanded(!isExpanded);
    };
    const minDate= (getCurrentDate("-"));
    const [selected, setSelected] = useState(galOpen)
    const {
        register,
        handleSubmit,
        getValues,
    } = useForm({
        mode: "onBlur"
    });
    let str;
    const dataValid= ()=>{
        setValue(getValues("dateStart"));
    }
    let str1, str2 : Date;
    const checkDate=() =>{
        str1 = getValues("dateStart");
        str2 = getValues("dateEnd");
        if (str1 > str2){
            alert("Неправильная дата конца аренды!");
        } 
    }
    const onSubmit=(data:Filter) =>{
        checkDate();
        console.log(data);
    }
    return (
        <div className={styles.container}>
            <div className={styles.formHead}>
                <div className={styles.toggle} onClick={() => toggleExpand()}> 
                    <button className={styles.toggleButton} onClick={() => (selected === galOpen) ? setSelected(galClose) : setSelected(galOpen)} >
                        <img className={styles.imgToggle} src={selected}></img>
                        <p>Фильтры:</p>
                        <p className={styles.countForm}>(выбрано {counter})</p>
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
                    <input type='date' className={styles.dateItem} autoComplete="off"  min={minDate} 
                     {...register("dateStart")} onSelect={dataValid}   onChangeCapture={handleInputChange}        
                        />
                </label>
                <label className={styles.filterItem}>
                    по
                    <input type='date' className={styles.dateItem} autoComplete="off" min={minDate === null ? minDate : minStart} 
                     {...register("dateEnd")}   onChangeCapture={handleInputChange} 
                        />
                </label>
                <label className={styles.filterItem}>
                    от
                    <input type='text' className={styles.textItem} autoComplete="off" placeholder='1000₽/сутки' 
                     {...register("minCostDay")}    onChangeCapture={handleInputChange} 
                        />
                </label>
                <label className={styles.filterItem}>
                    до
                    <input type='text' className={styles.textItem} autoComplete="off" placeholder='1500₽/сутки' 
                     {...register("maxCostDay")}  onChangeCapture={handleInputChange} 
                        />
                </label>
                <label className={styles.filterItem}>
                    <img className={styles.locationImg} src={location}></img>
                    <input type='text' list="filialId" className={styles.dropItem} autoComplete="off" placeholder='Эшкинина 10В'
                     {...register("filialId")}  onChangeCapture={handleInputChange} 
                        />
                    <datalist className={styles.inputList} id="filialId">
                        <option className={styles.listItem} value="Эшкинина 10В"></option>
                        <option className={styles.listItem} value="Чехова 15"></option>
                    </datalist>
                </label>
                <div className={styles.filterScnd}>
                    <div >
                    <p className={styles.scndText}>Тип кузова</p>
                    <label className={styles.filterItem}>
                        <input type='text' list="classId" className={styles.dropItem} placeholder='Седан' autoComplete="off"
                        {...register("classId")}  onChangeCapture={handleInputChange} 
                            />
                        <datalist className={styles.inputList} id="classId" >
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
                        <input type='text' list="carBrandId" className={styles.dropItem} placeholder='Mercedes-Benz' autoComplete="off"
                        {...register("carBrandId")}  onChangeCapture={handleInputChange} 
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
                        {...register("modelId")}  onChangeCapture={handleInputChange} 
                            />
                        <datalist className={styles.inputList} id="modelId">
                            <option className={styles.listItem} value="BMW">BMW</option>
                            <option className={styles.listItem} value="Mercedes-Benz">Mercedes-Benz</option>
                        </datalist>
                    </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div className={styles.radioBtns}>
                    <p className={styles.scndText}>Коробка передач</p>
                    <div className={styles.btnsRadio} >
                        <label className={styles.filterItem}>
                            <input type="radio" value="Механическая" className={styles.checkboxItem} defaultChecked={true}
                            {...register("gearBox")}
                                />
                            <p className={styles.radioText} >Механическая</p>
                        </label>
                        <label className={styles.filterItem}>
                            <input type="radio" value="Автоматическая" className={styles.checkboxItem} defaultChecked={true}
                            {...register("gearBox")}
                                />
                            <p className={styles.radioText}>Автоматическая</p>
                        </label>
                        <label className={styles.filterItem}>
                            <input type="radio" value="Все" className={styles.checkboxItem} defaultChecked={true}
                            {...register("gearBox")}
                                />
                            <p className={styles.radioText}>Все</p>
                        </label>
                    </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default FilterPanel;