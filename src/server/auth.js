import jwt from 'jsonwebtoken'
import { request, requestBasicAuth } from './utils'

export const checkAuth = () => {
  return request('/auth').then(({ success }) => success)
}

export const register = (token) => {
  return requestBasicAuth('/users', 'POST', token)
    .then(({ success }) => success)
    .catch(err => console.log)
}

export const login = (token) => {
  return requestBasicAuth('/auth', 'POST', token)
    .then(({ success }) => success)
}

export const checkAuthMiddleware = (req, res, next) => {
  try {
    console.log(req.cookies['cow_token'])
    if (!req.cookies['cow_token']) {
      throw new Error()
    }
    req.token = req.cookies['cow_token']
    return next()
  } catch (err) {
    return res.redirect('/login')
  }
}

