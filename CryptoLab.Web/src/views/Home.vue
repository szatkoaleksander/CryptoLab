<template>
  <div style="background-color: #eef2ed;">
    <Navbar/>
    <b-container fluid>
      <b-row>
        <b-col class="shadow p-3 bg-white rounded" style="background-color: #eef2ed" sm="2">
          <Menu/>
        </b-col>
        <b-col class="shadow p-3 #7cdeff">
          <router-view></router-view>
        </b-col>
      </b-row>
      <b-row class="shadow-lg p-4 rounded" style="color: #777777;">
        <Footer/>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Menu from '@/components/Menu.vue'
import Footer from '@/components/Footer.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    Navbar,
    Menu,
    Footer
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
