import styles from "./filterPopUp.module.css"
import {useForm} from 'react-hook-form'
import location from "../../../assets/location.svg"
import React, {useEffect, useState} from "react";
import {CarBrand, CarClass, CarModel, Filial} from "../../../models/Booking/CarBookingModel";
import FilterService from "../../../services/FilterService";

export function FilterPopUp(){
    const [models, setModels] = useState<CarModel[] | undefined>();
    const [brands, setBrands] = useState<CarBrand[] | undefined>();
    const [classes, setClasses] = useState<CarClass[] | undefined>();
    const [filials, setfilials] = useState<Filial[] | undefined>();
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedGearbox, setSelectedGearbox] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [selectedFilial, setSelectedFilial] = useState('');
    const [selectedBrandId, setSelectedBrandId] = useState('');
    const [selectedModelId, setSelectedModelId] = useState('');
    const [minCost, setMinCost] = useState('');
    const [maxCost, setMaxCost] = useState('');
      
  
    const handleMinCostChange = (event:any) => {
        const minCost = event.target.value;
        setMinCost(minCost);
    };
    const handleMaxCostChange = (event:any) => {
        const maxCost = event.target.value;
        setMaxCost(maxCost);
    };
    const handleFilialChange = (event:any) => {
        const selectedFilial = event.target.value;
        setSelectedFilial(selectedFilial);
    };

    const handleRatingChange = (event:any) => {
      const selectedRating = event.target.value;
      setSelectedRating(selectedRating);
    };

    const handleGearboxChange = (event:any) => {
      const selectedGearbox = event.target.value;
      setSelectedGearbox(selectedGearbox);
    };

    const handleClassChange = (event:any) => {
      const selectedClass = event.target.value;
      setSelectedClass(selectedClass);
    };

    const handleSubmit=() =>{
        console.log({
          selectedBrandId,
          selectedModelId,
          selectedClass,
          selectedGearbox,
          selectedRating,
          selectedFilial,
          minCost,
          maxCost,
        });
      };

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

    const filialsView = filials
        ? filials.map((filial, index) => (
            <option key={index} className={styles.listItem} value={filial.filialId}>{filial.address}</option>
        ))
        : null;

        const handleBrandChange = (event:any) => {
          const brand = event.target.value;
          setSelectedBrandId(brand);
          setSelectedModelId('');
        };
      
        const handleModelChange = (event:any) => {
          const model = event.target.value.toString();
          setSelectedModelId(model);
        };

return(
    <div className={styles.filterBox}>
         <form className={styles.filterForm} >
                <div className={styles.filterScnd}>
                    <div className={styles.scndLineBlock}>
                    <p className={styles.scndText}>Марка</p>
                    <label className={styles.filterItem}>
                    <select
                        className={styles.dropItem}
                        onChange={handleBrandChange}
                        defaultValue={selectedBrandId}
                        autoComplete="off"
                        placeholder='Mercedes-Benz'
                        >
                        <option value=""></option>
                        {brands && brands.map((brand) => (
                            <option key={brand.carBrandId} value={brand.carBrandId}>
                            {brand.name} 
                            </option>
                        ))}
                        </select>
                    </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div className={styles.scndLineBlock}>
                    <p className={styles.scndText}>Модель</p>
                    <label className={styles.filterItem}>
                    <select
                    className={styles.dropItem}
                    onChange={handleModelChange}
                    defaultValue={selectedModelId}
                    autoComplete="off"
                    placeholder='G63 AMG'
                    >
                         <option value=""></option>
                        {models &&
                            models
                            .filter((model) => model.carBrand.carBrandId === Number(selectedBrandId))
                            .map((model) => (
                                <option key={model.carModelId} value={model.carModelId}>
                                {model.modelName}
                                </option>
                            ))}
                    </select>
                    </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div className={styles.scndLineBlock}>
                    <p className={styles.scndText}>Тип кузова</p>
                    <label className={styles.filterItem}>
                    <select
                        className={styles.dropItem}
                        onChange={handleClassChange}
                        defaultValue={selectedClass}
                        autoComplete="off"
                    >
                        <option value=""></option>
                        {classes && classes.map((classModel, index) => (
                        <option key={index} className={styles.listItem} value={classModel.carClassId}>
                        {classModel.className}
                        </option>
                    ))}
                        </select>
                        </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div className={styles.scndLineBlock}>
                    <p className={styles.scndText}>Коробка передач</p>
                    <label className={styles.filterItem}>
                        <select
                            defaultValue={selectedGearbox}
                            onChange={handleGearboxChange}
                            className={styles.dropItem}
                            autoComplete="off"
                        >
                            <option value=""></option>
                            <option value="Автоматическая">АКПП</option>
                            <option value="Механическая">МКПП</option>
                            <option value="Все">Все</option>
                        </select>
                        </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div className={styles.scndLineBlock}>
                    <p className={styles.scndText}>Рейтинг</p>
                    <label className={styles.filterItem}>
                        <select
                            defaultValue={selectedRating}
                            onChange={handleRatingChange}
                            className={styles.dropItem}
                            autoComplete="off"
                        >
                            <option value=""></option>
                            <option value="5.0">5.0</option>
                            <option value="4.0">4.0</option>
                            <option value="3.0">3.0</option>
                            <option value="2.0">2.0</option>
                            <option value="1.0">1.0</option>
                        </select>
                        </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div className={styles.scndLineBlock}>
                    <p className={styles.scndText}>Цена от</p>
                        <label className={styles.filterItem}>
                            <input type="text" defaultValue={minCost} onChange={handleMinCostChange} className={styles.textItem} />
                        </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div className={styles.scndLineBlock}>
                    <p className={styles.scndText}>Цена до</p>
                        <label className={styles.filterItem}>
                            <input type="text" defaultValue={maxCost} onChange={handleMaxCostChange} className={styles.textItem}/>
                        </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div className={styles.scndLineBlock}>
                    <p className={styles.scndText}>Филиал</p>
                    <label className={styles.filterItem}>
                        <select
                            defaultValue={selectedFilial}
                            onChange={handleFilialChange}
                            className={styles.dropItem}
                            autoComplete="off"
                        >
                            <option value=""></option>
                            {filialsView}
                        </select>
                        </label>
                    </div>
                </div>
            </form>
            <button className={styles.formButton}  type="button" onClick={handleSubmit}>Поиск</button>
    </div>
);}