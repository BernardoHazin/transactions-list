import { makeListTransactionUsecase } from "@/main/factories";
import { ListTransactionsController } from "@/presentation/controllers";

export const makeListTransactionController = () => {
  const usecase = makeListTransactionUsecase();
  return new ListTransactionsController(usecase);
};
