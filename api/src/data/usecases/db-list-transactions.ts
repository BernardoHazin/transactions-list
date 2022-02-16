import { ListTransactions } from "@/domain/usecases";
import { ListTransactionsRepository } from "@/data/protocols";

export default class DbListTransaction implements ListTransactions {
  constructor(
    private readonly listTransactionsRepository: ListTransactionsRepository
  ) {}

  async handle({ from, to }: ListTransactions.Params) {
    return this.listTransactionsRepository.execute({ from, to });
  }
}
