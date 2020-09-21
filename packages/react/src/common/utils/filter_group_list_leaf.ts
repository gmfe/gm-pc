interface GroupListItem<V> {
  children?: V[]
  [key: string]: any
}

/**
 * 筛选叶子结点，返回满足 predicate 筛选后的数
 */
function filterGroupListLeaf<V extends GroupListItem<V>>(
  list: V[],
  predicate: (item: V) => boolean
) {
  return list
    .map((item) => {
      const copy = Object.assign({}, item)
      if (copy.children) {
        copy.children = filterGroupListLeaf<V>(copy.children, predicate)
      }
      return copy
    })
    .filter((item) => {
      if (item.children) {
        return !!item.children.length
      } else {
        return predicate(item)
      }
    })
}

export default filterGroupListLeaf
