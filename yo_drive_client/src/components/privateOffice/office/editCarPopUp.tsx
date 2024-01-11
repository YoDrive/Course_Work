import React, {FunctionComponent,useState, useRef, useEffect, useCallback} from "react";
import styles from "../office/editCarPopUp.module.css"
import {CarBrand, CarViewModel, CarModel, CarClass, Filial} from "../../../models/Booking/CarBookingModel";
import {fetchCars, getCarBrands, getCarModels, getCarClasses, getCarFilials} from "../../../services/CarService";
import { Select , SelectProps, DatePicker, Input} from 'antd';
import { GearBoxEnum } from "../../../models/CarModel";
import CarService from "../../../services/CarService";
import { CarUpdated } from "../../../models/Add/UpdateCar.model";

interface PopupProps {
  handleClose: () => void;
  isOpen: boolean;
  car: CarViewModel;
}

const EditCarPopup: FunctionComponent<PopupProps> = (props) => {
  const [cars, setCars] = useState<CarViewModel[] | undefined>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetchCars();
                setCars(response);
            } catch (error) {
                alert('Ошибка сервера.');
            }
        }

        fetchData();
    }, []);  
    const {isOpen, handleClose, car} = props;
    const carId = props.car.carId;

    const [models, setCarModels] = useState<CarModel[]| undefined>([]);
    const [classes, setCarClass] = useState<CarClass[]| undefined>([]);
    const [filials, setCarFilials] = useState<Filial[]| undefined>([]);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await getCarModels(); 
            setCarModels(response);
        } catch (error) {
            console.error('Error fetching car models:', error);
        }
        };

        fetchData();
    }, []);

    const [selectedBrand, setSelectedBrand] = useState<number| null>(props.car.carModel.carBrand.carBrandId);
    const [selectedModel, setSelectedModel] = useState<number | null>();
    const [selectedTransmission, setSelectedTransmission] = useState<GearBoxEnum>();
    const [selectedFilial, setSelectedFilial] = useState<number |null>();
    const [selectedCarClass, setSelectedCarClass] = useState<number |null>();
    const [costDay, setCostDay] = useState<number |null>();;
    const [year, setYear] = useState<number |null>();;

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

    const handleYearChange = (event:any) => {
        const selectedYear = event.target.value;
        setYear(selectedYear);
    };
    const handleFilialChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFilialValue = event.target.value;
        const filialId = selectedFilialValue !== '' ? Number(selectedFilialValue) : null;
        setSelectedFilial(filialId);;
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
  const [brands, setBrands]= useState<CarBrand[]|undefined>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<File>();
    const [imageUrl, setImageUrl] = useState<string|undefined>()

    const handleImageClick = () =>{
        inputRef.current?.focus();
    }
    const handleImageChange = (event:any) =>{
        const file = event.target.files[0];
        setImageUrl(file.name);
        const file1 = event.target.files[0];
        setImage(file1);
        console.log(file1);
    };

    const resFields = ()=>{
        setAllInp();
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getCarBrands();
                setBrands(response);
            } catch (error) {
                alert('Ошибка сервера.');
            }
        }

        fetchData();
    }, []);
      useEffect(() => {
        async function fetchData() {
            try {
                const response = await getCarClasses();
                setCarClass(response);
            } catch (error) {
                alert('Ошибка сервера.');
            }
        }

        fetchData();
    }, []);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await getCarFilials();
                setCarFilials(response);
            } catch (error) {
                alert('Ошибка сервера.');
            }
        }

        fetchData();
    }, []);

    const [inp1, setInp1]= useState(false);

    const setInpu1 = ()=>{
        setInp1(!inp1)
    }
    const [inp2, setInp2]= useState(false);

    const setInpu2 = ()=>{
        setInp2(!inp2)
    }
    const [inp3, setInp3]= useState(false);

    const setInpu3 = ()=>{
        setInp3(!inp3)
    }
    const [inp4, setInp4]= useState(false);

    const setInpu4 = ()=>{
        setInp4(!inp4)
    }
    const [inp5, setInp5]= useState(false);

    const setInpu5 = ()=>{
        setInp5(!inp5)
    }
    const [inp6, setInp6]= useState(false);

    const setInpu6 = ()=>{
        setInp6(!inp6)
    }
    const [inp7, setInp7]= useState(false);

    const setInpu7 = ()=>{
        setInp7(!inp7)
    }

    const setAllInp=()=>{
        setInp1(false);
        setInp2(false);
        setInp3(false);
        setInp4(false);
        setInp5(false);
        setInp6(false);
        setInp7(false);
    }

    const [localFilters, setLocalFilters] = useState<CarUpdated>();

    useEffect(() => {
        const createCarFilter = (): CarUpdated => {
            const updatedFilters: CarUpdated = {
                carId: carId,
                modelId: (selectedModel !== null && !isNaN(Number(selectedModel))) ? Number(selectedModel) : (props.car.carModel.carModelId ?? 0),
                classId: (selectedCarClass !== null && !isNaN(Number(selectedCarClass))) ? Number(selectedCarClass) : (props.car.carClass.carClassId ?? 0),
                filialId:(selectedFilial !== null && !isNaN(Number(selectedFilial))) ? Number(selectedFilial) : (props.car.filial.filialId ?? 0),

                year: (year !== null && !isNaN(Number(year))) ? Number(year) : (props.car.year ?? 0),
                gearBox:  selectedTransmission === 0 ? GearBoxEnum["Автоматическая"] :
                    selectedTransmission === 1 ? GearBoxEnum["Механическая"] :
                    (props.car.gearBox ?? 0),
                costDay: (costDay !== null && !isNaN(Number(costDay))) ? Number(costDay) : (props.car.costDay ?? 0),
                fileName: (imageUrl !== null)? imageUrl : props.car.carImage,
                //file: image // Вы должны обработать изображение здесь
            };
    
            setLocalFilters(updatedFilters);
    
            return updatedFilters;
        };
    
        const filters = createCarFilter();
        setLocalFilters(filters);
    }, [selectedModel, selectedBrand, selectedCarClass, selectedFilial, year, selectedTransmission, costDay, image,]);
    
  const handleSave = async () => {
    try {
      if (localFilters) {
        await CarService.updateCar(localFilters)};
        alert("Ваша машина отредактирована");
        handleClose();
    } catch (error) {
        console.error('Ошибка создания автомобиля:', error);
      }
        };
  

  return (
    <div className={styles.popupBox} style={{ display: isOpen ? "block" : "none" }}>
      <div className={styles.box}>
        <div className={styles.popupClose}><span className={styles.popupCloseIcon} onClick={handleClose}>x</span></div>
        <p className={styles.popupTitle}>Редактор автомобиля</p>
        <div className={styles.addBlock}>
                    <form className={styles.addForm}>
                        <div className={styles.blockImg} onClick={handleImageClick}>
                            <div className={styles.imgSpace}>
                                {image ? <img className={styles.img}
                                // src={URL.createObjectURL(image)}
                                 />:<img className={styles.spaceIcon} src={`data:image/png;base64,${car.image}`}
                    alt={`${car.carModel.modelName}`}></img>}
                            </div>
                            <div className={styles.itemInp}>
                             <input type="file" accept=".png" id="Image" 
                            //  defaultValue={image}
                              className={styles.inputImg} ref={inputRef} onChange={handleImageChange} /> 
                             <label htmlFor="Image" >Загрузить изображение</label>
                            </div>
                        </div>
                        <div className={styles.blockInfo}>
                             <div className={styles.infoItem}>
                                <label className={styles.itemName}>Марка:</label>
                                 <div className={styles.itemInp}>
                                 {!inp1&&<p className={styles.itemInpu} onClick={setInpu1}>{car.carModel.carBrand.name}</p>}
                                 {inp1&&<select  className={styles.itemInput}
                                    onChange={handleBrandChange}>
                                    <option></option>
                                    {brands && brands.map((brand) => (
                                        <option key={brand.carBrandId} value={brand.carBrandId}>{brand.name}</option>
                                    ))}</select>}
                        </div>
                            </div> 
                            <div className={styles.infoItem}>
                                <label className={styles.itemName}>Модель:</label>
                                <div className={styles.itemInp}>
                                {!inp2&&<p className={styles.itemInpu} onClick={setInpu2}>{car.carModel.modelName}</p>}
                                {inp2&&(
                                <select className={styles.itemInput} onChange={handleModelChange}>
                                <option></option>
                                {models &&
                                    models
                                    .filter((model) => model.carBrand.carBrandId === Number(selectedBrand))
                                    .map((model) => (
                                        <option key={model.carModelId} value={model.carModelId}>
                                        {model.modelName}
                                        </option>
                                    ))}</select>)}
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <label className={styles.itemName}>Год выпуска:</label>
                                <div className={styles.itemInp}>
                                {!inp3&&<p className={styles.itemInpu} onClick={setInpu3}>{car.year}</p>}
                                {inp3 && <input className={styles.itemInput} type="number" min="1980" max="2024" onChange={handleYearChange}  />}
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <label className={styles.itemName}>Тип КПП:</label>
                                <div className={styles.itemInp}>
                                {!inp4&&<p className={styles.itemInpu} onClick={setInpu4}>{GearBoxEnum[car.gearBox]}</p>}
                                {inp4&&<select className={styles.itemInput} onChange={handleTransmissionChange}>
                                    <option></option>
                                    <option value={1}>Механическая</option>
                                    <option value={2}>Автоматическая</option>
                                </select>}
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <label className={styles.itemName}>Тип кузова:</label>
                                <div className={styles.itemInp}>
                                {!inp5&&<p className={styles.itemInpu} onClick={setInpu5}>{car.carClass.className}</p>}
                                {inp5&&<select className={styles.itemInput} onChange={handleClassChange}>
                                    <option></option>
                                {classes && classes.map((classModel) => (
                                    <option key={classModel.carClassId} value={classModel.carClassId}>{classModel.className}</option>
                                ))}</select>}
                            </div>
                            </div>
                            <div className={styles.infoItem}>
                                <label className={styles.itemName}>Цена аренды в сутки:</label>
                                <div className={styles.itemInp}>
                                {!inp6&&<p className={styles.itemInpu} onClick={setInpu6}>{car.costDay}</p>}
                                {inp6&&<input type="text"  className={styles.itemInputPrice} autoComplete="off" onChange={handleCost}/>}
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <label className={styles.itemName}>Филиал:</label>
                                <div className={styles.itemInp}>
                                {!inp7&&<p className={styles.itemInpu} onClick={setInpu7}>{car.filial.address}</p>}
                                {inp7&&<select className={styles.itemInput} onChangeCapture={handleFilialChange}>
                                        <option></option>
                                    {filials&& filials.map((filial) => (
                                        <option key={filial.filialId} className={styles.listItem} value={filial.filialId}>{filial.address}</option>
                                    ))}</select>}
                                    </div>
                            </div>
                            <div className={styles.infoButtons}>
                                <input className={styles.buttonCancel} type="button" onClick={resFields} value="Отмена"></input>
                                <input onClick={handleSave} type="button" className={styles.buttonSave}
                                       value="Сохранить"></input>
                            </div>
                        </div>
                    </form>
                </div>
      </div>
    </div>
  );
};

export default EditCarPopup;