<template>
  <div>
    <b-form v-on:submit.prevent="buy(amountOfMoney)">
      <b-form-group id="exampleInputGroup1"
        label="Buy coin:"
        label-for="exampleInput1">
        <b-form-input size="sm" id="exampleInput1"
          v-model="amountOfMoney"
          required
          placeholder="value">
        </b-form-input>
      </b-form-group>
      <b-button size="sm" class="float-right" type="submit" variant="primary">Buy</b-button>
    </b-form>
  </div>
</template>

<script>
import { FAST_BUY_TRANSACTION } from '@/stores/actions.type'

export default {
  name: 'Wallet',
  props: {
    currency: String
  },
  data () {
    return {
      amountOfMoney: 0
    }
  },
  methods: {
    buy(amountOfMoney) {
      this.$store
        .dispatch(FAST_BUY_TRANSACTION, { currency: this.currency, amountOfMoney })
    }
  }
}
</script>
