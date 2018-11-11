<template>
  <div style="background-color: #eef2ed;">
    <b-navbar toggleable type="light" variant="light">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">
        <router-link to="/app">CryptoLab</router-link>
      </b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto" left>
          <b-nav-text href="#">
            #test1
          </b-nav-text>
          <b-nav-text href="#">
            #test2
          </b-nav-text>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" right>
          <b-nav-text>
            #test3
          </b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container fluid>
      <b-row>
        <b-col class="shadow p-2 bg-white rounded" style="background-color: #eef2ed;" sm="2">
          <br />
          <b-nav vertical>
            <b-nav-item active>
              <router-link tag="li" to="/app/dashboard">Dashboard</router-link>
            </b-nav-item>
            <b-nav-item v-b-toggle.collapse3 hide>
              <div style="color: #2060ea;">Exchange</div>
            </b-nav-item>
            <b-collapse visible id="collapse3" style="margin-left: 25px;">
              <b-nav-item>
                <router-link tag="li" :to="{ name: 'Market', params: { currency: 'btc' } }">BTC</router-link>
              </b-nav-item>
              <b-nav-item>
                <router-link tag="li" :to="{ path: '/app/market/ltc' }">LTC</router-link>
              </b-nav-item>
              <b-nav-item>
                <router-link tag="li" :to="{ path: '/app/market/eth' }">ETH</router-link>
              </b-nav-item>
            </b-collapse>
          </b-nav>
        </b-col>
        <b-col> <!-- col-8 if do not work -->
          <router-view></router-view>
        </b-col>
        <b-col class="shadow p-2 bg-white rounded" style="background-color: #eef2ed;" sm="2">
          Ranking
        </b-col>
      </b-row>
      <b-row class="shadow-lg p-4 rounded" style="color: #777777;">
        ©copyright by Aleksander Szatko
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Dashboard from '@/views/Dashboard.vue'
import Market from '@/views/Market.vue'
import Wallet from '@/components/Wallet.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    Dashboard,
    Market,
    Wallet
  },

  computed: {
    ...mapGetters([
      'isAuthenticated'
    ])
  }
}
</script>

<style>
.astext {
  background:none;
  border:none;
  margin:0;
  padding:0;
  cursor: pointer;
}
</style>

<style scoped>
li {
  color: #2060ea;
}
li a:hover { 
  background-color: #89C4F4;
}
</style>