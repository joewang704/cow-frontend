import { combineReducers } from 'redux'
import items from './items'
import daruma from './daruma'
import ui from './ui'
import calendar from './calendar'

const reducers = combineReducers({
  items,
  daruma,
  ui,
  calendar,
})

export default reducers
