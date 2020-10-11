import _ from 'lodash'
import { LevelSelectDataItem } from './types'

function getItems<V>(
  data: LevelSelectDataItem<V>[],
  selected: V[]
): LevelSelectDataItem<V>[] {
  const items: LevelSelectDataItem<V>[] = []
  selected.forEach((value, index) => {
    const list = index === 0 ? data : items[index - 1].children

    const match = _.find(list, (item) => item.value === value)

    items.push(match!)
  })

  return items
}

export { getItems }
