import React, { Component, createRef, ReactNode, KeyboardEvent } from 'react'
import { LevelSelectDataItem, LevelSelectProps } from './types'
import { Selection } from '../selection'
import { Popover } from '../popover'
import { Flex } from '../flex'
import { LevelList } from '../level_list'
import { getLevel } from '../level_list/utils'
import _ from 'lodash'
import { judgeFunction } from '../../common/utils'

interface LevelSelectState<V> {
  willActiveSelected: V[]
}

class LevelSelect<V = any> extends Component<LevelSelectProps<V>, LevelSelectState<V>> {
  static defaultProps = {
    renderSelected: (item: any) => item.map((v: any) => v.text).join(','),
    onKeyDown: _.noop,
    popoverType: 'focus',
    selected: [],
    onSelect: _.noop,
  }

  readonly state: LevelSelectState<V> = {
    willActiveSelected: this.props.selected,
  }

  private _selectionRef = createRef<Selection>()
  private _popoverRef = createRef<Popover>()

  public apiDoFocus = (): void => {
    this._selectionRef.current!.apiDoFocus()
  }

  public apiDoSelectWillActive = (): void => {
    const { onSelect } = this.props
    const { willActiveSelected } = this.state
    judgeFunction(onSelect, willActiveSelected)
  }

  private _handleSelect = (selected: V[]): void => {
    const { onSelect } = this.props
    this._popoverRef.current!.apiDoSetActive(false)
    judgeFunction(onSelect, selected)
  }

  private _handleWillActiveSelect = (willActiveSelected: V[]): void => {
    this.setState({ willActiveSelected })
  }

  private _renderPopup = (): ReactNode => {
    const { titles, data, selected, right, onlySelectLeaf } = this.props
    console.log('level_select-data', data, this.props)
    const { willActiveSelected } = this.state
    return (
      <Flex justifyEnd={right}>
        <LevelList<V>
          isReverse={right}
          data={data}
          onWillActiveSelect={this._handleWillActiveSelect}
          willActiveSelected={willActiveSelected}
          selected={selected}
          onSelect={this._handleSelect}
          titles={titles}
          onlySelectLeaf={onlySelectLeaf}
        />
      </Flex>
    )
  }

  private _handleSelectionSelect = (selected: V[] | null): void => {
    const { onSelect } = this.props
    judgeFunction(onSelect, selected === null ? [] : selected)
  }

  private _getSelectItemText = (): ReactNode => {
    const { renderSelected } = this.props
    const selectedItems = this._getSelectedItem()
    return renderSelected!(selectedItems)
  }

  private _getSelectedItem = (): LevelSelectDataItem<V>[] => {
    const { data, selected = [] } = this.props
    const items: LevelSelectDataItem<V>[] = []
    selected.forEach((value, index) => {
      const match = (index === 0 ? data : items[index - 1].children)!.find(
        (item) => item.value === value
      )
      items.push(match!)
    })
    return items
  }

  private _handleKeyDown = (event: KeyboardEvent): void => {
    const { data = [], onKeyDown } = this.props
    const { willActiveSelected } = this.state

    // 不是方向键，不用拦截
    if (
      event.key !== 'ArrowDown' &&
      event.key !== 'ArrowUp' &&
      event.key !== 'ArrowLeft' &&
      event.key !== 'ArrowRight'
    ) {
      onKeyDown!(event)
      return
    }

    // 没有数据，不拦截
    if (data.length === 0) {
      onKeyDown!(event)
      return
    }

    // 避免引用
    let newWill = willActiveSelected.slice()
    const level = getLevel(data, willActiveSelected)

    // 如果没法左和右了，则不拦截，抛出去
    if (
      (event.key === 'ArrowLeft' && newWill.length === 0) ||
      (event.key === 'ArrowRight' && newWill.length >= level.length)
    ) {
      onKeyDown!(event)
      return
    }

    // 以下要拦截拉

    // 阻止默认行为
    event.preventDefault()

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      // 如果没有选择，则默认到第一个
      if (newWill.length === 0) {
        newWill = [level[0][0].value]
      } else {
        const arr = level[newWill.length - 1]
        let index = _.findIndex(arr, (v) => v.value === newWill[newWill.length - 1])

        if (event.key === 'ArrowDown') {
          index++
        } else {
          index--
        }

        // fix index
        if (index > arr.length - 1) {
          index = 0
        } else if (index < 0) {
          index = arr.length - 1
        }

        newWill[newWill.length - 1] = arr[index].value
      }
    } else if (event.key === 'ArrowLeft') {
      newWill.pop()
    } else if (event.key === 'ArrowRight') {
      newWill.push(level[newWill.length][0].value)
    }

    this.setState({
      willActiveSelected: newWill,
    })
  }

  private _renderTarget = (): ReactNode => {
    const {
      titles = [],
      data = [],
      selected = [],
      disabled,
      popoverType,
      right,
      onlySelectLeaf,
      ...rest
    } = this.props

    // 注意转换 selected onSelect renderSelected
    return (
      <Selection
        {...rest}
        ref={this._selectionRef}
        selected={!selected.length ? null : selected}
        onSelect={this._handleSelectionSelect}
        renderSelected={() => this._getSelectItemText()}
        onKeyDown={this._handleKeyDown}
        disabled={disabled}
      />
    )
  }

  render() {
    const { disabled, children, popoverType, right } = this.props
    console.log('level-select-children', children)
    console.log('level-select-this._renderTarget()', this._renderTarget())
    return (
      <Popover
        ref={this._popoverRef}
        right={right}
        disabled={disabled}
        popup={this._renderPopup}
        type={popoverType}
        pureContainer
      >
        {children ?? this._renderTarget()}
      </Popover>
    )
  }
}

export default LevelSelect
