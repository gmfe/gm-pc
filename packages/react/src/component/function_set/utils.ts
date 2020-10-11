import { FunctionSetData } from './types'
import { TreeDataItem } from '../../types'

interface ProcessDataWithValue {
  (data: FunctionSetData[], map: { [key: string]: any }, pre?: string): TreeDataItem<
    string
  >[]
}

const processDataWithValue: ProcessDataWithValue = (data, map, pre = '') => {
  return data.map((item, index) => {
    const value = `${pre}_${index}`
    map[value] = item
    if (item.children) {
      item.children = processDataWithValue(item.children, map, value)
    }
    return { value, ...item } as TreeDataItem<string>
  })
}

export { processDataWithValue }
