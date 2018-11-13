<template>
  <div>
    <br/>
    <b-container fluid>
      <b-row class="shadow p-3 mb-3 bg-white rounded">
        <b-col>
          <TradingView :currency="this.currency" :key="$route.fullPath"/>
        </b-col>
      </b-row>
      <FastTransaction :currency="this.currency"/>
      <HistoryMarket :currency="this.currency" :transactionType="1" :key="$route.fullPath"/>
    </b-container>
  </div>
</template>

<script>
import TradingView from '@/components/TradingView.vue'
import HistoryMarket from '@/components/HistoryMarket.vue'
import FastTransaction from '@/components/FastTransaction.vue'

export default {
  name: 'Market',
  data: function() {
    return {
      currency: this.$route.params.currency 
    }
  },
  components: {
    TradingView,
    HistoryMarket,
    FastTransaction
  },
  beforeRouteUpdate(to, from, next) {
    this.currency = to.params.currency
    next()
  }
}
</script>
