import { v4 as uuid } from "uuid";
import connection from '../db/config'
import { User, BaseUser } from "./user.interface";
import { Users } from "./users.interface";

export const create = async (newUser: BaseUser): Promise<User> => {
    const id = uuid();
    const createdUser = {
        ...newUser,
        id,
    };
    //on create the user's balance is 0
    const now = new Date()
    createdUser.created_at = now;
    createdUser.updated_at = now;
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