import { Status, Category } from "./";

export interface Transaction {
  id: string;
  account: string;
  description: string;
  category: Category;
  reference: string;
  currency: number;
  amount: number;
  status: Status;
  transactionDate: Date;
  createdAt: Date;
}
