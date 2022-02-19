import { Transaction } from "@/domain/entities";

export interface ListTransactionsRepository {
  execute: (
    params?: ListTransactionsRepository.Params
  ) => Promise<ListTransactionsRepository.Result>;
}

export namespace ListTransactionsRepository {
  export type Params = {
    from: Date;
    to: Date;
  };

  export type Result = Transaction[];
}
