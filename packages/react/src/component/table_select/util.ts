import _ from 'lodash'
import { TableSelectColumn } from './types'

function getColumnKey<V>(column: TableSelectColumn<V>): string | null {
  if (_.isString(column.accessor)) {
    return column.accessor
  } else if (_.isFunction(column.accessor) && column.id) {
    return column.id
  } else if (column.id) {
    return column.id
  }
  return null
}

export { getColumnKey }
