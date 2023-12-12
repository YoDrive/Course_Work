import {AxiosResponse} from "axios/index";
import axiosInstance from "../instance";
import {FeedbackModel} from "../models/Feedback/FeedbackModel";

export default class FeedbackService {
    static async getCarFeedback(carId: number): Promise<AxiosResponse<FeedbackModel[]>> {
        return axiosInstance.get<FeedbackModel[]>(`/api/feedback/getAllCarFeedback/${carId}`);
    }
}