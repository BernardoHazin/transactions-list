import { Transaction } from "@/domain/entities";
import { Transaction as TransactionModel } from "@prisma/client";

export const transformTransaction = (
  transaction: TransactionModel
): Transaction => ({
  ...transaction,
  amount: transaction.amount.toNumber(),
});
