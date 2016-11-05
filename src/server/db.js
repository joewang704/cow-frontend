import { request, requestBasicAuth } from './utils'
import { List, Set, OrderedSet, fromJS } from 'immutable'
import moment from 'moment'

export const getGroups = () => {
  return request('/groups', 'GET')
    .then((groups) => {
      return groups.reduce((obj, { id, name, color }) => {
        return Object.assign(obj, {
          [id]: {
            id,
            name,
            color,
            items: [],
          },
        })
      }, {})
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err)
    })
}

export const getItems = (token) => {
  return requestBasicAuth('/items', 'GET', token)
    .then((items) => {
      if (items.success === 'false') {
        throw new Error('Backend error')
      }
      return items.reduce((obj, {
        id,
        text,
        date,
      }) => {
        return obj.set(id, fromJS({
          id,
          text,
          date: date ? moment(date.split('T')[0]).valueOf() : null,
        }))
      }, fromJS({}))
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.log(err)
    })
}

export const getInitialStoreState = (token) => {
  return Promise.all([getItems(token)]).then(([items]) => {
    return {
      items,
    }
  })
}
