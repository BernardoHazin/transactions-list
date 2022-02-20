import { PrismaGetTransactionDetailsRepository } from "@/infra/db/prisma";
import { makeTransactionMock } from "@/tests/domain/mocks";
import { Transaction } from "@/domain/entities";
import prisma from "@/main/prisma";

const createRepository = () => {
  return new PrismaGetTransactionDetailsRepository(prisma);
};

describe("Infra | DB | Prisma | Get transaction details repository", function () {
  let transactions: Transaction[] = [];
  const repository = createRepository();

  beforeAll(async () => {
    await prisma.$connect();

    transactions = [makeTransactionMock(), makeTransactionMock()];

    await prisma.transaction.createMany({
      data: transactions,
    });
  });

  afterAll(async () => {
    await prisma.transaction.deleteMany({});
    await prisma.$disconnect();
  });

  test("Should return transaction details from database based on transaction id", async () => {
    const [transaction] = transactions;
    const result = await repository.execute(transaction.id);

    expect(result).toStrictEqual(transaction);
  });

  test("Should return null if transaction does not exists", async () => {
    const nonExistentId = "non-existent-id";
    const result = await repository.execute(nonExistentId);

    expect(result).toBeNull();
  });
});
