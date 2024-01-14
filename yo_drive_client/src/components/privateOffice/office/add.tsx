import {useRef, useState, useEffect} from 'react';
import styles from "./add.module.css"
import space from "../../../assets/space.svg"
import CarService from '../../../services/CarService';
import {CarAdd} from '../../../models/Add/Add.model';
import {CarBrand, CarModel, CarClass, Filial} from "../../../models/Booking/CarBookingModel";
import FilterService from "../../../services/FilterService";
import {GearBoxEnum} from '../../../models/CarModel';

export function Add() {
    const [models, setModels] = useState<CarModel[] | undefined>();
    const [brands, setBrands] = useState<CarBrand[] | undefined>();
    const [classes, setClasses] = useState<CarClass[] | undefined>();
    const [filials, setfilials] = useState<Filial[] | undefined>();
    const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
    const [selectedModel, setSelectedModel] = useState<number | null>(null);
    const [selectedTransmission, setSelectedTransmission] = useState<GearBoxEnum>();
    const [selectedFilial, setSelectedFilial] = useState<number | null>(null);
    const [selectedCarClass, setSelectedCarClass] = useState<number | null>(null);
    const [costDay, setCostDay] = useState<number | null>(null);
    const [year, setYear] = useState<number | null>(null);

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
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState<File | undefined>(undefined)

    const handleImageClick = () => {
        inputRef.current?.focus();
    }
    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        setImage(file);
    }

    const handleBrandChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBrandValue = event.target.value;
        const brandId = selectedBrandValue !== '' ? Number(selectedBrandValue) : null;
        setSelectedBrand(brandId);
        setSelectedModel(null);
    };

    const handleCost = (event: any) => {
        const selectedCost = event.target.value;
        if (!isNaN(selectedCost)) {
            const valid = Number(selectedCost).toFixed(2);
            const selectedCost1 = Number(valid);
            setCostDay(selectedCost1);
        }
    };

    const handleYearChange = (event: any) => {
        const selectedYear = event.target.value;
        setYear(selectedYear);
    };
    const handleFilialChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilialValue = event.target.value;
        const filialId = selectedFilialValue !== '' ? Number(selectedFilialValue) : null;
        setSelectedFilial(filialId);
        ;
    };

    const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedClassValue = event.target.value;
        const classId = selectedClassValue !== '' ? Number(selectedClassValue) : null;
        setSelectedCarClass(classId);
    };

    const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedModelValue = event.target.value;
        const modelId = selectedModelValue !== '' ? Number(selectedModelValue) : null;
        setSelectedModel(modelId);
    };
    const handleTransmissionChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        const transm = event.target.value;
        setSelectedTransmission(parseInt(transm, 10));
    };

    const [localFilters, setLocalFilters] = useState<CarAdd>();

    useEffect(() => {
        const createCarFilter = (): CarAdd => {
            const CarModel: CarAdd = {
                ModelId: (selectedModel !== null && !isNaN(Number(selectedModel))) ? Number(selectedModel) : 0,
                ClassId: (selectedCarClass !== null && !isNaN(Number(selectedCarClass))) ? Number(selectedCarClass) : 0,
                FilialId: (selectedFilial !== null && !isNaN(Number(selectedFilial))) ? Number(selectedFilial) : 0,

                Year: (year !== null && !isNaN(Number(year))) ? Number(year) : 0,
                GearBox: selectedTransmission === 0 ? GearBoxEnum["Автоматическая"] :
                    selectedTransmission === 1 ? GearBoxEnum["Механическая"] :
                        0,
                CostDay: (costDay !== null && !isNaN(Number(costDay))) ? Number(costDay) : 0,
                Image: image
            };

            return CarModel;
        };

        const filters = createCarFilter();
        setLocalFilters(filters);
    }, [selectedModel, selectedBrand, selectedCarClass, selectedFilial, year, selectedTransmission, costDay, image]);
    const handleSave = async () => {
        try {
            if (localFilters) {
                await CarService.createCar(localFilters)
            }

            alert("Ваша машина создана")
        } catch (error) {
            console.error('Ошибка создания автомобиля:', error);
        }
    };


    return (
        <div className={styles.addBlock}>
            <form className={styles.addForm}>
                <div className={styles.blockImg} onClick={handleImageClick}>
                    <div className={styles.imgSpace}>
                        {image ? <img src={URL.createObjectURL(image)}
                                      style={{width: "100%", height: "100%", objectFit: "contain"}}/> :
                            <img className={styles.spaceIcon} src={space}></img>}
                    </div>
                    <div className={styles.itemInp}>
                        <input type="file" accept=".png" id="Image" className={styles.inputImg} ref={inputRef}
                               onChange={handleImageChange}/>
                        <label htmlFor="Image" className={styles.imgItem}>Загрузить изображение</label>
                    </div>
                </div>
                <div className={styles.blockInfo}>
                    <div className={styles.infoItem}>
                        <label className={styles.itemName}>Марка:</label>
                        <select className={styles.itemInput}
                                onChangeCapture={handleBrandChange}>
                            <option></option>
                            {brands && brands.map((brand) => (
                                <option key={brand.carBrandId} value={brand.carBrandId}>{brand.name}</option>
                            ))}</select>
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.itemName}>Модель:</label>
                        <select className={styles.itemInput} onChange={handleModelChange}>
                            <option></option>
                            {models &&
                                models
                                    .filter((model) => model.carBrand.carBrandId === Number(selectedBrand))
                                    .map((model) => (
                                        <option key={model.carModelId} value={model.carModelId}>
                                            {model.modelName}
                                        </option>
                                    ))}</select>
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.itemName}>Год выпуска:</label>
                        <input className={styles.itemInput} type="number" min="1980" max="2024"
                               onChange={handleYearChange}/>
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.itemName}>Тип КПП:</label>
                        <select className={styles.itemInput} onChange={handleTransmissionChange}>
                            <option></option>
                            <option value={1}>Механическая</option>
                            <option value={2}>Автоматическая</option>
                        </select>
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.itemName}>Тип кузова:</label>
                        <select className={styles.itemInput} onChange={handleClassChange}>
                            <option></option>
                            {classes && classes.map((classModel) => (
                                <option key={classModel.carClassId}
                                        value={classModel.carClassId}>{classModel.className}</option>
                            ))}</select>
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.itemName}>Цена аренды в сутки:</label>
                        <input type="text" className={styles.itemInputPrice} autoComplete="off" onChange={handleCost}/>
                    </div>
                    <div className={styles.infoItem}>
                        <label className={styles.itemName}>Филиал:</label>
                        <select className={styles.itemInput} onChangeCapture={handleFilialChange}>
                            <option></option>
                            {filials && filials.map((filial) => (
                                <option key={filial.filialId} className={styles.listItem}
                                        value={filial.filialId}>{filial.address}</option>
                            ))}</select>
                    </div>
                    <div className={styles.infoButtons}>
                        <input className={styles.buttonCancel} type="button" value="Отмена"></input>
                        <input type="button" className={styles.buttonSave} onClick={handleSave}
                               value="Сохранить"></input>
                    </div>
                </div>
            </form>
        </div>
    )
}