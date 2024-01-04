export interface UserModel
{
    userId: number;
    firstName: string;
    surname: string;
    patronymic: string;
    phoneNumber: string;
    email: string;
    userImage?: string;
    image?: Uint8Array | null;
}