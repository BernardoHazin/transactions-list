import { transformTransaction as transform } from "@/infra/db/helpers/prisma";
import { GetTransactionDetailsRepository } from "@/data/protocols";
import { PrismaClient } from "@prisma/client";

export default class PrismaGetTransactionDetailsRepository
  implements GetTransactionDetailsRepository
{
  constructor(private readonly client: PrismaClient) {}

  async execute(transactionId: string) {
    const details = await this.client.transaction.findFirst({
      where: {
        id: transactionId,
      },
    });

    return details ? transform(details) : null;
  }
}
