import { ListTransactions } from "@/domain/usecases";
import { DbListTransactions } from "@/data/usecases";
import { PrismaListTransactionsRepository } from "@/infra/db/prisma";
import prisma from "@/main/prisma";

export const makeListTransactionUsecase = (): ListTransactions => {
  const repository = new PrismaListTransactionsRepository(prisma);
  return new DbListTransactions(repository);
};
