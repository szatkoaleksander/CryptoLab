<template>
  <b-container fluid>
      <b-row>
        <b-col cols="12" sm="12" md="12" lg class="shadow p-3 mb-3 bg-white rounded mr-3">
          <TradingView :currency="this.currency"/>
        </b-col>
        <b-col lg="3" class="shadow p-3 mb-3 bg-white rounded ">
          <CryptoInfoPanel :currency="this.currency"/>
        </b-col>
      </b-row>
      <FastTransaction :currency="this.currency"/>
      <HistoryMarket :currency="this.currency"/>
  </b-container>
</template>

<script>
import TradingView from '@/components/TradingView.vue'
import HistoryMarket from '@/components/HistoryMarket.vue'
import FastTransaction from '@/components/FastTransaction.vue'
import CryptoInfoPanel from '@/components/CryptoInfoPanel.vue'

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
    FastTransaction,
    CryptoInfoPanel
  },
  beforeRouteUpdate(to, from, next) {
    this.currency = to.params.currency
    next()
  }
}
</script>
