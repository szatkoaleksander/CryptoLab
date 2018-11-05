<template>
  <div class="auth-page">
    <div class="container page">
      <b-btn v-b-modal.registerModal>Register</b-btn>
      <div class="text-left">
        <b-modal id="registerModal" title="Register" hide-footer>
          <b-form v-on:submit.prevent="onSubmit(email, username, password)">
            <b-form-group id="emailInputGroup1"
              label="Email address:"
              label-for="emailInput1">
              <b-form-input id="emailInput1"
                type="email"
                v-model="email"
                required
                placeholder="Enter email">
              </b-form-input>
            </b-form-group>
            <b-form-group id="usernameInputGroup"
              label="Your username:"
              label-for="usernameInput">
              <b-form-input id="usernameInput"
                type="text"
                v-model="username"
                required
                placeholder="Enter username">
              </b-form-input>
            </b-form-group>
            <b-form-group id="passwordInputGroup1"
              label="Your Password:"
              label-for="passwordInput1">
              <b-form-input id="passwordInput1"
                type="password"
                v-model="password"
                required
                placeholder="Enter password">
              </b-form-input>
            </b-form-group>

            <b-button class="float-right" type="submit" variant="primary" data-dismiss="modal">Register</b-button>
          </b-form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { REGISTER } from '@/stores/actions.type'

export default {
  name: 'Register',
  data () {
    return {
      email: null,
      username: null,
      password: null
    }
  },
  methods: {
    onSubmit (email, username, password) {
      this.$store
        .dispatch(REGISTER, { email, username, password })
        .then(() => this.$router.push({ name: 'dashboard' }))
    }
  }
}
</script>
