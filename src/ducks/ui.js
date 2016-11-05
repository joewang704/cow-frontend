import { fromJS } from 'immutable'
import { ADD_ITEM } from './items.js'

export const ADD_ITEM_PLACEHOLDER = 'ADD_ITEM_PLACEHOLDER'
export const REMOVE_ITEM_PLACEHOLDER = 'REMOVE_ITEM_PLACEHOLDER'

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
    default:
      return state
  }
}

export default ui
