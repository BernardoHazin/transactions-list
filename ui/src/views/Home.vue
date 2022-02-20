<template>
  <div class="home">
    <form id="filters" @submit.prevent="() => refetch({ from, to })">
      <label>
        Start date
        <input v-model="from" name="start-date" type="date" />
      </label>
      <label>
        End date
        <input v-model="to" name="end-date" type="date" />
      </label>
    </form>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      <table>
        <caption>Transactions List</caption>
        <thead>
          <tr>
            <th>ID</th>
            <th>ACCOUNT</th>
            <th>REFERENCE</th>
            <th>CATEGORY</th>
            <th>DESCRIPTION</th>
            <th>CURRENCY</th>
            <th>AMOUNT</th>
            <th>STATUS</th>
            <th>TRANSACTION DATE</th>
            <th>CREATED AT</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in result.transactions" :key="transaction.id">
            <td>
              <router-link :to="{ name: 'Details', params: { id: transaction.id } }">
                {{transaction.id}}
              </router-link>
            </td>
            <td>{{transaction.account}}</td>
            <td>{{transaction.reference}}</td>
            <td>{{transaction.category}}</td>
            <td>{{transaction.description}}</td>
            <td>{{transaction.currency}}</td>
            <td>{{transaction.amount}}</td>
            <td>{{transaction.status}}</td>
            <td>{{transaction.transactionDate}}</td>
            <td>{{transaction.createdAt}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { ref, Ref } from 'vue'
import { ApolloQueryResult } from '@apollo/client/core'
import Transaction from '@/types/transaction'

const fetchTransactions = (from: Ref<Date | undefined>, to: Ref<Date | undefined>) => {
  return useQuery(gql`
    query getTransactions($to: Date, $from: Date) {
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
  `, { from, to })
}

export default {
  setup (): {
    result: Ref<Transaction[]>,
    loading: Ref<boolean>,
    refetch: any,
    from: Ref<Date | undefined>,
    to: Ref<Date | undefined>
    } {
    const from = ref<Date>()
    const to = ref<Date>()
    const { result, loading, refetch } = fetchTransactions(from, to)

    return { result, loading, from, to, refetch }
  }
}
</script>
