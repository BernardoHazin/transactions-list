import { Transaction } from "@/domain/entities";

export interface GetTransactionDetails {
  handle: (
    params: GetTransactionDetails.Params
  ) => Promise<GetTransactionDetails.Result>;
}

export namespace GetTransactionDetails {
  export type Params = {
    transactionId: string;
  };

  export type Result = Transaction | null;
}
