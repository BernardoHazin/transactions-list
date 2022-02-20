import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import { Ref } from '@vue/reactivity'

export const LIST_TRANSACTIONS = gql`
  query listTransactions($to: Date, $from: Date) {
    transactions(to: $to, from: $from) {
      id
      account
      reference
      category
      description
      currency
      amount
      status
      transactionDate
      createdAt
    }
  }
`

export const queryList = (from: Ref<Date | undefined>, to: Ref<Date | undefined>) => {
  return useQuery(LIST_TRANSACTIONS, { from, to })
}
