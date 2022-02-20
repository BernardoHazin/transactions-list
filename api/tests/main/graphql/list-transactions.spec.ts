import { setupApolloServer } from "@/main/graphql/apollo-server";
import { Server } from "http";
import { Transaction } from "@/domain/entities";
import { makeTransactionMock } from "@/tests/domain/mocks";
import request from "supertest";
import prisma from "@/main/prisma";

const query = {
  query: `
    query listTransactions {
      transactions {
        id
        amount
      }
    }
  `,
};

const queryWithFilters = (from: Date, to: Date) => ({
  query: `
    query Query($to: Date, $from: Date) {
      transactions(to: $to, from: $from) {
        id
        amount
      }
    }
  `,
  variables: {
    from: from.toISOString().substring(0, 10),
    to: to.toISOString().substring(0, 10),
  },
});

describe("Main | GraphQL | List transactions", () => {
  let server: Server, url: string;
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
    ({ server, url } = await setupApolloServer().listen({ port: 0 }));
    await prisma.transaction.createMany({
      data: transactions,
    });
  });

  afterAll(async () => {
    await server?.close();
    await prisma.transaction.deleteMany({});
  });

  it("Should return a list of transactions", async () => {
    const response = await request(url).post("/").send(query);
    const expectResponse = transactions
      .map((transaction) => ({
        id: transaction.id,
        amount: transaction.amount,
      }))
      .sort((a, b) => a.amount - b.amount);

    expect(response.body.data.transactions).toStrictEqual(expectResponse);
  });

  it("Should return a filtered list of transactions", async () => {
    const [from, to] = [new Date(2020, 1, 1), new Date(2020, 2, 1)];
    const response = await request(url)
      .post("/")
      .send(queryWithFilters(from, to));

    const expectResponse = transactions
      .slice(0, 2)
      .map((transaction) => ({
        id: transaction.id,
        amount: transaction.amount,
      }))
      .sort((a, b) => a.amount - b.amount);

    expect(response.body.data.transactions).toStrictEqual(expectResponse);
  });
});
