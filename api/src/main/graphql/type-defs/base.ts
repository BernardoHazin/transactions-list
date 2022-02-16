import { gql } from "apollo-server";

export default gql`
  scalar Date

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;
