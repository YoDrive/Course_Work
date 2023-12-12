import { GearBoxEnum } from "./../CarModel";
import {Filter} from "./FilterBookingModel";

export interface BookingPage {
    page: Page;
    filter: Filter;
    sort?: Sort;
}

export interface CarResponsePage {
    count: number;
    items: CarViewModel[];
}

export interface Page {
    pageNumber?: number;
    pageSize: number;
}

export interface Sort {
    dir: string;
    field: string;
}

export interface CarViewModel {
    carId: number;
    carModel: CarModel;
    carClass: CarClass;
    filial: Filial;
    year: number;
    feedbackCount: number;
    gearBox: GearBoxEnum;
    costDay: string;
    carImage?: string;
    image?: Uint8Array | null;
    rating: number;
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