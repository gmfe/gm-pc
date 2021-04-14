import React, { Component, createRef } from 'react'
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
    const { onSelect = _.noop, multiple } = this.props
    if (multiple) {
      onSelect(selected)
    } else {
      onSelect(selected[0])
    }
  }

  _handleSearch = (searchWord: string, data: MoreSelectGroupDataItem<V>[]) => {
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
      multiple,
      isGroupList,
      onSearch,
      renderListFilter,
      ...rest
    } = this.props
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
    let oSelected: MoreSelectDataItem<V>[]
    if (multiple) {
      oSelected = selected as MoreSelectDataItem<V>[]
    } else {
      oSelected = selected ? [selected as MoreSelectDataItem<V>] : []
    }

    return (
      <MoreSelectBase<V>
        {...rest}
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
