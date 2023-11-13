import {User, UserAuth} from "./User.model";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: UserAuth;
}