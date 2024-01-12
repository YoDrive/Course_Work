export interface FeedbackModel {
    userName: string;
    feedbackId: number;
    rentId: number;
    response: string;
    stars: number;
    feedbackDate: Date;
}
export interface FeedbackUpdateModel {
    FeedbackId: number;
    Response?: string;
    Stars?: number|null;
}