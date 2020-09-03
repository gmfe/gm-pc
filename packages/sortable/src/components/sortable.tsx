import React, { useMemo } from 'react'
import classNames from 'classnames'
import { devWarnForHook } from '@gm-common/tool'
import { Value, SortableDataItem, SortableProps } from './types'
import SortableBase from './sortable_base'

const Sortable = ({
  data,
  onChange,
  groupValues,
  renderItem = (item: SortableDataItem) => item.text,
  itemProps = {},
  tag,
  options = {},
  ...rest
}: SortableProps) => {
  devWarnForHook(() => {
    if (groupValues && !options.group) {
      console.warn('groupValues need options.group')
    }
  })

  let filterData = data
  if (groupValues) {
    filterData = data.filter((value) => groupValues.includes(value.value))
  }

  const handleChange = (values: string[]) => {
    // 因为 SortableJS 默认吐出来都是 string，所以需要反编译拿回原来的类型
    const newValues: Value[] = values.map((value) => JSON.parse(value))
    const newValuesMap = new Map<string, SortableDataItem>()
    data.forEach((value) => {
      newValuesMap.set(value.value, value)
    })
    const newData: SortableDataItem[] = newValues.map((value) => newValuesMap.get(value)!)
    onChange(newData)
  }

  const items = useMemo(
    () =>
      filterData.map((value, index) => (
        <div
          key={value.value as any}
          data-id={JSON.stringify(value.value)}
          {...itemProps}
          className={classNames(
            { 'gm-cursor-grab': !options.handle },
            itemProps.className
          )}
        >
          {renderItem(value, index)}
        </div>
      )),
    [filterData, renderItem, itemProps, options.handle]
  )

  return (
    <SortableBase
      {...rest}
      tag={tag}
      options={{ animation: 150, ...options }}
      onChange={handleChange}
    >
      {items}
    </SortableBase>
  )
}
export default Sortable
