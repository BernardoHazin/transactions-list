import { ListTransactionsRepository } from "@/data/protocols";

export class ListTransactionsRepositoryMock
  implements ListTransactionsRepository
{
  payload: ListTransactionsRepository.Result = [];

  async execute() {
    return [];
  }

  setPayload(payload: ListTransactionsRepository.Result) {
    this.payload = payload;
  }
}
