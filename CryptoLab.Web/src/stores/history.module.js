import axios from 'axios'
import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr'
import JwtService from '@/common/jwt.service'
import { API_URL } from '@/common/config'
import { FETCH_MARKET_HISTORIES_BUY, FETCH_MARKET_HISTORIES_SELL } from './actions.type'
import { SET_MARKET_HISTORIES_BUY, SET_MARKET_HISTORIES_SELL } from './mutations.type'

const hubConnection = new HubConnectionBuilder()
  .withUrl('http://localhost:5000/hub/histories', { accessTokenFactory: () => 'Bearer ' + JwtService.getToken() })
  .configureLogging(LogLevel.Information)
  .build()
hubConnection.start()

const state = {
  marketHistoriesBuy: [],
  marketHistoriesSell: []
}

const getters = {
  marketHistoriesBuy (state) {
    return state.marketHistoriesBuy.slice().reverse()
  },
  marketHistoriesSell (state) {
    return state.marketHistoriesSell.slice().reverse()
  
  }
}

const actions = {
  [FETCH_MARKET_HISTORIES_BUY] (context, payload) {
    axios.get(API_URL + 'histories/' + payload.currency + `/` + '0', { headers: { Authorization: 'Bearer ' + JwtService.getToken() } })
      .then(({ data }) => {
        context.commit(SET_MARKET_HISTORIES_BUY, data)
      })
  },
  [FETCH_MARKET_HISTORIES_SELL] (context, payload) {
    axios.get(API_URL + 'histories/' + payload.currency + `/` + '1', { headers: { Authorization: 'Bearer ' + JwtService.getToken() } })
      .then(({ data }) => {
        context.commit(SET_MARKET_HISTORIES_SELL, data)
      })
  }
}

const mutations = {
  [SET_MARKET_HISTORIES_BUY] (state, marketHistoriesBuy) {
    hubConnection.on('Add', (history) => {
      if (history.operationType === 0) {
        marketHistoriesBuy.push(history)
      }
    })

    state.marketHistoriesBuy = marketHistoriesBuy
  },
  [SET_MARKET_HISTORIES_SELL] (state, marketHistoriesSell) {
    hubConnection.on('Add', (history) => {
      if (history.operationType === 1) {
        marketHistoriesSell.push(history)
      }
    })

    state.marketHistoriesSell = marketHistoriesSell
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
