import { Transaction } from "@/domain/entities";

export const makeTransactionMock = (
  attributes?: Partial<Transaction>
): Transaction => {
  return {
    id: "1",
    account: "account",
    description: "some description",
    category: "some category",
    reference: "reference",
    currency: "USD",
    amount: 100,
    status: "BOOKED",
    transactionDate: new Date(),
    createdAt: new Date(),
    ...(attributes || {}),
  };
};
