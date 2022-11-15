import { v4 as uuid } from "uuid";
import connection from '../db/config'
import { User, BaseUser } from "./user.interface";
import bcrypt from 'bcrypt';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { SECRET_KEY } from "../middleware/auth";

export const create = async (newUser: BaseUser): Promise<User> => {
    const id = uuid();
    const user = {
        ...newUser,
        id,
    };
    
    user.balance = 0 //on create the user's balance is 0
    const now = new Date()
    user.created_at = now;
    user.updated_at = now;
    user.password = await bcrypt.hash(user.password, 8)
    await connection('users').insert(user);
    return user;
};

export const signIn = async (email: string, password: string): Promise<any> => {
    const user = await connection('users').where('email', email)
    if(!user[0]){
        throw new Error('no user found')
    }
    const isMatch = bcrypt.compareSync(password, user[0].password);
    if (isMatch) {
    const token = jwt.sign({ email: email }, SECRET_KEY, {
        expiresIn: '2 days',
        });
        return {user: {email}, token: token}
    } else {
        throw new Error('Password is not correct');
    }
};

export const findAll = async (): Promise<any> => {
    const users = await connection('users').select("*")
    return users;
};

export const findById = async (id: string): Promise<any> => {
    const user = await connection('users').where('id', id)
    if(!user[0]){
        throw new Error('user not found')
    }
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
    await connection('users').where('id',id).delete()
    return id;
};