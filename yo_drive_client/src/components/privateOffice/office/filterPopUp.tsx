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
    const {
        register,
        handleSubmit,
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit=(data:any) =>{
        console.log(data)
    }

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
            <option key={index} className={styles.listItem} value={filial.address}></option>
        ))
        : null;

    const modelsView = models
        ? models.map((model, index) => (
            <option key={index} className={styles.listItem} value={model.modelName}></option>
        ))
        : null;

    const brandsView = brands
        ? brands.map((brand, index) => (
            <option key={index} className={styles.listItem} value={brand.name}></option>
        ))
        : null;

    const classesView = classes
        ? classes.map((classModel, index) => (
            <option key={index} className={styles.listItem} value={classModel.className}></option>
        ))
        : null;

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
                            {brandsView}
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
                            {modelsView}
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
                            {classesView}
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
                            {filialsView}
                        </datalist>
                        </label>
                    </div>
                </div>
            </form>
            <button className={styles.formButton} onClick={handleSubmit(onSubmit)} type="submit">Поиск
            </button>
    </div>
);}