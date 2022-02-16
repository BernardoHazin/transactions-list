import { makeGetTransactionDetailsUsecase } from "@/main/factories";
import { GetTransactionDetailsController } from "@/presentation/controllers";

export const makeGetTransactionDetailsController = () => {
  const usecase = makeGetTransactionDetailsUsecase();
  return new GetTransactionDetailsController(usecase);
};
