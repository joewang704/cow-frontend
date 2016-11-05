import rp from 'request-promise'

const url = 'http://localhost:8888'

export const request = (endpoint, method) => {
  return rp({
    uri: `${url}${endpoint}`,
    headers: {
      'User-Agent': 'joe',
    },
    json: true,
    method,
  })
}

export const requestBasicAuth = (endpoint, method, token) => {
  return rp({
    uri: `${url}${endpoint}`,
    headers: {
      'User-Agent': 'joe',
    },
    auth: {
      bearer: token,
    },
    json: true,
    method,
  })
}

