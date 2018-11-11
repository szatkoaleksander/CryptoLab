<template>
  <div>
    <ul id="example-1">
      <li v-bind:key="item.id" v-for="item in userWallets">
        {{ item.currency }} - {{ item.amountOfMoney }}
      </li>
    </ul>
  </div>
</template>

<script>
import { FETCH_WALLETS } from '@/stores/actions.type'
import { mapGetters } from 'vuex'

export default {
  name: 'Wallet',
  data () {
    return {
    }
  },
  created () {
    this.$store.dispatch(FETCH_WALLETS)
  },
  computed: {
    ...mapGetters([
      'userWallets'
    ])
  }
}
</script>
