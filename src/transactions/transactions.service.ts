import { v4 as uuid } from "uuid";
import connection from '../db/config'
import { Transaction, BaseTransaction, Type, Entry, Reciever } from "./transaction.interface";
// import { Users } from "./users.interface";

export const findAll = async (): Promise<any> => {
    const transactions = await connection('transactions').select("*")
    return transactions;
};

export const findById = async (id: string): Promise<any> => {
    const transaction = await connection('transactions').where('id', id)
    return transaction;
};

export const findByUserId = async (id: string): Promise<any> => {
    const transactions = await connection('transactions').where('user_id', id)
    return transactions;
};

export const fund = async (newTransaction: BaseTransaction): Promise<Transaction> => {
    const id = uuid();
    const funding = {
        ...newTransaction,
        id,
    };
    const user = await connection('users').where('id', funding.sender_id)
    if (!user) {
        throw new Error('No sender with this id!');
    }
    const userBalance = user[0].balance
    
    if (funding.amount < 1000){
        throw new Error('miminum amout is 1000');
    }
    funding.user_id = funding.sender_id
    funding.entry = Entry.credit;
    funding.type = Type.fund;
    funding.fee = 0 // 0 fee on funding wallet

    const now = new Date()
    funding.created_at = now;
    funding.updated_at = now;

    const newUserBalance = userBalance + funding.amount
    await connection('users').where('id', funding.user_id).update('balance', newUserBalance)

    await connection('transactions').insert(funding);

    
    return funding;
};

export const send = async (newTransaction: BaseTransaction): Promise<Transaction> => {
    const id = uuid();
    const senderTransaction = {
        ...newTransaction,
        id,
    };
    const sender = await connection('users').where('id', senderTransaction.sender_id)
    if (!sender) {
        throw new Error('No sender with this id!');
    }
    const senderBalance = sender[0].balance
    if(senderBalance < (senderTransaction.amount + senderTransaction.fee)){
        throw new Error('Insufficient Fund!');
    }

    const receiver = await connection('users').where('id', senderTransaction.receiver_id)
    if (!receiver) {
        throw new Error('No receiver with this id!');
    }
    const receiverBalance = receiver[0].balance
    
    if (senderTransaction.amount < 1000){
        throw new Error('miminum amout is 1000');
    }

    const now = new Date()
    senderTransaction.created_at = now;
    senderTransaction.updated_at = now;
    senderTransaction.fee = 5;
    senderTransaction.user_id = senderTransaction.sender_id
    senderTransaction.entry = Entry.debit;
    senderTransaction.type = Type.send;

    const newBalance = senderBalance - (senderTransaction.amount + senderTransaction.fee)
    await connection('users').where('id',senderTransaction.user_id).update('balance', newBalance)

    await connection('transactions').insert(senderTransaction);

    const receiver_transaction_id = uuid()
    const receiverTransaction : Reciever = {
        id: receiver_transaction_id,
        user_id : senderTransaction.receiver_id,
        entry: Entry.credit,
        type: Type.receive,
        amount: senderTransaction.amount,
        fee: 0,
        sender_id: senderTransaction.sender_id,
        receiver_id: senderTransaction.receiver_id,
        created_at: now,
        updated_at: now
    }

    const newReceiverBalance = receiverBalance + senderTransaction.amount
    await connection('users').where('id',senderTransaction.receiver_id).update('balance', newReceiverBalance)
    
    await connection('transactions').insert(receiverTransaction);

    return senderTransaction;
};

export const withdraw = async (newTransaction: BaseTransaction): Promise<Transaction> => {
    const id = uuid();
    const withdrawal = {
        ...newTransaction,
        id,
    };
    const user = await connection('users').where('id', withdrawal.sender_id)
    if (!user) {
        throw new Error('No sender with this id!');
    }
    const userBalance = user[0].balance

    if(userBalance < withdrawal.amount) {
        throw new Error('Insufficient fund!')   
    }
    
    if (withdrawal.amount < 1000){
        throw new Error('miminum amout is 1000');
    }

    withdrawal.user_id = withdrawal.sender_id
    withdrawal.entry = Entry.debit;
    withdrawal.type = Type.withdraw;
    withdrawal.fee = 0 //0 fee on withdrawal

    const newUserBalance = userBalance - withdrawal.amount
    await connection('users').where('id', withdrawal.user_id).update('balance', newUserBalance)

    await connection('transactions').insert(withdrawal);

    return withdrawal;
};