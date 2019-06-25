import axios from 'axios'
import JwtService from '@/common/jwt.service'
import { API_URL } from '@/common/config'
import { ADD_WALLET, FETCH_WALLETS } from './actions.type'
import { SET_WALLETS } from './mutations.type'

const state = {
  wallets: {}
}

const getters = {
  userWallets (state) {
    return state.wallets
  }
}

const actions = {
  [ADD_WALLET] (context, payload) {
    axios.post(API_URL + 'wallets/addwallet', {
      currencies: payload.currency
    }, {
      headers: { Authorization: 'Bearer ' + JwtService.getToken() }
    })
  },
  [FETCH_WALLETS] (context) {
    return new Promise((resolve) => {
    axios.get(API_URL + 'wallets', { headers: { Authorization: 'Bearer ' + JwtService.getToken() } })
      .then(({ data }) => {
        context.commit(SET_WALLETS, data)
        resolve(data)
      })
    })
  }
}

const mutations = {
  [SET_WALLETS] (state, wallets) {
    state.wallets = wallets
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
