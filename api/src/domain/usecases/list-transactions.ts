import { Transaction } from "@/domain/entities";

export interface ListTransactions {
  handle: (params: ListTransactions.Params) => Promise<Transaction[]>;
}

export namespace ListTransactions {
  export type Params = {
    from: Date;
    to: Date;
  };
}
