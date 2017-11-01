import { fromJS } from 'immutable'
import { textToStartEndTime } from '../utils/calendar.js'
import { createItemInDb, updateItemInDb,
  deleteItemInDb } from '../utils/api.js'

export const ADD_ITEM = 'ADD_ITEM'
export const EDIT_ITEM = 'EDIT_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const HOVER = 'HOVER'

const initialState = fromJS({})

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ITEM: {
      const { id, text, date, startTime, endTime, parsedTimes } = payload
      return state.set(id, fromJS({
        id,
        text,
        date,
        startTime,
        endTime,
        parsedTimes,
      }))
    }
    case EDIT_ITEM: {
      return state.update(id, item =>
        item.mergeWith((prev, next) => next != null ? next : prev, payload))
    }
    case REMOVE_ITEM:
      const newState = state.delete(payload.id)
      // logic to hover over next element on remove
      return payload.nextId == null ? newState : newState.setIn([payload.nextId, 'hovered'], true)
    case HOVER:
      return state.setIn([payload.id, 'hovered'], payload.hover)
    default:
      return state
  }
}

export default reducer

export const createItem = (text, date) => {
  const { startTime, endTime, parsedTimes } = textToStartEndTime(text)
  return dispatch => {
    createItemInDb({
      text,
      date: date.format('YYYY-MM-DD'),
      startTime,
      endTime,
      parsedTimes,
    }).then((res) => {
      if (!res.id) {
        console.log(res)
      } else {
        dispatch({
          type: ADD_ITEM,
          payload: {
            id: res.id,
            text,
            date,
            startTime,
            endTime,
            parsedTimes,
          },
        })
      }
    })
  }
}

export const editItem = (id, text, date) => {
  const { startTime, endTime, parsedTimes } = textToStartEndTime(text)
  return dispatch => {
    updateItemInDb(id, {
      text,
      date: date ? date.format('YYYY-MM-DD') : null,
      startTime,
      endTime,
    }).then((res) => {
      if (!res.id) {
        console.log(res)
      } else {
        dispatch({
          type: EDIT_ITEM,
          payload: {
            id,
            text,
            date,
            startTime,
            endTime,
            parsedTimes,
          },
        })
      }
    }).catch(err => console.log(err))
  }
}

export const deleteItem = (id, nextId) => {
  return dispatch => {
    deleteItemInDb(id).then((res) => {
      if (!res.id) {
        console.log(res)
      } else {
        dispatch({
          type: REMOVE_ITEM,
          payload: {
            id,
            nextId,
          },
        })
      }
    })
  }
}

export const hover = (id, hover) => ({
  type: HOVER,
  payload: {
    id,
    hover
  },
})

