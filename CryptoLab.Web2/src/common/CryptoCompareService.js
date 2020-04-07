import io from 'socket.io-client';

export const socket = io.connect('https://streamer.cryptocompare.com/');

export const subscription = currency => {
  const subscription = ['5~CCCAGG~' + currency + '~USD', '11~' + currency];
  socket.emit('SubAdd', {
    subs: subscription,
  });
};

export const unsubscription = () => {
  socket.disconnect();
};

//https://min-api.cryptocompare.com/documentation
