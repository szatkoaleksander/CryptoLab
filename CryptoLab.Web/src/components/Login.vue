<template>
  <div class="auth-page">
    <div class="container page">
      <b-btn v-b-modal.modal>Login</b-btn>
      <div class="text-left">
        <b-modal id="modal" title="Login" hide-footer>
          <b-form v-on:submit.prevent="onSubmit(email, password)">
            <b-form-group id="emailInputGroup"
              label="Email address:"
              label-for="emailInput">
              <b-form-input id="emailInput"
                type="email"
                v-model="email"
                required
                placeholder="Enter email">
              </b-form-input>
            </b-form-group>
            <b-form-group id="passwordInputGroup"
              label="Your Password:"
              label-for="passwordInput">
              <b-form-input id="passwordInput"
                type="password"
                v-model="password"
                required
                placeholder="Enter password">
              </b-form-input>
            </b-form-group>

            <b-button class="float-right" type="submit" variant="primary" data-dismiss="modal">Login</b-button>
          </b-form>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
import { LOGIN } from '@/stores/actions.type'

export default {
  name: 'Login',
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    onSubmit (email, password) {
      this.$store
        .dispatch(LOGIN, { email, password })
        .then(() => this.$router.push({ name: 'dashboard' }))
    },
  }
}
</script>
