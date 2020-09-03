import React, { Component, createRef } from 'react'
import _ from 'lodash'
import { MoreSelectDataItem, MoreSelectGroupDataItem, MoreSelectProps } from './types'
import MoreSelectBase from './base'

class MoreSelect extends Component<MoreSelectProps> {
  static defaultProps = {
    renderSelected: (item: MoreSelectDataItem) => item.text,
    delay: 500,
    renderListItem: (item: MoreSelectDataItem) => item.text,
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

  render() {
    const { data, selected, multiple, isGroupList, ...rest } = this.props
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
      />
    )
  }
}

export default MoreSelect
