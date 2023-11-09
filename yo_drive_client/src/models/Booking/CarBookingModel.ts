export interface CarBookingModel {
    carId: number;
    carModel: CarModel;
    carClass: CarClass;
    filial: Filial;
    isDeleted: boolean;
    year: number;
    stateNumber: string;
    gearbox: GearBoxEnum;
    costDay: string;
    img?: string;
}

export enum GearBoxEnum {
    "Автоматическая",
    "Механическая"
}

export interface CarModel {
    carModelId: number;
    carBrand: CarBrand;
    modelName: string;
    isDeleted: boolean;
}

export interface CarClass {
    carClassId: number;
    className: string;
    isDeleted: boolean;
}

export interface CarBrand {
    carBrandId: number;
    name: string;
    isDeleted: boolean;
}

export interface Filial {
    filialId: number;
    address: string;
    phoneNumber: string;
    isDeleted: boolean;
}