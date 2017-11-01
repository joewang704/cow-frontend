import { request, requestBasicAuth } from './utils'
import { List, Set, OrderedSet, fromJS } from 'immutable'

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
      if (items.success === false) {
        throw new Error('Backend error. Response was: ' + JSON.stringify(items))
      }
      return items.reduce((obj, {
        id,
        text,
        date,
        start_time,
        end_time,
        parsed_times,
      }) => {
        return obj.set(id, fromJS({
          id,
          text,
          date: date ? date.split('T')[0] : null,
          startTime: start_time,
          endTime: end_time,
          parsedTimes: parsed_times,
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
