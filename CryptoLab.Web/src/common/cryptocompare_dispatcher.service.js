export default {
  dataUnpack: function(message) {
    var data = unpack(message)
    var from = data['FROMSYMBOL']
    var to = data['TOSYMBOL']
    var tsym = getSymbol(to)
    var pair = from + to

    if (!currentPrice.hasOwnProperty(pair)) {
      currentPrice[pair] = {}
    }

    for (var key in data) {
      currentPrice[pair][key] = data[key]
    }

    if (currentPrice[pair]['LASTTRADEID']) {
      currentPrice[pair]['LASTTRADEID'] = parseInt(currentPrice[pair]['LASTTRADEID']).toFixed(0)

      currentPrice[pair]['CHANGE24HOUR'] = convertValueToDisplay(tsym, (currentPrice[pair]['PRICE'] - currentPrice[pair]['OPEN24HOUR']))
      currentPrice[pair]['CHANGE24HOURPCT'] = ((currentPrice[pair]['PRICE'] - currentPrice[pair]['OPEN24HOUR']) / currentPrice[pair]['OPEN24HOUR'] * 100).toFixed(2) + "%"
      return currentPrice[pair]
    }
  }
}

var currentPrice = {}

var CCC_STATIC_CURRENCY_SYMBOL = {
  'BTC': 'Ƀ',
  'LTC': 'Ł',
  'DAO': 'Ð',
  'USD': '$',
  'CNY': '¥',
  'EUR': '€',
  'GBP': '£',
  'JPY': '¥',
  'PLN': 'zł',
  'RUB': '₽',
  'ETH': 'Ξ',
  'GOLD': 'Gold g',
  'INR': '₹',
  'BRL': 'R$'
}

var CCC_CURRENT_FIELDS = {
  'TYPE': 0x0,
  'MARKET': 0x0,
  'FROMSYMBOL': 0x0,
  'TOSYMBOL': 0x0,
  'FLAGS': 0x0,
  'PRICE': 0x1,
  'BID': 0x2,
  'OFFER': 0x4,
  'LASTUPDATE': 0x8,
  'AVG': 0x10,
  'LASTVOLUME': 0x20,
  'LASTVOLUMETO': 0x40,
  'LASTTRADEID': 0x80,
  'VOLUMEHOUR': 0x100,
  'VOLUMEHOURTO': 0x200,
  'VOLUME24HOUR': 0x400,
  'VOLUME24HOURTO': 0x800,
  'OPENHOUR': 0x1000,
  'HIGHHOUR': 0x2000,
  'LOWHOUR': 0x4000,
  'OPEN24HOUR': 0x8000,
  'HIGH24HOUR': 0x10000,
  'LOW24HOUR': 0x20000,
  'LASTMARKET': 0x40000
}

var getSymbol = function(symbol) {
  return CCC_STATIC_CURRENCY_SYMBOL[symbol] || symbol
}

var unpack = function(value) {
  var valuesArray = value.split("~")
  var valuesArrayLenght = valuesArray.length
  var mask = valuesArray[valuesArrayLenght - 1]
  var maskInt = parseInt(mask, 16)
  var unpackedCurrent = {}
  var currentField = 0

  for (var property in CCC_CURRENT_FIELDS) {
    if (CCC_CURRENT_FIELDS[property] === 0) {
      unpackedCurrent[property] = valuesArray[currentField]
      currentField++
    } else if (maskInt & CCC_CURRENT_FIELDS[property]) {
      if (property === 'LASTMARKET') {
        unpackedCurrent[property] = valuesArray[currentField]
      } else {
        unpackedCurrent[property] = parseFloat(valuesArray[currentField])
      }
      currentField++
    }
  }
  return unpackedCurrent
}

var convertValueToDisplay = function(symbol, value, type, fullNumbers) {
  var prefix = ''
  var valueSign = 1
  value = parseFloat(value)
  var valueAbs = Math.abs(value)
  var decimalsOnBigNumbers = 2
  var decimalsOnNormalNumbers = 2
  var decimalsOnSmallNumbers = 4

  if (fullNumbers === true) {
    decimalsOnBigNumbers = 2
    decimalsOnNormalNumbers = 0
    decimalsOnSmallNumbers = 4
  }
  if (symbol != '') {
    prefix = symbol + ' '
  }
  if (value < 0) {
    valueSign = -1
  }
  if (value == 0) {
    return prefix + '0'
  }
  if (value < 0.00001000 && value >= 0.00000100 && decimalsOnSmallNumbers > 3) {
    decimalsOnSmallNumbers = 3
  }
  if (value < 0.00000100 && value >= 0.00000010 && decimalsOnSmallNumbers > 2) {
    decimalsOnSmallNumbers = 2
  }
  if (value < 0.00000010 && value >= 0.00000001 && decimalsOnSmallNumbers > 1) {
    decimalsOnSmallNumbers = 1
  }
  if (type == "short") {
    if (valueAbs > 10000000000) {
      valueAbs = valueAbs / 1000000000
      return prefix + filterNumberFunctionPolyfill(valueSign * valueAbs, decimalsOnBigNumbers) + ' B'
    }
    if (valueAbs > 10000000) {
      valueAbs = valueAbs / 1000000
      return prefix + filterNumberFunctionPolyfill(valueSign * valueAbs, decimalsOnBigNumbers) + ' M'
    }
    if (valueAbs > 10000) {
      valueAbs = valueAbs / 1000
      return prefix + filterNumberFunctionPolyfill(valueSign * valueAbs, decimalsOnBigNumbers) + ' K'
    }
    if (valueAbs >= 1) {
      return prefix + filterNumberFunctionPolyfill(valueSign * valueAbs, decimalsOnNormalNumbers)
    }
    return prefix + (valueSign * valueAbs).toPrecision(decimalsOnSmallNumbers)
  } else {
    if (valueAbs >= 1) {
      return prefix + filterNumberFunctionPolyfill(valueSign * valueAbs, decimalsOnNormalNumbers)
    }
    return prefix + noExponents((valueSign * valueAbs).toPrecision(decimalsOnSmallNumbers))
  }
}

var filterNumberFunctionPolyfill = function(value, decimals) {
  var decimalsDenominator = Math.pow(10, decimals)
  var numberWithCorrectDecimals = Math.round(value * decimalsDenominator) / decimalsDenominator
  var parts = numberWithCorrectDecimals.toString().split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return parts.join(".")
}

var noExponents = function(value) {
  var data = String(value).split(/[eE]/)
  if (data.length == 1) return data[0]

  var z = '',
    sign = value < 0 ? '-' : '',
    str = data[0].replace('.', ''),
    mag = Number(data[1]) + 1

  if (mag < 0) {
    z = sign + '0.';
    while (mag++) z += '0';
    return z + str.replace(/^\-/, '')
  }
  mag -= str.length;
  while (mag--) z += '0';
  return str + z
}
