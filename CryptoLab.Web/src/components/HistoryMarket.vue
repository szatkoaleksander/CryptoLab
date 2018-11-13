<template>
  <div>
    <b-row>
      <b-col class="shadow p-3 bg-white rounded">
        <b-table :small="true" hover striped :items="marketHistoriesBuy" :fields="fields" caption-top>
          <template slot="table-caption">
            PURCHASE
          </template>
        </b-table>
      </b-col>
      <b-col class="shadow p-3 bg-white rounded">
        <b-table :small="true" hover striped :items="marketHistoriesSell" :fields="fields" caption-top>
          <template slot="table-caption">
            SALE
          </template>
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { FETCH_MARKET_HISTORIES_BUY, FETCH_MARKET_HISTORIES_SELL } from '@/stores/actions.type'
import { mapGetters } from 'vuex'

export default {
  name: 'HistoryMarket',
  props: {
    currency: String,
    transactionType: Number
  },
  data () {
    return {
      fields: [
        { key: 'currency' },
        { key: 'amountOfMoney' },
        { key: 'price' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'marketHistoriesBuy',
      'marketHistoriesSell'
    ])
  },
  beforeMount: async function () {
    this.$store.dispatch(FETCH_MARKET_HISTORIES_BUY, { currency: this.currency, transactionType: this.transactionType })
    this.$store.dispatch(FETCH_MARKET_HISTORIES_SELL, { currency: this.currency, transactionType: this.transactionType })
  }
}
</script>
