<template>
  <div>
    <div v-if="this.crypto_info['FLAGS'] == 1">
      <h5 style="color: green">Price - {{this.crypto_info['PRICE']}}</h5>
    </div>
    <div v-if="this.crypto_info['FLAGS'] == 2">
      <h5 style="color: red">Price - {{this.crypto_info['PRICE']}}</h5>
    </div>
    <div v-if="this.crypto_info['FLAGS'] == 4">
      <h5 style="color: black">Price - {{this.crypto_info['PRICE']}}</h5>
    </div>

    <h6>24h Change:{{this.crypto_info['CHANGE24HOUR']}}<br>{{this.crypto_info['CHANGE24HOURPCT']}}<br></h6>
		<h6>Open Hour:{{this.crypto_info['OPENHOUR']}}<br></h6>
		<h6>High Hour:{{this.crypto_info['HIGHHOUR']}}<br></h6>
		<h6>Low Hour:{{this.crypto_info['LOWHOUR']}}<br></h6>
		<h6>Open Day:{{this.crypto_info['OPEN24HOUR']}}<br></h6>
		<h6>High Day:{{this.crypto_info['HIGH24HOUR']}}<br></h6>
		<h6>Low Day:{{this.crypto_info['LOW24HOUR']}}<br></h6>
		<h6>Last Trade Volume To:{{this.crypto_info['LASTVOLUMETO']}}<br></h6>
		<h6>24h VolumeTo:{{this.crypto_info['VOLUME24HOURTO']}}<br></h6>
  </div>
</template>

<script>
import { FETCH_CRYPTO_PRICE } from '@/stores/actions.type'
import { mapGetters } from 'vuex'
import CC_ws from '@/common/cryptocompare_ws.service'

export default {
  name: 'CryptoInfoPanel',
  props: {
    currency: String,
  },
  computed: {
    ...mapGetters([
      'crypto_info'
    ]),
  },
  mounted: async function() {
    CC_ws.subscription(this.currency)
    this.$store.dispatch(FETCH_CRYPTO_PRICE, {
      currency: this.currency
    })
  },
  destroyed: async function() {
    CC_ws.unsubscription()
  },
}
</script>
