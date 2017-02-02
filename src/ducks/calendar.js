import moment from 'moment'
import { fromJS } from 'immutable'

const NEXT_WEEK = 'NEXT_WEEK'
const PREV_WEEK = 'PREV_WEEK'

const initialState = fromJS({
  activeWeekStartDate: moment().valueOf()
})

const reducer = (state = initialState, { type }) => {
  switch (type) {
    case NEXT_WEEK:
      return state.update('activeWeekStartDate', momentDate => moment(momentDate).add(5, 'days').valueOf())
    case PREV_WEEK:
      return state.update('activeWeekStartDate', momentDate => moment(momentDate).subtract(5, 'days').valueOf())
    default:
      return state
  }
}

export default reducer

export const nextWeek = () => ({ type: NEXT_WEEK })
export const prevWeek = () => ({ type: PREV_WEEK })

