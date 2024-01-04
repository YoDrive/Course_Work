import {AxiosResponse} from "axios";
import axiosInstance from "../instance";
import {DashboardModel} from "../models/Dashboard/DashboardModels";

export default class StatisticService {
    static async GetStatistic(): Promise<AxiosResponse<DashboardModel>> {
        return axiosInstance.get<DashboardModel>(`/api/Statistic/GetStatistic`);
    }
}