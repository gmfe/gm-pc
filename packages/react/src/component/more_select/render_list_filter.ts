import { pinYinFilter } from '@gm-common/tool'
import { MoreSelectGroupDataItem, MoreSelectDataItem } from './types'

function renderListFilterDefault<V>(
  data: MoreSelectGroupDataItem<V>[],
  query: string
): MoreSelectGroupDataItem<V>[] {
  const result: MoreSelectGroupDataItem<V>[] = []
  data.forEach((item) => {
    const list = item.children.filter((child) => child.text.includes(query))
    if (list.length) {
      result.push({ ...item, children: list })
    }
  })
  return result
}

function renderListFilterPinYin<V>(
  data: MoreSelectGroupDataItem<V>[],
  query: string
): MoreSelectGroupDataItem<V>[] {
  const result: MoreSelectGroupDataItem<V>[] = []
  data.forEach((item) => {
    const list = pinYinFilter(
      item.children,
      query,
      (v) => (v as MoreSelectDataItem<V>).text
    )
    if (list.length) {
      result.push({
        ...item,
        children: list as MoreSelectDataItem<V>[],
      })
    }
  })
  return result
}

export { renderListFilterDefault, renderListFilterPinYin }
