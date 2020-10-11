import React, { Component, createRef } from 'react'
import { ListProps } from './types'
import Base from './base'
import _ from 'lodash'
import { ListDataItem, ListGroupDataItem } from '../../types'

class List<V = any> extends Component<ListProps<V>> {
  static defaultProps = {
    onSelect: _.noop,
    renderItem: (value: any) => value.text,
    getItemProps: () => ({}),
  }

  private _baseRef = createRef<Base<V>>()

  public apiDoSelectWillActive = (): void => {
    this._baseRef.current!.apiDoSelectWillActive()
  }

  private _handleSelect = (selected: V[]): void => {
    const { multiple, onSelect } = this.props
    if (multiple) {
      // @ts-ignore
      onSelect && onSelect(selected)
    } else {
      // @ts-ignore
      onSelect && onSelect(selected[0])
    }
  }

  render() {
    const { data, selected, multiple, isGroupList, ...rest } = this.props

    let oData: ListGroupDataItem<V>[]
    if (isGroupList) {
      oData = data as ListGroupDataItem<V>[]
    } else {
      oData = [{ label: '', children: data as ListDataItem<V>[] }]
    }

    let oSelected: V[]
    if (multiple) {
      oSelected = (selected as V[]) ?? []
    } else {
      oSelected = _.isNil(selected) ? [] : [selected as V]
    }
    return (
      <Base<V>
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
