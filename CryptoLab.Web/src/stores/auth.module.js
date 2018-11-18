import axios from 'axios'
import JwtService from '@/common/jwt.service'
import { API_URL } from '@/common/config'
import { LOGIN, LOGOUT, REGISTER } from './actions.type'
import { SET_AUTH, PURGE_AUTH } from './mutations.type'

const state = {
  token: String,
  isAuthenticated: !!JwtService.getToken()
}

const getters = {
  currentToken (state) {
    return state.token
  },
  isAuthenticated (state) {
    return state.isAuthenticated
  }
}

const actions = {
  [LOGIN] (context, credentials) {
    return new Promise((resolve) => {
      axios.post(API_URL + 'account/login', {
        email: credentials.email,
        password: credentials.password
      })
        .then(({ data }) => {
          context.commit(SET_AUTH, data.token)
          resolve(data)
        })
    })
  },
  [LOGOUT] (context) {
    context.commit(PURGE_AUTH)
  },
  [REGISTER] (context, credentials) {
    return new Promise((resolve) => {
      axios.post(API_URL + 'users/register', {
        email: credentials.email,
        username: credentials.username,
        password: credentials.password
      })
        .then(({ data }) => {
          context.commit(SET_AUTH, data.token)
          resolve(data)
        })
    })
  }
}

const mutations = {
  [SET_AUTH] (state, token) {
    state.isAuthenticated = true
    state.token = token
    JwtService.saveToken(state.token)
  },
  [PURGE_AUTH] (state) {
    state.isAuthenticated = false
    state.token = ''
    JwtService.destroyToken()
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
