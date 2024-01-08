import {AxiosResponse, AxiosRequestConfig} from "axios/index";
import axiosInstance from "../instance";
import {FeedbackModel, FeedbackUpdateModel} from "../models/Feedback/FeedbackModel";

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
      static async updateFeedback(data: FeedbackUpdateModel, config?: AxiosRequestConfig): Promise<AxiosResponse<FeedbackUpdateModel>> {
        try {
          const response = await axiosInstance.put<FeedbackUpdateModel>('/api/feedback/updateFeedback', data, config);
    
          return response;
        } catch (error) {
          throw error; 
        }
      }
}

