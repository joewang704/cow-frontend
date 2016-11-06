import moment from 'moment'
import { fromJS } from 'immutable'

const NEXT_WEEK = 'NEXT_WEEK'
const PREV_WEEK = 'PREV_WEEK'

const initialState = fromJS({
  activeWeekStartDate: moment().startOf('week').valueOf()
})

const reducer = (state = initialState, { type }) => {
  /*if (moment(state.get('activeWeekStartDate')).format('ddd') !== 'Sun') {
    return state.set('activeWeekStartDate', moment().startOf('week').valueOf())
  }*/
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

