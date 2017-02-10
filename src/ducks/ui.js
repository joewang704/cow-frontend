import { fromJS } from 'immutable'
import { ADD_ITEM } from './items.js'

export const ADD_ITEM_PLACEHOLDER = 'ADD_ITEM_PLACEHOLDER'
export const REMOVE_ITEM_PLACEHOLDER = 'REMOVE_ITEM_PLACEHOLDER'

export const OPEN_ITEM_SETTINGS = 'OPEN_ITEM_SETTINGS'
export const CLOSE_ITEM_SETTINGS = 'CLOSE_ITEM_SETTINGS'

export const createItemPlaceholder = (date) => {
  return {
    type: ADD_ITEM_PLACEHOLDER,
    payload: {
      date,
    },
  }
}

export const deleteItemPlaceholder = () => {
  return {
    type: REMOVE_ITEM_PLACEHOLDER,
  }
}

export const openItemSettings = (id) => {
  return {
    type: OPEN_ITEM_SETTINGS,
    payload: { id },
  }
}

export const closeItemSettings = () => {
  return {
    type: CLOSE_ITEM_SETTINGS,
  }
}

const initialState = fromJS({})

const ui = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ITEM_PLACEHOLDER: {
      const { date } = payload
      return state.set('itemPlaceholder', fromJS({
        date,
      }))
    }
    case REMOVE_ITEM_PLACEHOLDER:
    case ADD_ITEM:
      return state.delete('itemPlaceholder')
    case OPEN_ITEM_SETTINGS:
      return state.set('itemSettings', fromJS({
        id: payload.id
      }))
    case CLOSE_ITEM_SETTINGS:
      return state.delete('itemSettings')
    default:
      return state
  }
}

export default ui
