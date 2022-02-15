import { ListTransactions } from "@/domain/usecases";
import { ListTransactionsRepository } from "@/data/protocols";

export default class DbListTransaction implements ListTransactions {
  constructor(
    private readonly listTransactionsRepository: ListTransactionsRepository
  ) {}

  async handle(filters: ListTransactions.Filters) {
    return this.listTransactionsRepository.execute({ filters });
  }
}
