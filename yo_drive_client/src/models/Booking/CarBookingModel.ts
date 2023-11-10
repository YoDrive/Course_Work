export interface CarBookingModel {
    carId: number;
    carModel: CarModel;
    carClass: CarClass;
    filial: Filial;
    isDeleted: boolean;
    year: number;
    stateNumber: string;
    gearBox: GearBoxEnum;
    costDay: string;
    carImage?: string;
}

export enum GearBoxEnum {
    "Автоматическая" = 0,
    "Механическая" = 1
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
    //isDeleted: boolean;
}