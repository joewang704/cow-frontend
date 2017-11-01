import moment from 'moment'
import chrono from 'chrono-node'

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

export const nextFiveDays = (dayMoment) =>
  [0, 1, 2, 3, 4].map(
    (num) => moment(dayMoment).add(num, 'days')
  )

export const isCurrentDate = (dayMoment) => dayMoment.isSame(new Date(), 'day')

export const textToStartEndTime = (text) => {
  let startTime = null
  let endTime = null
  let parsedTimes = []
  chrono.parse(text).forEach(({ text, start, end }) => {
    if (start) {
      const values = start.knownValues
      startTime = moment(`${values.hour}:${values.minute}`, 'H:m').format('HH:mm')
    }
    if (end) {
      const values = end.knownValues
      endTime = moment(`${values.hour}:${values.minute}`, 'H:m').format('HH:mm')
    }
    parsedTimes.push(text)
  })
  return { startTime, endTime, parsedTimes }
}

export const sortByTime = (a, b) => {
  if (!a) return -1
  if (!b) return 1
  return moment(a, 'HH:mm:00').isAfter(moment(b, 'HH:mm:00'), 'minute') ? 1 : -1
}
