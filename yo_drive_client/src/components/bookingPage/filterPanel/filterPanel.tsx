import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import styles from './filterPanel.module.css';
import galOpen from "../../../assets/galochkaClose.svg";
import galClose from "../../../assets/galochkaOpen.svg"
import lupa from "../../../assets/lupa.svg"
import location from "../../../assets/location.svg"
import { Filter } from '../../../models/Booking/FilterBookingModel';
import {CarBrand, CarModel, CarClass, Filial} from "../../../models/Booking/CarBookingModel";
import BookingService from "../../../services/BookingService";
import FilterService from "../../../services/FilterService";
import { format } from 'date-fns';
export function getCurrentDate(separator='-'){

    let myCurrentDate = new Date()
    let date = myCurrentDate.getDate();
    let month = myCurrentDate.getMonth() + 1;
    let year = myCurrentDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date<10?`0${date}`:`${date}`}`
    }

export function FilterPanel() {
    const [counter, setCounter] = useState(1);
    const [isExpanded, setExpanded] = useState(false);
    const [minValue, setMinValue] = useState(new Date());
    const [selected, setSelected] = useState(galOpen);
    const [models, setModels] = useState<CarModel[] | undefined>();
    const [brands, setBrands] = useState<CarBrand[] | undefined>();
    const [classes, setClasses] = useState<CarClass[] | undefined>();
    const [filials, setfilials] = useState<Filial[] | undefined>();

    useEffect(() => {
        async function fetchFilters() {
            try {
                const responseModel = await FilterService.GetModels();
                setModels(responseModel.data);
                const responseBrand = await FilterService.GetBrands();
                setBrands(responseBrand.data);
                const responseClass = await FilterService.GetClasses();
                setClasses(responseClass.data);
                const responseFilial = await FilterService.GetFilials();
                setfilials(responseFilial.data);
            } catch (error) {
                console.error('Error fetching filters:', error);
            }
        }

        fetchFilters();
    }, []);

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

    const setValue =(param:Date) =>{
        setMinValue(param);
    }
    const toggleExpand = () => {
        setExpanded(!isExpanded);
    };
    const minDate= (getCurrentDate("-"));
    
    const dataValid= ()=>{
        if(minDateH){
        setValue(minDateH);
        }
    }
    
    const checkDate = () => {
        if (minDateH && maxDateH) {
            const date1 = new Date(minDateH);
            const date2 = new Date(maxDateH);
    
            if (date1 > date2) {
                alert("Неправильная дата конца аренды!");
            }
        } else {
            alert("Выберите корректные даты для сравнения!");
        }
    };
    const onSubmit=() =>{
        checkDate();
        console.log(
            selectedBrand,
            selectedModel,
            selectedFilial,
            selectedTransmission,
            formMinDate,
            formMaxDate,
            minCostDay,
            maxCostDay,
            selectedCarClass
        );
    }
    const [selectedBrand, setSelectedBrand] = useState<number | undefined>(undefined);
    const [selectedModel, setSelectedModel] = useState<number | undefined>(undefined);
    const [selectedTransmission, setSelectedTransmission] = useState('');
    const [selectedFilial, setSelectedFilial] = useState('');
    const [selectedCarClass, setSelectedCarClass] = useState('');
    const [minCostDay, setMinCostDay] = useState();
    const [maxCostDay, setMaxCostDay] = useState();
    const [minDateH, setMinDate] = useState<Date | null>();
    const [maxDateH, setMaxDate] = useState<Date | null>();

    const formMinDate = minDateH ? format(minDateH, 'dd-MM-yyyy') : '';
    const formMaxDate = maxDateH ? format(maxDateH, 'dd-MM-yyyy') : '';


    
    const maxDateHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        const selectedMaxDate = event.target.valueAsDate;
        setMaxDate(selectedMaxDate);
    };
    const minDateHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
        const selectedMinDate = event.target.valueAsDate;
        setMinDate(selectedMinDate);
    };
    const handleMinCost = (event:any) => {
        const selectedMinCost = event.target.value;
        setMinCostDay(selectedMinCost);
    };
    const handleMaxCost = (event:any) => {
        const selectedMaxCost = event.target.value;
        setMaxCostDay(selectedMaxCost);
    };
    const handleFilialChange = (event:any) => {
        const selectedFilial = event.target.value;
        setSelectedFilial(selectedFilial);
    };

    const handleTransmissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const transm = event.target.value;
        setSelectedTransmission(transm);
      };
  
    const handleClassChange = (event:any) => {
        const selectedClass = event.target.value;
        setSelectedCarClass(selectedClass);
    };
    const handleBrandChange = (event: any) => {
        const brand = event.target.value
        setSelectedBrand(brand);
        setSelectedModel(undefined);
      };
    
      const handleModelChange = (event:any) => {
        const model = event.target.value
        setSelectedModel(model);
      };
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
                <button className={styles.formButton} onClick={onSubmit} type="button">
                    <img className={styles.imgForm} src={lupa} ></img>
                    <p>Поиск</p>
                </button>
            </div>
           <form   className={styles.filterForm} style={{ height: isExpanded ? "83px" : "0px" }}>
                <label className={styles.filterItem}>
                    с
                    <input type='date' className={styles.dateItem} autoComplete="off"  min={minDate} 
                      onSelect={dataValid}   onChangeCapture={handleInputChange}   onChange={minDateHandler}     
                        />
                </label>
                <label className={styles.filterItem}>
                    по
                    <input type='date' className={styles.dateItem} autoComplete="off" min={minDateH ? minDateH.toISOString().split('T')[0] : undefined} 
                       onChangeCapture={handleInputChange} onChange={maxDateHandler}
                        />
                </label>
                <label className={styles.filterItem}>
                    от
                    <input type='text' className={styles.textItem} autoComplete="off" placeholder='1000₽/сутки' 
                          onChangeCapture={handleInputChange} onChange={handleMinCost}
                        />
                </label>
                <label className={styles.filterItem}>
                    до
                    <input type='text' className={styles.textItem} autoComplete="off" placeholder='1500₽/сутки' 
                     onChangeCapture={handleInputChange}  onChange={handleMaxCost}
                        />
                </label>
                <label className={styles.filterItem}>
                    <img className={styles.locationImg} src={location}></img>
                    <select className={styles.dropItem} onChangeCapture={handleFilialChange}
                        onChange={handleInputChange}>
                        <option value=""></option>
                       {filials&& filials.map((filial) => (
                        <option key={filial.filialId} className={styles.listItem} value={filial.address}>{filial.address}</option>
                    ))}</select>
                    
                </label>
                <div className={styles.filterScnd}>
                    <div >
                    <p className={styles.scndText}>Тип кузова</p>
                    <label className={styles.filterItem}>
                        <select className={styles.dropItem}
                         onChangeCapture={handleInputChange} onChange={handleClassChange}>
                        <option value=""></option>
                       {classes && classes.map((classModel) => (
                        <option key={classModel.carClassId} value={classModel.carClassId}>{classModel.className}</option>
                    ))}</select>
                    </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div className={styles.inputBlock}>
                    <p className={styles.scndText}>Марка</p>
                    <label className={styles.filterItem}>
                        <select  className={styles.dropItem}
                         onChange={handleInputChange} onChangeCapture={handleBrandChange}>
                        <option value=""></option>
                        {brands && brands.map((brand) => (
                            <option key={brand.carBrandId} value={brand.carBrandId}>{brand.name}</option>
                        ))}</select>
                    </label>  
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div>
                    <p className={styles.scndText}>Модель</p>
                    <label className={styles.filterItem}>
                        <select className={styles.dropItem} 
                         onChangeCapture={handleInputChange} onChange={handleModelChange}>
                        <option value=""></option>
                        {models &&
                            models
                            .filter((model) => model.carBrand.carBrandId === Number(selectedBrand))
                            .map((model) => (
                                <option key={model.carModelId} value={model.carModelId}>
                                {model.modelName}
                                </option>
                            ))}</select>
                    </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div className={styles.radioBtns}>
                    <p className={styles.scndText}>Коробка передач</p>
                    <div className={styles.btnsRadio} onChange={handleTransmissionChange} >
                    <label className={styles.filterItem}>
                        <input type="radio"
                            name="transmission"
                            value="Механическая"
                            className={styles.checkboxItem}
                            // checked={selectedTransmission === 'Механическая'}
                            onChange={handleTransmissionChange} />
                        <p className={styles.radioText}>Механическая</p>
                    </label>

                    <label className={styles.filterItem}>
                    <input
                        type="radio"
                        name="transmission"
                        value="Автоматическая"
                        className={styles.checkboxItem}
                        // checked={selectedTransmission === 'Автоматическая'}
                        onChange={handleTransmissionChange}
                        />
                        <p className={styles.radioText}>Автоматическая</p>
                    </label>

                    <label className={styles.filterItem}>
                    <input
                        type="radio"
                        name="transmission"
                        value="Все"
                        className={styles.checkboxItem}
                        // checked={selectedTransmission === 'Все'}
                        onChange={handleTransmissionChange}
                        defaultChecked={true}/>
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