import { PrismaListTransactionsRepository } from "@/infra/db/prisma";
import { makeTransactionMock } from "@/tests/domain/mocks";
import { Transaction } from "@/domain/entities";

import prisma from "@/main/prisma";

const createRepository = () => {
  return new PrismaListTransactionsRepository(prisma);
};

describe("Infra | DB | Prisma | List transactions repository", function () {
  let transactions: Transaction[] = [];
  const repository = createRepository();

  beforeAll(async () => {
    await prisma.$connect();

    transactions = [
      makeTransactionMock({
        id: "1",
        transactionDate: new Date(2020, 1, 15),
        amount: 100,
      }),
      makeTransactionMock({
        id: "2",
        transactionDate: new Date(2020, 1, 20),
        amount: 200,
      }),
      makeTransactionMock({
        id: "3",
        transactionDate: new Date(2020, 2, 10),
        amount: 300,
      }),
    ];

    await prisma.transaction.createMany({
      data: transactions,
    });

    console.log("✨ 2 transactions successfully created!");
  });

  afterAll(async () => {
    const deleteTransactions = prisma.transaction.deleteMany();

    await prisma.$transaction([deleteTransactions]);

    console.log("✨ transactions successfully removed!");

    await prisma.$disconnect();
  });

  test("Should return a list of transactions from database", async () => {
    const result = await repository.execute();

    expect(result).toStrictEqual(transactions);
  });

  test("Should return a filtered list of transactions based on start and end dates", async () => {
    const result = await repository.execute({
      from: new Date(2020, 1, 1),
      to: new Date(2020, 2, 1),
    });

    expect(result).toStrictEqual(transactions.slice(0, 2));
  });
});
