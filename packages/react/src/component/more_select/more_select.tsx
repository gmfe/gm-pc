import React, { Component, createRef } from 'react'
import _ from 'lodash'
import { MoreSelectDataItem, MoreSelectGroupDataItem, MoreSelectProps } from './types'
import MoreSelectBase from './base'

class MoreSelect extends Component<MoreSelectProps> {
  static defaultProps = {
    renderSelected: (item: MoreSelectDataItem) => item.text,
    renderListItem: (item: MoreSelectDataItem) => item.text,
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

  private _handleSelect = (selected: MoreSelectDataItem[]): void => {
    const { onSelect, multiple } = this.props
    if (multiple) {
      onSelect(selected)
    } else {
      onSelect(selected[0])
    }
  }

  _handleSearch = (searchWord: string, data: MoreSelectGroupDataItem[]) => {
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

  _renderListFilter = (data: MoreSelectGroupDataItem[], searchValue: string) => {
    const { renderListFilter, isGroupList } = this.props
    if (!renderListFilter) {
      return data
    }

    if (isGroupList) {
      return renderListFilter(data, searchValue) as MoreSelectGroupDataItem[]
    } else {
      const list = renderListFilter(data[0].children, searchValue)
      return [{ label: '', children: list }] as MoreSelectGroupDataItem[]
    }
  }

  render() {
    const {
      data,
      selected,
      multiple,
      isGroupList,
      onSearch,
      renderListFilter,
      ...rest
    } = this.props
    let oData: MoreSelectGroupDataItem[]
    if (isGroupList) {
      oData = data as MoreSelectGroupDataItem[]
    } else {
      oData = [
        {
          label: '',
          children: data as MoreSelectDataItem[],
        },
      ]
    }
    let oSelected: MoreSelectDataItem[]
    if (multiple) {
      oSelected = selected as MoreSelectDataItem[]
    } else {
      oSelected = selected ? [selected as MoreSelectDataItem] : []
    }

    return (
      <MoreSelectBase
        {...rest}
        ref={this._moreSelectBaseRef}
        data={oData}
        selected={oSelected}
        onSelect={this._handleSelect}
        multiple={multiple}
        isGroupList={isGroupList}
        onSearch={this._handleSearch}
        renderListFilter={this._renderListFilter}
      />
    )
  }
}

export default MoreSelect
