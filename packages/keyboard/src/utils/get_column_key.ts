import _ from 'lodash'
import { KeyboardTableXColumn } from '../types'

function getColumnKey(column: KeyboardTableXColumn) {
  if (_.isString(column.accessor)) return column.accessor
  else if (_.isFunction(column.accessor) && column.id) return column.id
  else if (column.id) return column.id
  return null
}

export default getColumnKey
