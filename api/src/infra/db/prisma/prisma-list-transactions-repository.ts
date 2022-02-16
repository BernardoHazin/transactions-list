import { ListTransactionsRepository } from "@/data/protocols/";
import { PrismaClient } from "@prisma/client";

export default class KnexListTransactionsRepository
  implements ListTransactionsRepository
{
  constructor(private readonly client: PrismaClient) {}

  async execute({ from, to }: ListTransactionsRepository.Params) {
    const transactions = await this.client.transaction.findMany({
      where: {
        transactionDate: {
          gte: from,
          lt: to,
        },
      },
    });

    return transactions.map((transaction) => ({
      ...transaction,
      amount: transaction.amount.toNumber(),
    }));
  }
}
