import { transformTransaction as transform } from "@/infra/db/helpers/prisma";
import { ListTransactionsRepository } from "@/data/protocols/";
import { PrismaClient } from "@prisma/client";

export class PrismaListTransactionsRepository
  implements ListTransactionsRepository
{
  constructor(private readonly client: PrismaClient) {}

  async execute(params?: ListTransactionsRepository.Params) {
    const transactions = await this.client.transaction.findMany({
      where: {
        transactionDate: {
          gte: params?.from,
          lt: params?.to,
        },
      },
    });

    return transactions.map(transform);
  }
}
