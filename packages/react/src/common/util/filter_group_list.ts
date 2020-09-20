interface ListGroupItem<V> {
  children?: V[]
  [key: string]: any
}

/**
 * 筛选所有节点，满足返回 predicate 条件的树
 */
function filterGroupList<V extends ListGroupItem<V>>(
  list: V[],
  predicate: (item: V) => boolean
): V[] {
  return list
    .map((item) => {
      // 会修改 item children ，所以 copy 下
      const copy = { ...item }

      // 如果满足，则整个树都符合
      if (predicate(copy)) {
        return copy
      }

      // 否则进入 children 继续判断
      if (copy.children) {
        copy.children = filterGroupList<V>(copy.children, predicate)
      }

      return copy
    })
    .filter((item) => {
      // 对于有 children 的
      if (item.children) {
        return !!item.children.length
      }
      // 没有 children 的判断当前
      return predicate(item)
    })
}

export default filterGroupList
