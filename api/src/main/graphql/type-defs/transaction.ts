import { gql } from "apollo-server";

export default gql`
  type Transaction {
    id: ID!
    account: String
    description: String
    category: String
    reference: String
    currency: String
    amount: Float
    status: String
    transactionDate: Date
    createdAt: Date
  }

  extend type Query {
    transactions(from: Date, to: Date): [Transaction]
    transaction(transactionId: ID!): Transaction
  }
`;
