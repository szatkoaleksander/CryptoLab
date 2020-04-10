export const dataUnpack = message => {
  const data = unpack(message);
  const from = data['FROMSYMBOL'];
  const to = data['TOSYMBOL'];
  const tsym = getSymbol(to);
  const pair = from + to;

  if (!currentPrice.hasOwnProperty(pair)) {
    currentPrice[pair] = {};
  }

  for (var key in data) {
    currentPrice[pair][key] = data[key];
  }

  if (currentPrice[pair]['LASTTRADEID']) {
    currentPrice[pair]['LASTTRADEID'] = parseInt(currentPrice[pair]['LASTTRADEID']).toFixed(0);

    currentPrice[pair]['CHANGE24HOUR'] = convertValueToDisplay(
      tsym,
      currentPrice[pair]['PRICE'] - currentPrice[pair]['OPEN24HOUR'],
    );
    currentPrice[pair]['CHANGE24HOURPCT'] =
      (
        ((currentPrice[pair]['PRICE'] - currentPrice[pair]['OPEN24HOUR']) /
          currentPrice[pair]['OPEN24HOUR']) *
        100
      ).toFixed(2) + '%';
    return currentPrice[pair];
  }
};

let currentPrice = {};

const CCC_STATIC_CURRENCY_SYMBOL = {
  BTC: 'Ƀ',
  LTC: 'Ł',
  DAO: 'Ð',
  USD: '$',
  CNY: '¥',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  PLN: 'zł',
  RUB: '₽',
  ETH: 'Ξ',
  GOLD: 'Gold g',
  INR: '₹',
  BRL: 'R$',
};

const CCC_CURRENT_FIELDS = {
  TYPE: 0x0,
  MARKET: 0x0,
  FROMSYMBOL: 0x0,
  TOSYMBOL: 0x0,
  FLAGS: 0x0,
  PRICE: 0x1,
  BID: 0x2,
  OFFER: 0x4,
  LASTUPDATE: 0x8,
  AVG: 0x10,
  LASTVOLUME: 0x20,
  LASTVOLUMETO: 0x40,
  LASTTRADEID: 0x80,
  VOLUMEHOUR: 0x100,
  VOLUMEHOURTO: 0x200,
  VOLUME24HOUR: 0x400,
  VOLUME24HOURTO: 0x800,
  OPENHOUR: 0x1000,
  HIGHHOUR: 0x2000,
  LOWHOUR: 0x4000,
  OPEN24HOUR: 0x8000,
  HIGH24HOUR: 0x10000,
  LOW24HOUR: 0x20000,
  LASTMARKET: 0x40000,
};

const getSymbol = symbol => {
  return CCC_STATIC_CURRENCY_SYMBOL[symbol] || symbol;
};

const unpack = value => {
  value = value + '';
  const valuesArray = value.split('~');
  var valuesArrayLenght = valuesArray.length;
  var mask = valuesArray[valuesArrayLenght - 1];
  var maskInt = parseInt(mask, 16);
  var unpackedCurrent = {};
  var currentField = 0;

  for (const property in CCC_CURRENT_FIELDS) {
    if (CCC_CURRENT_FIELDS[property] === 0) {
      unpackedCurrent[property] = valuesArray[currentField];
      currentField++;
    } else if (maskInt & CCC_CURRENT_FIELDS[property]) {
      if (property === 'LASTMARKET') {
        unpackedCurrent[property] = valuesArray[currentField];
      } else {
        unpackedCurrent[property] = parseFloat(valuesArray[currentField]);
      }
      currentField++;
    }
  }
  return unpackedCurrent;
};

const convertValueToDisplay = (symbol, value, type, fullNumbers) => {
  let prefix = '';
  let valueSign = 1;
  value = parseFloat(value);
  let valueAbs = Math.abs(value);
  let decimalsOnBigNumbers = 2;
  let decimalsOnNormalNumbers = 2;
  let decimalsOnSmallNumbers = 4;

  if (fullNumbers === true) {
    decimalsOnBigNumbers = 2;
    decimalsOnNormalNumbers = 0;
    decimalsOnSmallNumbers = 4;
  }
  if (symbol !== '') {
    prefix = symbol + ' ';
  }
  if (value < 0) {
    valueSign = -1;
  }
  if (value === 0) {
    return prefix + '0';
  }
  if (value < 0.00001 && value >= 0.000001 && decimalsOnSmallNumbers > 3) {
    decimalsOnSmallNumbers = 3;
  }
  if (value < 0.000001 && value >= 0.0000001 && decimalsOnSmallNumbers > 2) {
    decimalsOnSmallNumbers = 2;
  }
  if (value < 0.0000001 && value >= 0.00000001 && decimalsOnSmallNumbers > 1) {
    decimalsOnSmallNumbers = 1;
  }
  if (type === 'short') {
    if (valueAbs > 10000000000) {
      valueAbs = valueAbs / 1000000000;
      return (
        prefix + filterNumberFunctionPolyfill(valueSign * valueAbs, decimalsOnBigNumbers) + ' B'
      );
    }
    if (valueAbs > 10000000) {
      valueAbs = valueAbs / 1000000;
      return (
        prefix + filterNumberFunctionPolyfill(valueSign * valueAbs, decimalsOnBigNumbers) + ' M'
      );
    }
    if (valueAbs > 10000) {
      valueAbs = valueAbs / 1000;
      return (
        prefix + filterNumberFunctionPolyfill(valueSign * valueAbs, decimalsOnBigNumbers) + ' K'
      );
    }
    if (valueAbs >= 1) {
      return prefix + filterNumberFunctionPolyfill(valueSign * valueAbs, decimalsOnNormalNumbers);
    }
    return prefix + (valueSign * valueAbs).toPrecision(decimalsOnSmallNumbers);
  } else {
    if (valueAbs >= 1) {
      return prefix + filterNumberFunctionPolyfill(valueSign * valueAbs, decimalsOnNormalNumbers);
    }
    return prefix + noExponents((valueSign * valueAbs).toPrecision(decimalsOnSmallNumbers));
  }
};

const filterNumberFunctionPolyfill = (value, decimals) => {
  const decimalsDenominator = Math.pow(10, decimals);
  const numberWithCorrectDecimals = Math.round(value * decimalsDenominator) / decimalsDenominator;
  let parts = numberWithCorrectDecimals.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

const noExponents = value => {
  let data = String(value).split(/[eE]/);
  if (data.length === 1) return data[0];

  let z = '',
    sign = value < 0 ? '-' : '',
    str = data[0].replace('.', ''),
    mag = Number(data[1]) + 1;

  if (mag < 0) {
    z = sign + '0.';
    while (mag++) z += '0';
    return z + str.replace(/^\-/, '');
  }
  mag -= str.length;
  while (mag--) z += '0';
  return str + z;
};
