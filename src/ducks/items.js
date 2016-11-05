import { fromJS } from 'immutable'
import { createItemInDb, updateItemInDb,
  deleteItemInDb } from '../utils/api.js'

export const ADD_ITEM = 'ADD_ITEM'
export const EDIT_ITEM = 'EDIT_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'

const initialState = fromJS({})

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ITEM: {
      const { id, text, date } = payload
      return state.set(id, fromJS({
        id,
        text,
        date,
      }))
    }
    case EDIT_ITEM: {
      const { id, text, date } = payload
      return state.update(id, item =>
        item.mergeWith((prev, next) => next != null ? next : prev, payload))
    }
    case REMOVE_ITEM:
      return state.delete(payload.id)
    default:
      return state
  }
}

export default reducer

export const createItem = (text, date) => {
  return dispatch => {
    createItemInDb({
      text,
      date: date.format('YYYY-MM-DD'),
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
          },
        })
      }
    })
  }
}

export const editItem = (id, text, date) => {
  return dispatch => {
    updateItemInDb(id, {
      text,
      date: date.format('YYYY-MM-DD'),
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
          },
        })
      }
    }).catch(err => console.log(err))
  }
}

export const deleteItem = id => {
  return dispatch => {
    deleteItemInDb(id).then((res) => {
      dispatch({
        type: REMOVE_ITEM,
        payload: {
          id,
        },
      })
    })
  }
}

