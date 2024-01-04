export interface UserModel
{
    userId: number;
    firstName: string;
    surname: number;
    patronymic: number;
    phoneNumber: string;
    email: string;
    userImage?: string;
    image?: Uint8Array | null;
}