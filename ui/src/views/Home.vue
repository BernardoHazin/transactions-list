<template>
  <div class="home">
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
import { Ref } from 'vue'
import Transaction from '@/types/transaction'

export default {
  setup (): { result: Ref<Transaction[]>, loading: Ref<boolean> } {
    const { result, loading } = useQuery(gql`
      query getUsers {
        transactions {
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
    `)

    return { result, loading }
  }
}
</script>
