import { PrismaListTransactionsRepository } from "@/infra/db/prisma";
import { makeTransactionMock } from "@/tests/domain/mocks";
import { Transaction } from "@/domain/entities";
import prisma from "@/main/prisma";

const createRepository = () => {
  return new PrismaListTransactionsRepository(prisma);
};

describe("Infra | DB | Prisma | List transactions repository", function () {
  const repository = createRepository();
  const transactions: Transaction[] = [
    makeTransactionMock({
      transactionDate: new Date(2020, 1, 15),
      amount: 100,
    }),
    makeTransactionMock({
      transactionDate: new Date(2020, 1, 20),
      amount: 200,
    }),
    makeTransactionMock({
      transactionDate: new Date(2020, 2, 10),
      amount: 300,
    }),
  ];

  beforeAll(async () => {
    await prisma.transaction.createMany({
      data: transactions,
    });
  });

  afterAll(async () => {
    await prisma.transaction.deleteMany({});

    await prisma.$disconnect();
  });

  test("Should return a list of transactions from database", async () => {
    const result = await repository.execute();
    result.sort((a, b) => (a.transactionDate > b.transactionDate ? 1 : -1));

    expect(result).toStrictEqual(transactions);
  });

  test("Should return a filtered list of transactions based on start and end dates", async () => {
    const result = await repository.execute({
      from: new Date(2020, 1, 1),
      to: new Date(2020, 2, 1),
    });

    result.sort((a, b) => (a.transactionDate > b.transactionDate ? 1 : -1));

    expect(result).toStrictEqual(transactions.slice(0, 2));
  });
});
