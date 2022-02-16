import { GetTransactionDetails } from "@/domain/usecases";
import { GetTransactionDetailsRepository } from "@/data/protocols";

export class DbGetTransactionDetails implements GetTransactionDetails {
  constructor(
    private readonly getTransactionDetailsRepository: GetTransactionDetailsRepository
  ) {}

  async handle({ transactionId }: GetTransactionDetails.Params) {
    return this.getTransactionDetailsRepository.execute(transactionId);
  }
}
