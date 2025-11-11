import { ObjectId } from "mongodb"

export interface UserModel{

    _id: ObjectId | null
    name: string;
    user: string;
    email: string;
    lastEmail: string;
    birthday: Date;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date | null;
    isActive: boolean;
   
}

