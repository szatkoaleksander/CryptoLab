<template>
  <div>
    <b-nav vertical>
      <b-nav-item active>
        <router-link tag="li" to="/app/dashboard">Dashboard</router-link>
      </b-nav-item>
      <b-nav-item v-b-toggle.collapse3 hide>
        <div style="color: #2060ea;">Exchange</div>
      </b-nav-item>
      <b-collapse  id="collapse3" style="margin-left: 25px;">
        <b-nav-item v-bind:key="wallet.id" v-for="wallet in userWallets">
          <router-link tag="li" :to="{ name: 'Market', params: { currency: wallet.currency } }">{{wallet.currency}}</router-link>
        </b-nav-item>
      </b-collapse>
      <b-nav-item active>
        <router-link tag="li" to="/app/history">History</router-link>
      </b-nav-item>
      <b-nav-item active>
        <router-link tag="li" to="/app/About">About</router-link>
      </b-nav-item>
    </b-nav>
  </div>
</template>

<script>
import Wallet from '@/components/Wallet.vue'
import Dashboard from '@/views/Dashboard.vue'
import Market from '@/views/Market.vue'
import { FETCH_WALLETS } from '@/stores/actions.type'
import { mapGetters } from 'vuex'

export default {
  name: 'Menu',
  components: {
    Dashboard,
    Market,
    Wallet,
  },
  computed: {
    ...mapGetters([
      'userWallets'
    ])
  },
  beforeMount: async function () {
    this.$store.dispatch(FETCH_WALLETS)
  },
}
</script>
