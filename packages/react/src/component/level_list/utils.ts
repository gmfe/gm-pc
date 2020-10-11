/**
 * 将树状数据平铺成多个数组，方便展示数据浮层
 */
import { TreeDataItem } from '../../types'

function getLevel<V>(data: TreeDataItem<V>[], selected: V[]): TreeDataItem<V>[][] {
  const result = [data]
  selected.forEach((item, index) => {
    const match = result[index].find((v) => v.value === item)
    if (match) {
      if (match.children) {
        result.push(match.children)
      }
    }
  })
  return result
}

export { getLevel }
