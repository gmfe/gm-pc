import { pinYinFilter } from '@gm-common/tool'
import { MoreSelectGroupDataItem, MoreSelectDataItem } from './types'

function renderListFilterDefault(
  data: MoreSelectGroupDataItem[],
  query: string
): MoreSelectGroupDataItem[] {
  const result: MoreSelectGroupDataItem[] = []
  data.forEach((item) => {
    const list = item.children.filter((child) => child.text.includes(query))
    if (list.length) {
      result.push({ ...item, children: list })
    }
  })
  return result
}

function renderListFilterPinYin(
  data: MoreSelectGroupDataItem[],
  query: string
): MoreSelectGroupDataItem[] {
  const result: MoreSelectGroupDataItem[] = []
  data.forEach((item) => {
    const list = pinYinFilter(item.children, query, (v) => (v as MoreSelectDataItem).text)
    if (list.length) {
      result.push({
        ...item,
        children: list as MoreSelectDataItem[],
      })
    }
  })
  return result
}

export { renderListFilterDefault, renderListFilterPinYin }
