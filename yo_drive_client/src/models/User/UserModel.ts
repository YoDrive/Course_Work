export interface UserModel
{
    userId: number;
    firstName: string;
    surname: string;
    patronymic: string;
    phoneNumber: string;
    email: string;
    userImage?: string;
    image?: File;
}
export interface UserUpdatePhotoModel
{
    userId: number;
    image?: File;
}