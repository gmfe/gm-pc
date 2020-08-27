import React, { Component, createRef } from 'react'
import { Value, ListProps, ListBaseDataItem, ListBaseGroupDataItem } from './types'
import Base from './base'
import { warn, devWarn } from '@gm-common/tool'
import _ from 'lodash'

class List extends Component<ListProps> {
  static defaultProps = {
    onSelect: _.noop,
    renderItem: (value: ListBaseDataItem) => value.text,
    getItemProps: () => ({}),
  }

  private _baseRef = createRef<Base>()

  constructor(props: ListProps) {
    super(props)
    devWarn(() => {
      if (props.multiple && !_.isArray(props.selected)) {
        // @ts-ignore
        warn('多选情况下 selected 请传数组')
      }
    })
  }

  public apiDoSelectWillActive = (): void => {
    this._baseRef.current!.apiDoSelectWillActive()
  }

  private _handleSelect = (selected: Value[]): void => {
    const { multiple, onSelect } = this.props
    if (multiple) {
      onSelect && onSelect(selected)
    } else {
      onSelect && onSelect(selected[0])
    }
  }

  render() {
    const { data, selected, multiple, isGroupList, ...rest } = this.props
    let oData: ListBaseGroupDataItem[]
    if (isGroupList) {
      oData = data as ListBaseGroupDataItem[]
    } else {
      oData = [{ label: '', children: data as ListBaseDataItem[] }]
    }

    let oSelected: Value[]
    if (multiple) {
      oSelected = (selected as Value[]) ?? []
    } else {
      oSelected = _.isNil(selected) ? [] : [selected as Value]
    }
    return (
      <Base
        {...rest}
        ref={this._baseRef}
        selected={oSelected}
        data={oData}
        onSelect={this._handleSelect}
        multiple={multiple}
        isGroupList={isGroupList}
      />
    )
  }
}

export default List
