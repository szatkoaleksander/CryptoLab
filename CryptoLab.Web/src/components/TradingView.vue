<template>
  <div>
    <VueTradingView style="height: 350px;" v-bind:options="{
      autosize: true,
      symbol: this.symbol ,
      theme: 'light',
      interval: 'D',
      enable_publishing: true,
      allow_symbol_change: true,
      style: 2
      }"
    />
  </div>
</template>

<script>
import VueTradingView from 'vue-trading-view';

export default {
  name: 'TradingView',
  props: {
    currency: String
  },
  data () {
    return {
      symbol: 'BITFINEX:' + this.currency + 'USD'
    }
  },
  components: {
    VueTradingView,
  }
}
</script>
