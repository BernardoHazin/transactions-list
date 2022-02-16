import { adaptResolver } from "@/main/adapters";
import {
  makeListTransactionController,
  makeGetTransactionDetailsController,
} from "@/main/factories";

export default {
  Query: {
    transactions: async (parent: any, args: any, context: any) => {
      const controller = makeListTransactionController();
      return adaptResolver(controller, args, context);
    },
    transaction: async (parent: any, args: any, context: any) => {
      const controller = makeGetTransactionDetailsController();
      return adaptResolver(controller, args, context);
    },
  },
};
