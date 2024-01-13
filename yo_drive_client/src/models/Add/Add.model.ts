import { GearBoxEnum } from "../CarModel";
export interface CarAdd {
    ModelId: number;
    ClassId: number;
    FilialId: number;
    Year: number;
    GearBox: GearBoxEnum;
    CostDay: number;
    CarImage?: string;
    Image?: File| undefined;
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