import { GetTransactionDetails } from "@/domain/usecases";
import { makeTransactionMock } from "@/tests/domain/mocks";
import { Transaction } from "@/domain/entities";

export class GetTransactionDetailsMock implements GetTransactionDetails {
  payload: Transaction | null = makeTransactionMock();

  async handle() {
    return this.payload;
  }

  setPayload(payload: Transaction | null) {
    this.payload = payload;
  }
}
