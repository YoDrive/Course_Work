export interface UsersModel {
    value: number;
    percent: number;
}

export interface BookingsModel {
    value: number;
    percent: number;
}

export interface RevenueModel {
    value: number;
    percent: number;
}

export interface MonthRevenueModel {
    labels: string[];
    data: number[];
}

export interface DashboardModel {
    usersModel: UsersModel;
    bookingsModel: BookingsModel;
    revenueModel: RevenueModel;
    monthRevenueModel: MonthRevenueModel
}