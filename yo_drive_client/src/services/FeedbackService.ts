import {AxiosResponse, AxiosRequestConfig} from "axios/index";
import axiosInstance from "../instance";
import {FeedbackModel} from "../models/Feedback/FeedbackModel";

interface FeedbackData {
    rentId: number;
    response: string;
    stars: number;
    feedbackDate: Date;
  }

export default class FeedbackService {
    static async getCarFeedback(carId: number): Promise<AxiosResponse<FeedbackModel[]>> {
        return axiosInstance.get<FeedbackModel[]>(`/api/feedback/getCarFeedbacks/${carId}`);
    }
    static async createFeedback(data: FeedbackData, config?: AxiosRequestConfig): Promise<AxiosResponse<FeedbackModel>> {
        try {
          const response = await axiosInstance.post<FeedbackModel>('/api/feedback/createFeedback', data, config);
    
          return response;
        } catch (error) {
          throw error; 
        }
      }
}

