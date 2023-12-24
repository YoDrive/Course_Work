import styles from './prewiev.module.css'
import rewiev from '../../../assets/rewiev.svg'
import trash from '../../../assets/trash.svg'
import React, {useEffect, useState, useRef} from "react";
import {CarBrand, CarViewModel} from "../../../models/Booking/CarBookingModel";
import CarService, {fetchCars, getCarBrands} from "../../../services/CarService";
import {Rating} from "react-simple-star-rating";
import {GearBoxEnum} from "../../../models/CarModel";
import emptyImageCar from '../../../assets/emptyImageCar.png';
import EditCarPopup from "./editCarPopUp"
import { useForm} from "react-hook-form"
import { CarAdd } from '../../../models/Add/Add.model';
import space from "../../../assets/space.svg"
import { Select , SelectProps} from 'antd';
const options: SelectProps[] =[];

const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };

export function Prewiev(){
    const [brands, setBrands]= useState<CarBrand[]|undefined>([]);
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
    const {
        register,
        handleSubmit,
        resetField,
        formState: {errors}
    } = useForm<CarAdd>({
    });
    const [openCarId, setOpenCarId] = useState<number | null>(null);
    const togglePopup = (carId: number) => {
        if (openCarId === carId) {
          setOpenCarId(null);
        } else {
          setOpenCarId(carId);
        }
      }
    const resFields = ()=>{
        resetField("carImage");
        resetField("carModel.carBrand.name");
        resetField("carModel.modelName");
        resetField("year");
        resetField("gearBox");
        resetField("carClass");
        resetField("costDay");
        resetField("filial");
        setAllInp();
    }

    const onSubmit = (data: CarAdd) =>{
        console.log(data);
        setAllInp();
       // alert("*: поле не заполнено\n **: поле заполнено неправильно")
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
                    <form className={styles.addForm} onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.blockImg} onClick={handleImageClick}>
                            <div className={styles.imgSpace}>
                                {image ? <img src={URL.createObjectURL(image)} style={{width: "100%", height:"100%", objectFit:"contain"}} />:<img className={styles.spaceIcon} src={`data:image/png;base64,${car.image}`} style={{width: "100%", height:"100%", objectFit:"contain",margin:"auto"}}
                    alt={`${car.carModel.modelName}`}></img>}
                            </div>
                            <div className={styles.itemInp}>
                                {/* <input type="file" accept=".jpg,.jpeg,.png" id="Image" className={styles.inputImg} {
                                        ...register("carImage"
                                        // ,{
                                        //     required:"*"
                                        // }
                                        )} ref={inputRef} onChange={handleImageChange} /> */}

                                <label htmlFor="Image" className={styles.imgItem}>Загрузить изображение</label>
                                {/* <div  className={styles.error}>
                                    {errors?.carImage && <p className={styles.itemError}>{errors?.carImage.message}</p>}
                                </div> */}
                            </div>
                        </div>
                        <div className={styles.blockInfo}>
                             <div className={styles.infoItem}>
                                <label className={styles.itemName} >Марка:</label>
                                 <div className={styles.itemInp}>
                                 {!inp1&&<p className={styles.itemInpu} onClick={setInpu1}>{car.carModel.carBrand.name}</p>}
                                 {inp1&&<Select
                                    size={"middle"}
                                    defaultValue=""
                                    onChange={handleChange}
                                    style={{ width: 256 }}
                                    options={options}
                                    />}
                                <datalist className={styles.inputList} id="carBrand">
                                    <option className={styles.listItem} value="Mercedes-Benz">Mercedes-Benz</option>
                                    <option className={styles.listItem} value="BMW">BMW</option>
                                </datalist>
                                <div className={styles.error}>
                                    {errors?.carModel?.carBrand?.name && <p className={styles.itemError}>{errors?.carModel?.carBrand.name.message}</p>}
                                </div>
                                </div>
                            </div> 
                            <div className={styles.infoItem}>
                                <label className={styles.itemName}>Модель:</label>
                                <div className={styles.itemInp}>
                                {!inp2&&<p className={styles.itemInpu} onClick={setInpu2}>{car.carModel.modelName}</p>}
                                {inp2 &&<input type="text" list="carModel" className={styles.itemInput}  {
                                    ...register("carModel.modelName")
                                }
                                />}
                                <datalist className={styles.inputList} id="carModel">
                                    <option className={styles.listItem} value="G63 AMG">G63 AMG</option>
                                    <option className={styles.listItem} value="X5">X5</option>
                                </datalist>
                                <div className={styles.error}>
                                    {errors?.carModel?.modelName && <p className={styles.itemError}>{errors?.carModel?.modelName.message}</p>}
                                </div>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <label className={styles.itemName}>Год выпуска:</label>
                                <div className={styles.itemInp}>
                                {!inp3&&<p className={styles.itemInpu} onClick={setInpu3}>{car.year}</p>}
                                {inp3 &&<input type="text" list="carYear" className={styles.itemInput}   {
                                    ...register("year",{
                                        pattern:{
                                            value: /^(195[1-9]|19[6-9]\d|20[0-1]\d|202[0-4])$/i,
                                            message: "**"
                                        }
                                    })
                                }
                                />}
                                <datalist className={styles.inputList} id="carYear">
                                    <option className={styles.listItem} value="2020">2020</option>
                                    <option className={styles.listItem} value="2023">2023</option>
                                </datalist>
                                <div className={styles.error}>
                                    {errors?.year && <p className={styles.itemError}>{errors?.year.message}</p>}
                                </div>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <label className={styles.itemName}>Тип КПП:</label>
                                <div className={styles.itemInp}>
                                {!inp4&&<p className={styles.itemInpu} onClick={setInpu4}>{GearBoxEnum[car.gearBox]}</p>}
                                {inp4&&<input type="text" list="carGear" className={styles.itemInput}  {
                                    ...register("gearBox",{
                                        pattern:{
                                            value:/^(МКПП|АКПП)$/,
                                            message:"**"
                                        }
                                    })
                                }
                                />}
                                <datalist className={styles.inputList} id="carGear">
                                    <option className={styles.listItem} value="АКПП">АКПП</option>
                                    <option className={styles.listItem} value="МКПП">МКПП</option>
                                </datalist>
                                <div className={styles.error}>
                                    {errors?.gearBox && <p className={styles.itemError}>{errors?.gearBox.message}</p>}
                                </div>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <label className={styles.itemName}>Тип кузова:</label>
                                <div className={styles.itemInp}>
                                {!inp5&&<p className={styles.itemInpu} onClick={setInpu5}>{car.carClass.className}</p>}
                                {inp5&&<input type="text" list="carClass" className={styles.itemInput} {
                                    ...register("carClass")
                                }
                                />}
                                <div className={styles.error}>
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
                                {!inp6&&<p className={styles.itemInpu} onClick={setInpu6}>{car.costDay}</p>}
                                {inp6&&<input type="text" list="carPrice" className={styles.itemInputPrice}  {
                                    ...register("costDay",{
                                        pattern:{
                                            value:/^\d+$/,
                                            message:"**"
                                        }
                                    })
                                }
                                />}
                                <div className={styles.error}>
                                    {errors?.costDay && <p className={styles.itemError}>{errors?.costDay.message}</p>}
                                </div>
                                </div>
                            </div>
                            <div className={styles.infoItem}>
                                <label className={styles.itemName}>Филиал:</label>
                                <div className={styles.itemInp}>
                                {!inp7&&<p className={styles.itemInpu} onClick={setInpu7}>{car.filial.address}</p>}
                                {inp7&&<input type="text" list="filialId" className={styles.itemInput}  {
                                    ...register("filial")
                                }
                                />}
                                <div className={styles.error}>
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