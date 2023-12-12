export interface FeedbackModel {
    userName: string;
    feedbackId: number;
    rentId: number;
    response: string;
    stars: number;
    feedbackDate: Date;
}