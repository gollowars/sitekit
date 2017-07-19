module.exports = {
  local: {
    apihost: 'http://localhost:5000',
    log: true
  },
  prev: {
    apihost: '/app',
    log: true
  },
  dev: {
    apihost: '/app',
    log: true
  },
  stg: {
    apihost: '/app',
    log: true
  },
  prod: {
    apihost: '/app',
    log: false
  }
}
