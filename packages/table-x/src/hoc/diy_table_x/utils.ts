import _ from 'lodash'
import { TABLE_X_EXPAND_ID, TABLE_X_SELECT_ID } from '../../utils'
import { DiyTableXColumn } from './types'

/**
 * 把 selector、expander 分离出来，不参与 diy
 */
function splitColumns(
  columns: DiyTableXColumn[]
): [DiyTableXColumn[], DiyTableXColumn[]] {
  const notDiyCols: DiyTableXColumn[] = []
  const diyCols: DiyTableXColumn[] = []
  for (const column of columns) {
    if ([TABLE_X_EXPAND_ID, TABLE_X_SELECT_ID].includes(column.id as string)) {
      notDiyCols.push(column)
    } else {
      diyCols.push(column)
    }
  }
  return [notDiyCols, diyCols]
}

function generateDiyColumns(
  initialColumns: DiyTableXColumn[],
  mixColumns: DiyTableXColumn[]
): [DiyTableXColumn[], DiyTableXColumn[]] {
  const [notDiyCols, diyCols] = splitColumns(
    initialColumns.filter((column) => !column.hide)
  )
  const diyColumns = diyCols.map((column) => {
    const key = getColumnKey(column)
    // 能获取 key 才可能使用 diy
    if (key === null) {
      return column
    }

    // col 默认显示，以及 默认开启diy
    const { show = true, diyEnable = true } = column
    const newColumn: DiyTableXColumn = {
      ...column,
      key, // 把key记录下来,作为这个列的唯一标识
      show,
      diyEnable,
    }
    // localstorage中储存的列
    const localItem = mixColumns.find((v) => v.key === key)
    // localstorage的值覆盖初始值
    if (localItem) {
      newColumn.show = localItem.show
      newColumn.sequence = localItem.sequence
    }
    return newColumn
  })

  // 按mixColumns顺序排序
  // diyColumns.sort((a, b) => {
  //   return (
  //     mixColumns.findIndex((col) => col.key === a.key) -
  //     mixColumns.findIndex((col) => col.key === b.key)
  //   )
  // })

  return [notDiyCols, diyColumns]
}

function getColumnKey(column: DiyTableXColumn) {
  // 如果是字符串就取 accessor
  if (_.isString(column.accessor)) {
    return column.accessor
  } else if (_.isFunction(column.accessor) && column.id) {
    // 如果 accessor 是函数，则一定会提供 id，否则 react-table 会报错
    return column.id
  } else if (column.id) {
    // 额外的情况，有些时候只有id，比如 diy 存储就只存了 id，因为 函数没法存储
    return column.id
  }
  return null
}

/**
 * 过滤多余数据，避免复杂数据出现 JSON 循环引用报错问题
 */
function getStorageColumns(columns: DiyTableXColumn[]) {
  return columns.map((column) => {
    const { key, show, diyEnable, sequence } = column
    return { key, show, diyEnable, sequence }
  })
}

function getSortedColumns(initialColumns: DiyTableXColumn[]) {
  const sortedColumns = initialColumns.slice()
  const left = sortedColumns.filter((column) => column.fixed === 'left')
  const normal = sortedColumns.filter(
    (column) => column.fixed !== 'left' && column.fixed !== 'right'
  )
  const right = sortedColumns.filter((column) => column.fixed === 'right')
  left.sort((a, b) => {
    return (a.sequence ?? left.length) - (b.sequence ?? left.length)
  })
  normal.sort((a, b) => {
    return (a.sequence ?? normal.length) - (b.sequence ?? normal.length)
  })
  right.sort((a, b) => {
    return (a.sequence ?? right.length) - (b.sequence ?? right.length)
  })
  return [...left, ...normal, ...right]
}

export { generateDiyColumns, getStorageColumns, getSortedColumns }
