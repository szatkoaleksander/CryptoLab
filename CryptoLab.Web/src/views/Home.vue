<template>
  <div style="background-color: #eef2ed;">
    <Navbar/>

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
              <b-nav-item v-bind:key="wallet.Id" v-for="wallet in userWallets">
                <router-link tag="li" :to="{ name: 'Market', params: { currency: wallet.currency } }">{{wallet.currency}}</router-link>
              </b-nav-item>
            </b-collapse>
          </b-nav>
        </b-col>
        <b-col> <!-- col-8 if do not work -->
          <router-view></router-view>
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
import Navbar from '@/components/Navbar.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    Dashboard,
    Market,
    Wallet,
    Navbar
  },

  computed: {
    ...mapGetters([
      'isAuthenticated',
      'userWallets'
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
