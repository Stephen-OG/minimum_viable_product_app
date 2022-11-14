export interface BaseTransaction {
    amount: number ;
    fee: number ;
    type: Type;
    entry: Entry;
    user_id: string;
    sender_id: string;
    receiver_id: string;
    created_at: Date;
    updated_at: Date;
  };

  export interface Reciever {
    id: string;
    amount: number ;
    fee: number ;
    type: Type;
    entry: Entry;
    user_id: string;
    sender_id: string;
    receiver_id: string;
    created_at: Date;
    updated_at: Date;
  };

export interface Transaction extends BaseTransaction {
    id: string;
  };

export enum Type {
    send = "send",
    withdraw ="withdraw",
    receive = "receive",
    fund = "fund"
  }

export enum Entry {
    credit = "credit",
    debit = "debit"
  }