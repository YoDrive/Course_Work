export interface CarBookingModel {
    carId: number;
    carModel: CarModel;
    carClass: CarClass;
    filial: Filial;
    year: number;
    feedbackCount: number;
    gearBox: GearBoxEnum;
    costDay: string;
    carImage?: string;
    rating: number;
}

export enum GearBoxEnum {
    "Автоматическая" = 0,
    "Механическая" = 1
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