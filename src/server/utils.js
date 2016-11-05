import rp from 'request-promise'

const url = process.env.NODE_ENV === 'dev' ?
  'http://localhost:8888' :
  'http://cow-backend.herokuapp.com'

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

