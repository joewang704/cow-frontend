import moment from 'moment'
import 'moment-timezone'

moment.tz.setDefault('America/New_York')

export { moment }

/*export const moment = (input = null) => {
  if (input === null) {
   return m().tz('America/New_York')
  }
  return m(input).tz('America/New_York')
}*/

export const dayMomentToStr = (dayMoment) => {
  return dayMoment.format('dddd')
    .replace('urday', '')
    .replace('day', '')
    .replace('nes', '')
}

export const dayMomentToAbrvStr = (dayMoment) => {
  return dayMoment.format('dddd')
    .replace('urday', '')
    .replace('day', '')
    .replace('nes', '').toUpperCase()
}

export const weekFromStartDate = (startDate) =>
  [0, 1, 2, 3, 4, 5, 6].map(
    (num) => moment(startDate).add(num, 'days')
  )

export const isCurrentDate = (dayMoment) => dayMoment.isSame(new Date(), 'day')
