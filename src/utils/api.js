import fetch from 'isomorphic-fetch'
import cookie from 'react-cookie'

const url = process.env.NODE_ENV === 'dev' ?
  'http://localhost:8888' :
  'https://cow-backend.herokuapp.com'

const api = (endpoint, method, body = null) =>
  fetch(
    `${url}${endpoint}`,
    {
      credentials: 'include',
      method,
      body,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookie.load('cow_token')}`,
      }
    }
  )

export const getGroups = () => {
  return api('/groups', 'GET')
    .then(res => res.json())
}

export const getItems = () => {
  return api('/items', 'GET')
    .then(res => res.json())
}

export const saveGroup = (group) => {
  return api('/groups', 'POST', JSON.stringify(group))
    .then(res => res.json())
}

export const createItemInDb = (item) => {
  return api('/items', 'POST',
      JSON.stringify(item)).then(res => res.json())
}

export const updateItemInDb = (id, { text, date }) => {
  return api(`/items/${id}`, 'PUT',
      JSON.stringify({ text, date })).then(res => res.json())
}

export const deleteItemInDb = (id) => {
  return api(`/items/${id}`, 'DELETE')
    .then(res => res.json())
}

export const deleteGroupInDb = (id) => {
  return api(`/groups/${id}`, 'DELETE')
    .then(res => res.json())
}

