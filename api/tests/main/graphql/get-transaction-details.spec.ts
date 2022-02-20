import { setupApolloServer } from "@/main/graphql/apollo-server";
import { Server } from "http";
import { Transaction } from "@/domain/entities";
import { makeTransactionMock } from "@/tests/domain/mocks";
import request from "supertest";
import prisma from "@/main/prisma";

const query = (transactionId: string) => ({
  query: `
    query Query($transactionId: ID!) {
      transaction(transactionId: $transactionId) {
        id
        amount
      }
    }
  `,
  variables: { transactionId },
});

describe("Main | GraphQL | Get transaction details", () => {
  let server: Server, url: string;
  const transaction: Transaction = makeTransactionMock({
    transactionDate: new Date(2020, 1, 15),
    amount: 100,
  });

  beforeAll(async () => {
    ({ server, url } = await setupApolloServer().listen({ port: 0 }));
    await prisma.transaction.create({
      data: transaction,
    });
  });

  afterAll(async () => {
    await server?.close();
    await prisma.transaction.deleteMany({});
  });

  it("Should return a transanction details", async () => {
    const response = await request(url).post("/").send(query(transaction.id));
    const expectResponse = {
      id: transaction.id,
      amount: transaction.amount,
    };

    expect(response.body.data.transaction).toStrictEqual(expectResponse);
  });

  it("Should return null if transaction don't exist", async () => {
    const response = await request(url).post("/").send(query("null"));

    expect(response.body.data.transaction).toBeNull();
  });
});
