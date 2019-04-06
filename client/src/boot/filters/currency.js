const currencies = {
  USD: ['$', 'United States dollar'],
  CAD: ['$', 'Canadian dollar'],
  AUD: ['$', 'Australian dollar'],
  NZD: ['$', 'New Zealand dollar'],
  MXN: ['$', 'Mexican peso'],
  SGD: ['$', 'Singapore dollar'],
  HKD: ['$', 'Hong Kong dollar'],
  EUR: ['€', 'Euro'],
  JPY: ['¥', 'Japanese yen'],
  GBP: ['£', 'Pound sterling'],
  CHF: ['Fr', 'Swiss franc'],
  CNY: ['元', 'Renminbi'],
  SEK: ['kr', 'Swedish krona'],
  NOK: ['kr', 'Norwegian krone'],
  KRW: ['₩', 'South Korean won'],
  TRY: ['₺', 'Turkish lira'],
  RUB: ['₽', 'Russian ruble'],
  INR: ['₹', 'Indian rupee'],
  BRL: ['$', 'Brazilian real'],
  ZAR: ['R', 'South African rand']
}

const currencyFilter = (val, cur, opts) => {
  if (opts && opts.symbol) {
    return currencies[cur][0]
  }

  if (!val && val !== 0) return ''

  let value = val.toString()

  if (value.length > 3) {
    value = parseInt(val).toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')
  }

  return currencies[cur]
    ? currencies[cur][0] + ' ' + value
    : value
}

export default currencyFilter
