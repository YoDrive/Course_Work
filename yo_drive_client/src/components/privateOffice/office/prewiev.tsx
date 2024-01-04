import styles from './prewiev.module.css'
import rewiev from '../../../assets/rewiev.svg'
import trash from '../../../assets/trash.svg'
import React, {useEffect, useState, useRef} from "react";
import {CarBrand, CarViewModel, CarModel, CarClass, Filial} from "../../../models/Booking/CarBookingModel";
import CarService, {fetchCars, getCarBrands, getCarModels, getCarClasses, getCarFilials} from "../../../services/CarService";
import {Rating} from "react-simple-star-rating";
import {GearBoxEnum} from "../../../models/CarModel";
import emptyImageCar from '../../../assets/emptyImageCar.png';
import EditCarPopup from "./editCarPopUp"
import { CarAdd } from '../../../models/Add/Add.model';
import { Select , SelectProps, DatePicker, Input} from 'antd';


export function Prewiev(){
    const [carModels, setCarModels] = useState<CarModel[]| undefined>([]);
    const [selectedBrand, setSelectedBrand] = useState<number | undefined>(undefined);
    const [selectedModel, setSelectedModel] = useState<number | undefined>(undefined);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTransmission, setSelectedTransmission] = useState('');
    const [selectedCost, setSelectedCost] = useState(0);
    const [selectedCarFilial, setSelectedCarFilial] = useState('');
    const [carClasses, setCarClass] = useState<CarClass[]| undefined>([]);
    const [carFilials, setCarFilials] = useState<Filial[]| undefined>([]);

    const handleFilialChange = (value:any) => {
        setSelectedCarFilial(value);
      }; 
      const handleCostChange = (value:any) => {
        setSelectedCost(value);
      }; 
    const handleTransmissionChange = (value:any) => {
      setSelectedTransmission(value);
    }; 

    const [selectedCarClass, setSelectedCarClass] = useState('');

    const handleCarClassChange = (value:any) => {
        setSelectedCarClass(value);
    };
    const transmissionOptions = [
        { value: 'АКПП', label: 'Автоматическая' },
        { value: 'МКПП', label: 'Механическая' },
      ];
  
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
  
    const handleBrandChange = (value: number) => {
      setSelectedBrand(value);
      setSelectedModel(undefined);
    };
  
    const handleModelChange = (value: number) => {
      setSelectedModel(value);
    };
    const handleDateChange = (date: any) => {
        setSelectedDate(date);
      };
    const [brands, setBrands]= useState<CarBrand[]|undefined>([]);
    const [options, setOptions] = useState<SelectProps[]>([]);
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
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [image, setImage] = useState()

    const handleImageClick = () =>{
        inputRef.current?.focus();
    }
    const handleImageChange = (event:any) =>{
        const file = event.target.files[0];
        setImage(file);
    }
    const [openCarId, setOpenCarId] = useState<number | null>(null);
    const togglePopup = (carId: number) => {
        if (openCarId === carId) {
          setOpenCarId(null);
        } else {
          setOpenCarId(carId);
        }
      }
    const resFields = ()=>{
        setAllInp();
    }

    const onSubmit = (data: CarAdd) =>{
        console.log(data);
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
        if (brands) {
          const brandOptions = brands.map((brand) => ({
            value: brand?.carBrandId?? '', 
            label: brand?.name ?? '',
          }));
      
          setOptions(brandOptions);
        }
      }, [brands]);
    
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
    const handleDelete = async (carId: number) => {
        try {
            const response = await CarService.DeleteCar(carId);
            if (response) {
                const carsData = await fetchCars();
                setCars(carsData);
            }
        } catch (error) {
            alert('Ошибка сервера.');
        }
    };

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
    const handleSubmit = () => {
        // Создаем объект с данными для отправки
        const formData = {
          carBrandId: selectedBrand,
          carModelId: selectedModel,
          year: selectedDate,
          GearBox: selectedTransmission,
          carClassId: selectedCarClass,
          carCost: selectedCost,
          carFilialId: selectedCarFilial
        };
        console.log(formData)
    }    

    let listItems = cars?.map((car) =>
        <li key={car.carId} className={styles.carBlock}>
            {car.image && (
                <img
                    src={`data:image/png;base64,${car.image}`}
                    alt={`${car.carModel.modelName}`}
                    className={styles.carImg}
                />
            )}
            {!car.image && <img src={emptyImageCar} className={styles.carImg}/>}
            <div className={styles.carInfo}>
                <div className={styles.infoHeader}>
                    <p className={styles.headerText}>{car.carModel.carBrand.name + ' ' + car.carModel.modelName}</p>
                </div>
                <div className={styles.infoText}>
                    <div className={styles.infoRewiev}>
                        <div className={styles.carStars}>
                            <Rating size={18} readonly initialValue={car.rating} allowFraction fillColor="#CCB746" emptyColor="#D9D9D9" SVGstrokeColor="#CCB746" SVGstorkeWidth={1}/>
                            <p className={styles.carStarsNumber}>{car.rating}</p>
                        </div>
                        <p className={styles.rewievQuantity}>{car.feedbackCount} отзывов</p>
                    </div>
                    <p className={styles.infoYear}>{car.year} года выпуска</p>
                    <p className={styles.infoGearbox}>{GearBoxEnum[car.gearBox]} коробка передач</p>
                    <p className={styles.infoType}>Тип кузова: {car.carClass.className}</p>
                    <p className={styles.infoPrice}>{car.costDay}₽/сутки</p>
                </div>
            </div>
            <div className={styles.carTools}>
            <img className={styles.toolEdit} src={rewiev} onClick={()=>togglePopup(car.carId)}></img>
                <EditCarPopup car={car} isOpen={openCarId === car.carId} handleClose={() => togglePopup(car.carId)}  content={
                    <div className={styles.addBlock}>
                    <form className={styles.addForm}>
                        <div className={styles.blockImg} onClick={handleImageClick}>
                            <div className={styles.imgSpace}>
                                {image ? <img src={URL.createObjectURL(image)} style={{width: "100%", height:"100%", objectFit:"contain"}} />:<img className={styles.spaceIcon} src={`data:image/png;base64,${car.image}`} style={{width: "100%", height:"100%", objectFit:"contain",margin:"auto"}}
                    alt={`${car.carModel.modelName}`}></img>}
                            </div>
                            <div className={styles.itemInp}>
                             <input type="file" accept=".jpg,.jpeg,.png" id="Image" defaultValue={image} className={styles.inputImg} ref={inputRef} onChange={handleImageChange} /> 

                                <label htmlFor="Image" className={styles.imgItem}>Загрузить изображение</label>
                            </div>
                        </div>
                        <div className={styles.blockInfo}>
                             <div className={styles.infoItem}>
                                <label className={styles.itemName} >Марка:</label>
                                 <div className={styles.itemInp}>
                                 {!inp1&&<p className={styles.itemInpu} onClick={setInpu1}>{car.carModel.carBrand.name}</p>}
                                 {inp1&&<Select
                                    size={"small"}
                                    defaultValue={selectedBrand}
                                    onChange={handleBrandChange}
                                    style={{ width: 256 , fontFamily: 'Montserrat'}}
                                    options={options}
                                    />}
                                </div>
                            </div> 
                            <div className={styles.infoItem}>
                                <label className={styles.itemName}>Модель:</label>
                                <div className={styles.itemInp}>
                                {!inp2&&<p className={styles.itemInpu} onClick={setInpu2}>{car.carModel.modelName}</p>}
                                {inp2&&(
                                <Select
                                    size="small"
                                    defaultValue={selectedModel}
                                    onChange={handleModelChange}
                                    style={{ marginLeft: '120px', width: 256,fontFamily: 'Montserrat' }}
                                >
                                     {carModels &&
                                    carModels
                                    .filter((model) => model.carBrand.carBrandId === selectedBrand)
                                    .map((model) => (
                                        <Select.Option key={model.carModelId} value={model.carModelId}>
                                        {model.modelName}
                                        </Select.Option>
                                    ))}
                                </Select>)}
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <label className={styles.itemName}>Год выпуска:</label>
                                <div className={styles.itemInp}>
                                {!inp3&&<p className={styles.itemInpu} onClick={setInpu3}>{car.year}</p>}
                                {inp3 && <DatePicker
                                    size="small"
                                    value={selectedDate}
                                    picker='year'
                                    onChange={handleDateChange}
                                    style={{ marginLeft: '10px', width: 256 ,fontFamily: 'Montserrat'}}
                                />}
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <label className={styles.itemName}>Тип КПП:</label>
                                <div className={styles.itemInp}>
                                {!inp4&&<p className={styles.itemInpu} onClick={setInpu4}>{GearBoxEnum[car.gearBox]}</p>}
                                {inp4&&<Select
                                    size="small"
                                    defaultValue={selectedTransmission}
                                    onChange={handleTransmissionChange}
                                    style={{ marginLeft: '10px', width: 256,fontFamily: 'Montserrat' }}
                                    >
                                    {transmissionOptions.map((option) => (
                                        <Select.Option key={option.value} value={option.value}>
                                        {option.label}
                                        </Select.Option>
                                    ))}
                                    </Select>}
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <label className={styles.itemName}>Тип кузова:</label>
                                <div className={styles.itemInp}>
                                {!inp5&&<p className={styles.itemInpu} onClick={setInpu5}>{car.carClass.className}</p>}
                                {inp5&&<Select
                                    size="small"
                                    defaultValue={selectedCarClass}
                                    onChange={handleCarClassChange}
                                    style={{ marginLeft: '10px', width: 256,fontFamily: 'Montserrat' }}
                                    >
                                    {carClasses && carClasses.map((option) => (
                                        <Select.Option key={option.carClassId} value={option.carClassId}>
                                        {option.className}
                                        </Select.Option>
                                    ))}
                                    </Select>}
                            </div>
                            </div>
                            <div className={styles.infoItem}>
                                <label className={styles.itemName}>Цена аренды в сутки:</label>
                                <div className={styles.itemInp}>
                                {!inp6&&<p className={styles.itemInpu} onClick={setInpu6}>{car.costDay}</p>}
                                {inp6&&<Input size="small" style={{ marginLeft: '10px', width: 256,fontFamily: 'Montserrat' }} 
                                onChange={handleCostChange}
                                defaultValue={selectedCost}></Input>}
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <label className={styles.itemName}>Филиал:</label>
                                <div className={styles.itemInp}>
                                {!inp7&&<p className={styles.itemInpu} onClick={setInpu7}>{car.filial.address}</p>}
                                {inp7&&<Select
                                    size="small"
                                    defaultValue={selectedCarFilial}
                                    onChange={handleFilialChange}
                                    style={{ marginLeft: '10px', width: 256,fontFamily: 'Montserrat' }}
                                    >
                                    {carFilials && carFilials.map((option) => (
                                        <Select.Option key={option.filialId} value={option.filialId}>
                                        {option.address}
                                        </Select.Option>
                                    ))}
                                    </Select>}
                                    </div>
                            </div>
                            <div className={styles.infoButtons}>
                                <input className={styles.buttonCancel} type="button" onClick={resFields} value="Отмена"></input>
                                <input onClick={handleSubmit} type="button" className={styles.buttonSave}
                                       value="Сохранить"></input>
                            </div>
                        </div>
                    </form>
                </div>
                }/>
                <img className={styles.toolDelete} src={trash} onClick={() => handleDelete(car.carId)}></img>
            </div>
        </li>
    );


    return(
        <div className={styles.prewievBlock}>
            <ul className={styles.carBlocks}>
                {listItems}
            </ul>
        </div>
    )
}