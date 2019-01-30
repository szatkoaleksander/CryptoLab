import axios from 'axios'
import JwtService from '@/common/jwt.service'
import { API_URL } from '@/common/config'
import { FETCH_USER } from './actions.type'
import { SET_USER } from './mutations.type'

const state = {
  user: Object
}

const getters = {
  user (state) {
    return state.user
  }
}

const actions = {
  [FETCH_USER] (context) {
    axios.get('http://localhost:5000/api/users/me', { headers: { Authorization: 'Bearer ' + JwtService.getToken() } })
      .then(({ data }) => {
        console.log('token:' + JwtService.getToken())
        context.commit(SET_USER, data)
      })
  }
}

const mutations = {
  [SET_USER] (state, user) {
    state.user = user
    console.log(state.user)
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
