<template>
  <div>
    <b-row class="shadow p-3 mb-3 bg-white rounded">
      <b-col>
      <b-form v-on:submit.prevent="buy(amountOfMoneyToBuy)">
        <b-form-group id="exampleInputGroup1"
          label="Buy coin:"
          label-for="exampleInput1">
          <b-form-input size="sm" id="exampleInput1"
            v-model="amountOfMoneyToBuy"
            required
            placeholder="value">
          </b-form-input>
        </b-form-group>
        <b-button size="sm" class="float-right" type="submit" variant="primary">Buy</b-button>
      </b-form>
      </b-col>
      <b-col>
      <b-form v-on:submit.prevent="sell(amountOfMoneyToSell)">
        <b-form-group id="exampleInputGroup2"
          label="Sell coin:"
          label-for="exampleInput2">
          <b-form-input size="sm" id="exampleInput2"
            v-model="amountOfMoneyToSell"
            required
            placeholder="value">
          </b-form-input>
        </b-form-group>
        <b-button size="sm" class="float-right" type="submit" variant="primary">Sell</b-button>
      </b-form>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { FAST_BUY_TRANSACTION, FAST_SELL_TRANSACTION } from '@/stores/actions.type'

export default {
  name: 'Wallet',
  props: {
    currency: String
  },
  data () {
    return {
      amountOfMoneyToBuy: 0,
      amountOfMoneyToSell: 0
    }
  },
  methods: {
    buy (amountOfMoneyToBuy) {
      this.$store
        .dispatch(FAST_BUY_TRANSACTION, { currency: this.currency, amountOfMoneyToBuy })
    },
    sell (amountOfMoneyToSell) {
      this.$store
        .dispatch(FAST_SELL_TRANSACTION, { currency: this.currency, amountOfMoneyToSell })
    }
  }
}
</script>
