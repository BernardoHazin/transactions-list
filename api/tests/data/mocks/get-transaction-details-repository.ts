import { GetTransactionDetailsRepository } from "@/data/protocols";
import { makeTransactionMock } from "@/tests/domain/mocks";
import { Transaction } from "@/domain/entities";

export class GetTransactionDetailsRepositoryMock
  implements GetTransactionDetailsRepository
{
  payload: Transaction = makeTransactionMock();

  async execute() {
    return this.payload;
  }

  setPayload(payload: Transaction) {
    this.payload = payload;
  }
}
