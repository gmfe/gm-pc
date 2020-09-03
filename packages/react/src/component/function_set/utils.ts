import { FunctionSetData } from './types'
import { LevelListDataItem } from '../level_list'

interface ProcessDataWithValue {
  (
    data: FunctionSetData[],
    map: { [key: string]: any },
    pre?: string
  ): LevelListDataItem[]
}

const processDataWithValue: ProcessDataWithValue = (data, map, pre = '') => {
  return data.map((item, index) => {
    const value = `${pre}_${index}`
    map[value] = item
    if (item.children) {
      item.children = processDataWithValue(item.children, map, value)
    }
    return { value, ...item } as LevelListDataItem
  })
}

export { processDataWithValue }
