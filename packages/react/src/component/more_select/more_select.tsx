import React, { Component, createRef, ChangeEvent } from 'react'
import _ from 'lodash'
import { MoreSelectDataItem, MoreSelectGroupDataItem, MoreSelectProps } from './types'
import MoreSelectBase from './base'

class MoreSelect<V = any> extends Component<MoreSelectProps<V>> {
  static defaultProps = {
    renderSelected: (item: MoreSelectDataItem<any>) => item.text,
    renderListItem: (item: MoreSelectDataItem<any>) => item.text,
    delay: 500,
    listHeight: '180px',
    renderListFilterType: 'default',
    popoverType: 'focus',
    onKeyDown: _.noop,
  }

  private _moreSelectBaseRef = createRef<MoreSelectBase>()

  public apiDoFocus = (): void => {
    this._moreSelectBaseRef.current!.apiDoFocus()
  }

  public apiDoSelectWillActive = (): void => {
    this._moreSelectBaseRef.current!.apiDoSelectWillActive()
  }

  private _handleSelect = (selected: MoreSelectDataItem<V>[]): void => {
    const { onSelect = _.noop, onChange = _.noop, multiple } = this.props
    const tempSelected = multiple ? selected : selected[0]
    // selected[0]?.value： selected[0]有可能为undefined，直接取value会报错
    const value = multiple ? selected.map((item) => item.value) : selected[0]?.value
    onSelect(tempSelected)
    // 回调时将value传回
    onChange(value)
  }

  public _handleSearch = (searchWord?: string, data: MoreSelectGroupDataItem<V>[]) => {
    const { onSearch, isGroupList } = this.props
    if (!onSearch) {
      return
    }

    let oData

    if (isGroupList) {
      oData = data
    } else {
      oData = data[0].children
    }

    return onSearch(searchWord, oData)
  }

  public _handleInitSearch = (q?: string) => {
    // eslint-disable-next-line no-unused-expressions
    this._moreSelectBaseRef?.current?._handleChange(
      {
        target: { value: q },
      } as ChangeEvent<HTMLInputElement>,
      true
    )
  }

  _renderListFilter = (data: MoreSelectGroupDataItem<V>[], searchValue: string) => {
    const { renderListFilter, isGroupList } = this.props
    if (!renderListFilter) {
      return data
    }

    if (isGroupList) {
      return renderListFilter(data, searchValue) as MoreSelectGroupDataItem<V>[]
    } else {
      const list = renderListFilter(data[0].children, searchValue)
      return [{ label: '', children: list }] as MoreSelectGroupDataItem<V>[]
    }
  }

  render() {
    const {
      data = [],
      selected,
      value,
      multiple,
      isGroupList,
      onSearch,
      onClick,
      renderListFilter,
      ...rest
    } = this.props
    let tempSelect = selected as MoreSelectDataItem<V>[]
    // MoreSelect支持value和onChange
    const tempValue = Array.isArray(value) ? value : [value]
    let oData: MoreSelectGroupDataItem<V>[]
    if (isGroupList) {
      oData = data as MoreSelectGroupDataItem<V>[]
    } else {
      oData = [
        {
          label: '',
          children: data as MoreSelectDataItem<V>[],
        },
      ]
    }
    // 如果没有传入selected
    if (!selected) {
      /**
       *  则通过value获取selected
       *  将oData的children二维数据展开为1位[{value, text}, ...]
       *  获取在value中的item
       * */
      tempSelect = oData
        .map((item) => item.children)
        .flat(2)
        .filter((item) => tempValue?.includes(item.value)) as MoreSelectDataItem<V>[]
    }
    const oSelected: MoreSelectDataItem<V>[] = Array.isArray(tempSelect)
      ? tempSelect
      : [tempSelect].filter(Boolean)

    return (
      <MoreSelectBase<V>
        {...rest}
        onClick={onClick}
        ref={this._moreSelectBaseRef}
        data={oData}
        selected={oSelected}
        onSelect={this._handleSelect}
        multiple={multiple}
        isGroupList={isGroupList}
        onSearch={onSearch && this._handleSearch}
        renderListFilter={renderListFilter && this._renderListFilter}
      />
    )
  }
}

export default MoreSelect
