import { TableXColumn } from '../base'
import { __DEFAULT_COLUMN } from './constant'

function asPx(value: any) {
  value = Number(value)
  return Number.isNaN(value) ? undefined : `${value}px`
}

function getFirstDefined(a?: number | string, b?: number | string) {
  if (
    a === __DEFAULT_COLUMN.width &&
    (b === __DEFAULT_COLUMN.minWidth || b === __DEFAULT_COLUMN.maxWidth)
  ) {
    return undefined
  } else if (a !== __DEFAULT_COLUMN.width) {
    return a
  } else {
    return b
  }
}

// width 200 => flex: 200 0 auto; width: 200px; max-width: 200px;
// maxWidth 300 => max-width: 300px;
// minWidth 200 => flex: 200 0 auto; width: 200px;
// minWidth 50 width 100 => flex: 100 0 auto; width: 100px; max-width: 100px;
function getColumnStyle({ width, minWidth, maxWidth }: TableXColumn) {
  const _width = getFirstDefined(width, minWidth)
  const _maxWidth = getFirstDefined(width, maxWidth)
  return {
    flex: `${_width} 0 auto`,
    width: asPx(_width),
    maxWidth: asPx(_maxWidth),
  }
}

const getPx = (val: string) => {
  const pattern = /^(\d+)px$/

  return val?.match(pattern)?.[1]
}

export function getColumnFixedWidth(
  columns: TableXColumn[],
  tableSize: Record<string, string>
) {
  const leftFixSum: Record<string, number> = {}

  let sum = 0

  columns.forEach((column) => {
    const tempSum = +(getPx(tableSize?.[column.id!]) || (column as any).totalWidth)
    leftFixSum[column.id!] = sum
    sum += tempSum
  })

  return {
    leftFixSum,
  }
}

export default getColumnStyle
