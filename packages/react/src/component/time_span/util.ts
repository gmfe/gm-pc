import moment from 'moment'
import { GetTime } from './type'

const renderItemFunc = (date: Date): React.ReactNode => {
  return moment(date).format('HH:mm')
}

const getTime: GetTime = (time) => {
  if (time) {
    const year = moment().year()
    const month = moment().month()
    const date = moment().date()
    return moment(time).set({ year, month, date })
  }
  return null
}

export { renderItemFunc, getTime }
