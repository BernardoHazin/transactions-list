import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { Ref } from '@vue/reactivity'

export const GET_TRANSACTION_DETAILS = gql`
  query getTransactionDetails($transactionId: ID!) {
    transaction(transactionId: $transactionId) {
      id
      account
      description
      category
      reference
      currency
      amount
      status
      transactionDate
      createdAt
    }
  }
`

export const queryDetails = (transactionId: Ref<string | string[]>) => {
  return useQuery(GET_TRANSACTION_DETAILS, { transactionId })
}
