<template>
  <div>
    <h1>Dashboard - component</h1>
    <Wallet/>
  </div>
</template>

<script>
import Wallet from '@/components/Wallet.vue'

export default {
  name: 'Dashboard',
  components: {
    Wallet
  }
}
</script>
