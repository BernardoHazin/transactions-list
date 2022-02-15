import { Transaction } from "@/domain/entities";

export interface ListTransactions {
  handle: (filters: ListTransactions.Filters) => Promise<Transaction[]>;
}

export namespace ListTransactions {
  export type Filters = Record<
    keyof Transaction,
    Transaction[keyof Transaction][]
  >;
}
