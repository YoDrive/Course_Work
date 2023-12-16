import {AxiosResponse} from "axios";
import axiosInstance from "../instance";
import {CarBrand, CarClass, CarModel, Filial} from "../models/Booking/CarBookingModel";

export default class FilterService {
    static async GetModels(): Promise<AxiosResponse<CarModel[]>> {
        return axiosInstance.get<CarModel[]>(`/api/carmodel/GetAllModels`);
    }

    static async GetClasses(): Promise<AxiosResponse<CarClass[]>> {
        return axiosInstance.get<CarClass[]>(`/api/carClass/GetClasses`);
    }

    static async GetBrands(): Promise<AxiosResponse<CarBrand[]>> {
        return axiosInstance.get<CarBrand[]>(`/api/carBrand/GetBrands`);
    }

    static async GetFilials(): Promise<AxiosResponse<Filial[]>> {
        return axiosInstance.get<Filial[]>(`/api/filial/GetFilials`);
    }
}