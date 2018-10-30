<template>
  <div v-if="isAuthenticated">
      <h1>Dashboard</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'isAuthenticated'
    ])
  }
}
</script>
