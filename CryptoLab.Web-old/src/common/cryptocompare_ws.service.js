import io from 'socket.io-client'
export default {
  data() {
    return {
      socket,
    }
  },
  subscription(currency) {
    this.socket = io.connect('https://streamer.cryptocompare.com/')
    var subscription = ['5~CCCAGG~' + currency + '~USD', '11~' + currency]
    this.socket.emit('SubAdd', {
      subs: subscription
    })
  },
  unsubscription() {
    this.socket.disconnect()
  }
}
