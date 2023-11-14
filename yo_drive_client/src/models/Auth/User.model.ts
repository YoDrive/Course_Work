export interface User {
    email: string;
    password: string;
}

export interface UserAuth {
    userId: number;
    email: string;
    roleId: number;
    roleName: string;
}