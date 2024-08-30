import { createContext } from 'react'
import _ from 'lodash'

export interface SelectTableXContextOptions {
  selected: any[]
  isSelectAll: boolean
  onSelect(selected: any[], isSelected: boolean, index: number): void
  onSelectAll(): void
  /** 点击行是否要选择，对应cell有按钮、输入框、或链接的记得加上stopPropagation */
  rowSelect?: boolean
  onRowSelect<T>(selectId: T, index?: number): void
}

const SelectTableXContext = createContext<SelectTableXContextOptions>({
  selected: [],
  isSelectAll: false,
  onSelect: _.noop,
  onSelectAll: _.noop,
  onRowSelect: _.noop,
})

export default SelectTableXContext
