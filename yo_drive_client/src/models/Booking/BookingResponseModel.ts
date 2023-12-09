import {CarBookingModel} from "./CarBookingModel";

export interface BookingResponseModel {
    rentId: number;
    userId: number;
    car: CarBookingModel;
    startDate: Date;
    endDate: Date;
    rentCost: number;
    feedback?: FeedbackModel;
}

export interface UserModel {
    firstName: string;
    surname: string;
    patronymic: string;
    phoneNumber: string;
    email: string;
}

export interface FeedbackModel {
    feedbackId: number;
    rentId: number;
    response: string;
    stars: number;
    feedbackDate: Date;
}