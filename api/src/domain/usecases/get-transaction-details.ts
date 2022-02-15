import { Transaction } from "@/domain/entities";

export interface GetTransactionDetails {
  handle: (params: GetTransactionDetails.Params) => Promise<Transaction>;
}

export namespace GetTransactionDetails {
  export type Params = {
    transactionId: string;
  };
}
