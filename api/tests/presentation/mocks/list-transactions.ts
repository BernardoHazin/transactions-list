import { ListTransactions } from "@/domain/usecases";
import { Transaction } from "@/domain/entities";

export class ListTransactionsMock implements ListTransactions {
  payload: Transaction[] = [];

  async handle() {
    return this.payload;
  }

  setPayload(payload: Transaction[]) {
    this.payload = payload;
  }
}
