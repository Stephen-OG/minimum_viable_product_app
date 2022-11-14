import {Transaction} from "./transaction.interface"

export interface Transactions {
    [key: number]: Transaction;
  }