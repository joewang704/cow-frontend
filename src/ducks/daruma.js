import { ADD_ITEM, REMOVE_ITEM } from './items.js'
import { fromJS } from 'immutable'

export const CLEAR_DARUMA = 'CLEAR_DARUMA'

const reducer = (state = fromJS({}), { type }) => {
  switch (type) {
    case ADD_ITEM: {
      return state.set('msg', 'Item was added')
    }
    case REMOVE_ITEM: {
      return state.set('msg', 'Item was removed')
    }
    case CLEAR_DARUMA: {
      return state.set('msg', null)
    }
    default:
      return state
  }
}

export default reducer

export const clearDaruma = () => ({
  type: CLEAR_DARUMA
})
