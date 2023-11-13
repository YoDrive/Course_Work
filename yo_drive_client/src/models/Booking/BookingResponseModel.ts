import {CarBookingModel} from "./CarBookingModel";

export interface BookingResponseModel {
    rentId: number;
    user: UserModel;
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
    rent: BookingResponseModel;
    response: string;
    stars: number;
    feedbackDate: Date;
}