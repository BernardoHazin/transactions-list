<template>
  <div class="details">
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <div v-else>
      <table>
        <caption>Transactions Details</caption>
        <tbody>
          <tr>
            <td>ID</td>
            <td>{{result.transaction.id}}</td>
          </tr>
          <tr>
            <td>ACCOUNT</td>
            <td>{{result.transaction.account}}</td>
          </tr>
          <tr>
            <td>REFERENCE</td>
            <td>{{result.transaction.reference}}</td>
          </tr>
          <tr>
            <td>CATEGORY</td>
            <td>{{result.transaction.category}}</td>
          </tr>
          <tr>
            <td>DESCRIPTION</td>
            <td>{{result.transaction.description}}</td>
          </tr>
          <tr>
            <td>CURRENCY</td>
            <td>{{result.transaction.currency}}</td>
          </tr>
          <tr>
            <td>AMOUNT</td>
            <td>{{result.transaction.amount}}</td>
          </tr>
          <tr>
            <td>STATUS</td>
            <td>{{result.transaction.status}}</td>
          </tr>
          <tr>
            <td>TRANSACTION DATE</td>
            <td>{{result.transaction.transactionDate}}</td>
          </tr>
          <tr>
            <td>CREATED AT</td>
            <td>{{result.transaction.createdAt}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { useRoute } from 'vue-router'
import { Ref, ref } from 'vue'
import Transaction from '@/types/transaction'
import { queryDetails } from '@/graphQL/queries'

export default {
  setup (): { result: Ref<Transaction>, loading: Ref<boolean> } {
    const { id } = useRoute().params
    const transactionId = ref(id)
    const { result, loading } = queryDetails(transactionId)

    return { result, loading }
  }
}
</script>
