import { GearBoxEnum } from "../CarModel";
export interface CarAdd {
    carModel: CarModel;
    carClass: CarClass;
    filial: Filial;
    year: number;
    gearBox: GearBoxEnum;
    costDay: string;
    carImage?: Object;
}

export interface CarModel {
    carModelId: number;
    carBrand: CarBrand;
    modelName: string;
}

export interface CarClass {
    carClassId: number;
    className: string;
}

export interface CarBrand {
    carBrandId: number;
    name: string;
}

export interface Filial {
    filialId: number;
    address: string;
    phoneNumber: string;
}