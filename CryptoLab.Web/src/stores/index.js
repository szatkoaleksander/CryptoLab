import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth.module'
import wallet from './wallet.module'
import transaction from './transaction.module'
import history from './history.module'
import crypto_info from './crypto_info.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    wallet,
    transaction,
    history,
    crypto_info
  }
})
