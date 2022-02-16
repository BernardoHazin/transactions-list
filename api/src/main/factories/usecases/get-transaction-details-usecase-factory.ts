import { GetTransactionDetails } from "@/domain/usecases";
import { DbGetTransactionDetails } from "@/data/usecases";
import { PrismaGetTransactionDetailsRepository } from "@/infra/db/prisma";
import prisma from "@/main/prisma";

export const makeGetTransactionDetailsUsecase = (): GetTransactionDetails => {
  const repository = new PrismaGetTransactionDetailsRepository(prisma);
  return new DbGetTransactionDetails(repository);
};
