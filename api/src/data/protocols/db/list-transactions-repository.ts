import { ListTransactions } from "@/domain/usecases";
import { Transaction } from "@/domain/entities";

export interface ListTransactionsRepository {
  execute: (
    params: ListTransactionsRepository.Params
  ) => Promise<ListTransactionsRepository.Result>;
}

export namespace ListTransactionsRepository {
  export type Params = {
    filters: ListTransactions.Filters;
  };

  export type Result = Transaction[];
}
