import { GetTransactionDetails } from "@/domain/usecases";

export interface GetTransactionDetailsRepository {
  execute: (transactionId: string) => Promise<GetTransactionDetails.Result>;
}
