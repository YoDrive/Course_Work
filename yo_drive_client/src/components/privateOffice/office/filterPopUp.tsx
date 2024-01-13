import styles from "./filterPopUp.module.css"
import location from "../../../assets/location.svg"
import React, {useEffect, useState, useMemo} from "react";
import {CarBrand, CarClass, CarModel, Filial} from "../../../models/Booking/CarBookingModel";
import FilterService from "../../../services/FilterService";
import { Filter } from "../../../models/Booking/FilterBookingModel";
import { GearBoxEnum } from "../../../models/CarModel";
interface FilterPopUpProps {
    onFiltersChange: (filters: Filter) => void;
}
const FilterPopUp: React.FC<FilterPopUpProps> = ({ onFiltersChange }) => {
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

    const [selectedBrand, setSelectedBrand] = useState<number | undefined>(undefined);
    const [selectedModel, setSelectedModel] = useState<number | undefined>(undefined);
    const [selectedTransmission, setSelectedTransmission] = useState<number |undefined>(undefined);
    const [selectedFilial, setSelectedFilial] = useState<number |undefined>(undefined);
    const [selectedCarClass, setSelectedCarClass] = useState<number |undefined>(undefined);
    const [minCostDay, setMinCostDay] = useState();
    const [maxCostDay, setMaxCostDay] = useState();
    
    const handleMinCost = (event:any) => {
        const selectedMinCost = event.target.value;
        setMinCostDay(selectedMinCost);
    };
    const handleMaxCost = (event:any) => {
        const selectedMaxCost = event.target.value;
        setMaxCostDay(selectedMaxCost);
    };

    const handleTransmissionChange = (event: any) => {
        const transm = event.target.value;
        setSelectedTransmission(parseInt(transm, 10));
    };
  
    const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBrand = event.target.value !== '' ? Number(event.target.value) : undefined;
        setSelectedBrand(selectedBrand);
        setSelectedModel(undefined);
    };
    
    const handleFilialChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilial = event.target.value !== '' ? Number(event.target.value) : undefined;
        setSelectedFilial(selectedFilial);
    };
    
    const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCarClass = event.target.value !== '' ? Number(event.target.value) : undefined;
        setSelectedCarClass(selectedCarClass);
    };
    
      const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedModel = event.target.value !== '' ? Number(event.target.value) : undefined;
        setSelectedModel(selectedModel);
    };

      const [localFilters, setLocalFilters] = useState<Filter>({});

    useEffect(() => {
        setLocalFilters({
            carBrandId: selectedBrand !== undefined ? [Number(selectedBrand)] : selectedBrand,
            modelId: selectedModel !== undefined ? [Number(selectedModel)] : selectedModel,
            classId: selectedCarClass !== undefined ? [Number(selectedCarClass)] : selectedCarClass,
            filialId: selectedFilial !== undefined ? [Number(selectedFilial)] : selectedFilial,
            minCostDay: minCostDay !== undefined ? Number(minCostDay) : undefined,
            maxCostDay: maxCostDay !== undefined ? Number(maxCostDay) : undefined,
            gearBox: selectedTransmission === 0
            ? GearBoxEnum["Автоматическая"]
            : selectedTransmission === 1
              ? GearBoxEnum["Механическая"]
              : undefined,
        });
    }, [selectedBrand, selectedModel, selectedCarClass, selectedFilial, minCostDay, maxCostDay, selectedTransmission]);

    const memoizedLocalFilters = useMemo(() => localFilters, [localFilters]);
    const handleApplyFilters = () => {
        onFiltersChange(memoizedLocalFilters);
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
                        defaultValue={selectedBrand}
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
                    defaultValue={selectedModel}
                    autoComplete="off"
                    >
                         <option value=""></option>
                        {models &&
                            models
                            .filter((model) => model.carBrand.carBrandId === Number(selectedBrand))
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
                        defaultValue={selectedCarClass}
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
                        defaultValue={String(selectedTransmission)}
                        onChange={handleTransmissionChange}
                        className={styles.dropItem}
                        autoComplete="off"
                    >
                        <option></option>
                        <option value="0">Автоматическая</option>
                        <option value="1">Механическая</option>
                        <option value="">Все</option>
                    </select>
                        </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div className={styles.scndLineBlock}>
                    <p className={styles.scndText}>Цена от</p>
                        <label className={styles.filterItem}>
                            <input type="text" defaultValue={minCostDay} onChange={handleMinCost} className={styles.textItem} />
                        </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div className={styles.scndLineBlock}>
                    <p className={styles.scndText}>Цена до</p>
                        <label className={styles.filterItem}>
                            <input type="text" defaultValue={maxCostDay} onChange={handleMaxCost} className={styles.textItem}/>
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
                           {filials&& filials.map((filial, index) => (
                            <option key={index} className={styles.listItem} value={filial.filialId}>{filial.address}</option>
                        ))}
                        </select>
                        </label>
                    </div>
                </div>
                <div className={styles.filterScnd}>
                    <div className={styles.scndLineBlock}>
                        <button className={styles.formButton}  type="button" onClick={handleApplyFilters}>Поиск</button>
                    </div>
                </div>
            </form>
    </div>
);}

export default FilterPopUp;