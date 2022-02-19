import { ListTransactions } from "@/domain/usecases";
import { ListTransactionsRepository } from "@/data/protocols";

export class DbListTransactions implements ListTransactions {
  constructor(
    private readonly listTransactionsRepository: ListTransactionsRepository
  ) {}

  async handle(params?: ListTransactions.Params) {
    return this.listTransactionsRepository.execute(params);
  }
}
