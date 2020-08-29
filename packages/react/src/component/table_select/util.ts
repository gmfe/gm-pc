import _ from 'lodash'
import { TableSelectColumn } from './types'

interface GetColumnKey {
  (column: TableSelectColumn): string | null
}

const getColumnKey: GetColumnKey = (column) => {
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
