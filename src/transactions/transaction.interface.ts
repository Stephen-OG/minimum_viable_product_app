export interface BaseTransaction {
    amount: string | null;
    fee: string | null;
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

enum Type {
    send = "send",
    withdraw ="withdraw",
    recieve = "recieve"
  }

enum Entry {
    credit = "credit",
    debit = "debit"
  }