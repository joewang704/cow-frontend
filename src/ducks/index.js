import { combineReducers } from 'redux'
import items from './items'
import ui from './ui'
import calendar from './calendar'

const reducers = combineReducers({
  items,
  ui,
  calendar,
})

export default reducers
