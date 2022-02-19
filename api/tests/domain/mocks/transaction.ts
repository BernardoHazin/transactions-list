import { Transaction } from "@/domain/entities";
import { v4 as uuidv4 } from "uuid";

export const makeTransactionMock = (
  attributes?: Partial<Transaction>
): Transaction & { updatedAt: Date } => {
  return {
    id: uuidv4(),
    account: "account",
    description: "some description",
    category: "some category",
    reference: "reference",
    currency: "USD",
    amount: 100,
    status: "BOOKED",
    transactionDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...(attributes || {}),
  };
};
