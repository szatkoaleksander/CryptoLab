import axios from 'axios'
import JwtService from '@/common/jwt.service'
import { API_URL } from '@/common/config'
import { FAST_BUY_TRANSACTION, FAST_SELL_TRANSACTION } from './actions.type'

const actions = {
  [FAST_BUY_TRANSACTION] (context, payload) {
    axios.post(API_URL + 'transactions/fastbuy', {
      toCurrency: payload.currency,
      amount: payload.amountOfMoneyToBuy
    }, {
      headers: { Authorization: 'Bearer ' + JwtService.getToken() }
    })
  },
  [FAST_SELL_TRANSACTION] (context, payload) {
    axios.post(API_URL + 'transactions/fastsell', {
      fromCurrency: payload.currency,
      amount: payload.amountOfMoneyToSell
    }, {
      headers: { Authorization: 'Bearer ' + JwtService.getToken() }
    })
  }
}

export default {
  actions
}
