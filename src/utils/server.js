import fetch from 'isomorphic-fetch'

const sameServerUrl = process.env.NODE_ENV === 'dev' ?
  'http://localhost:8080' :
  'http://cow.herokuapp.com'

const request = (endpoint, method, body = null) =>
  fetch(
    `sameServerUrl${endpoint}`,
    {
      credentials: 'include',
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${}`,
      }
    }
  )

export const logout = () => {
  return request('/logout', 'POST').then(() => {
    // is this a terrible hack? idk
    location.reload()
  })
}

