import moment from 'moment'
import { fromJS } from 'immutable'

const NEXT_WEEK = 'NEXT_WEEK'
const PREV_WEEK = 'PREV_WEEK'

const initialState = fromJS({
  activeWeekStartDate: moment().startOf('isoWeek').valueOf()
})

const reducer = (state = initialState, { type }) => {
  console.log(type)
  console.log(moment(moment().startOf('isoWeek').valueOf())._d)
  console.log(moment(state.toJS().activeWeekStartDate)._d)
  console.log(moment(state.get('activeWeekStartDate'))._d)
  console.log(moment(initialState.toJS().activeWeekStartDate)._d)
  console.log(moment(initialState.get('activeWeekStartDate'))._d)
  switch (type) {
    case NEXT_WEEK:
      return state.update('activeWeekStartDate', momentDate => moment(momentDate).add(1, 'weeks').valueOf())
    case PREV_WEEK:
      return state.update('activeWeekStartDate', momentDate => moment(momentDate).subtract(1, 'weeks').valueOf())
    default:
      return state
  }
}

export default reducer

export const nextWeek = () => ({ type: NEXT_WEEK })
export const prevWeek = () => ({ type: PREV_WEEK })

