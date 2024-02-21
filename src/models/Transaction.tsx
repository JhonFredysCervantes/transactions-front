export interface Transaction {
    id: string;
    name: string;
    status: string;
    amount: number;
    createdAt: string;
  }
  
export interface TransactionsWithCheck extends Transaction {
    checked: boolean;
  }