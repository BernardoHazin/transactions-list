import { Transaction } from "@/domain/entities";

export interface GetTransactionDetailsRepository {
  execute: (
    transactionId: string
  ) => Promise<GetTransactionDetailsRepository.Result>;
}

export namespace GetTransactionDetailsRepository {
  export type Result = Transaction;
}
