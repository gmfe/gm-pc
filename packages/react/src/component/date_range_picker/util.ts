import moment, { Moment } from 'moment'

const renderTime = (value: Moment): string => {
  const date = moment(value).format('YYYY-MM-DD')
  if (moment(value).add(1, 'ms').isSame(moment(date).add(1, 'd'))) {
    return '24:00'
  }
  return moment(value).format('HH:mm')
}

export { renderTime }
