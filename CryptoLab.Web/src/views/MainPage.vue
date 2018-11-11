<template>
  <div class="text-center">
    <br /><br /><br /><br />
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <h1 class="cover-heading">CryptoLab</h1>
      <p class="lead">Make money & have fun</p>
        <Login/> 
        <h4>/</h4> 
        <Register/>
    </div>   
  </div>
</template>

<script>
import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'

export default {
  name: 'MainPage',
  components: {
    Login,
    Register
  }
}
</script>

<style>
a,
a:focus,
a:hover {
  color: #fff;
}
.btn-secondary,
.btn-secondary:hover,
.btn-secondary:focus {
  color: #333;
  text-shadow: none; 
  background-color: #fff;
  border: .05rem solid #fff;
}
</style>
