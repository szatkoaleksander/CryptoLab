import CC_ws from '@/common/cryptocompare_ws.service'
import CC_dispatcher from '@/common/cryptocompare_dispatcher.service'
import { FETCH_CRYPTO_PRICE } from './actions.type'
import { SET_CRYPTO_PRICE } from './mutations.type'

const state = {
  crypto_info: []
}

const getters = {
  crypto_info(state) {
    return state.crypto_info
  }
}

const actions = {
  [FETCH_CRYPTO_PRICE](context, payload) {
    CC_ws.socket.on("m", function(message) {
      var messageType = message.substring(0, message.indexOf("~"));
      if (messageType == '5') {
        console.log(CC_dispatcher.dataUnpack(message))
        context.commit(SET_CRYPTO_PRICE, CC_dispatcher.dataUnpack(message))
      }
    })
  }
}

const mutations = {
  [SET_CRYPTO_PRICE](state, crypto_info) {
    state.crypto_info = crypto_info
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
