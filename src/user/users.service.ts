import { v4 as uuid } from "uuid";
import { db } from "../db/config";
import connection from '../db/types'
import { User, BaseUser } from "./user.interface";
import { Users } from "./users.interface";

export const create = async (newUser: BaseUser): Promise<User> => {
    const id = uuid();
    const createdUser = {
        ...newUser,
        id,
    };
    await connection('users').insert(createdUser);
    return createdUser;
};

export const findAll = async (): Promise<any> => {
    const users = await connection('users').select("*")
    return users;
};

export const findById = async (id: string): Promise<any> => {
    const user = await connection('users').where('id', id)
    return user;
};

export const update = async (
    id: string,
    userUpdate: BaseUser
  ): Promise<any> => {
    const user = await connection('users').where('id',id).update(userUpdate)
    return user;
  };

export const remove = async (id: string): Promise<any> => {
    const deleteUser = await connection('users').where('id',id).delete()
    return deleteUser;
};