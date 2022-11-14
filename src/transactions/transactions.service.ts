import { v4 as uuid } from "uuid";
import { db } from "../db/config";
import connection from '../db/types'
import { Transaction, BaseTransaction } from "./transaction.interface";
// import { Users } from "./users.interface";

export const findAll = async (): Promise<any> => {
    const transactions = await connection('transactions').select("*")
    return transactions;
};

export const findById = async (id: string): Promise<any> => {
    const user = await connection('transactions').where('id', id)
    return user;
};

export const send = async (newItem: BaseTransaction): Promise<Transaction> => {
    const id = uuid();
    const createdTransaction = {
        ...newItem,
        id,
    };
    await connection('transactions').insert(createdTransaction);
    return createdTransaction;
};

export const create = async (newItem: BaseTransaction): Promise<Transaction> => {
    const id = uuid();
    const createdUser = {
        ...newItem,
        id,
    };
    await connection('transactions').insert(createdUser);
    return createdUser;
};

export const update = async (
    id: string,
    userUpdate: BaseTransaction
  ): Promise<any | null> => {
    const user = await connection('transactions').where('id',id).update(userUpdate)
    return user;
  };
  

export const remove = async (id: string): Promise<any> => {
    const deleteUser = await connection('transactions').where('id',id).delete()
    return deleteUser;
};