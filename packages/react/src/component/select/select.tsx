import React, { Component, createRef, KeyboardEvent } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { SelectProps } from './types'
import { Popover } from '../popover'
import { Selection } from '../selection'
import { List } from '../list'
import { ListDataItem } from '../../types'

interface SelectState {
  willActiveIndex: number
}

class Select<V = any> extends Component<SelectProps<V>, SelectState> {
  static defaultProps = {
    canShowClose: false,
    onKeyDown: _.noop,
    popoverType: 'focus',
    all: false,
    placeholder: '',
  }

  readonly state: SelectState = {
    willActiveIndex: 0,
  }

  private _popupRef = createRef<Popover>()
  private _selectionRef = createRef<Selection>()

  public apiDoFocus = (): void => {
    this._selectionRef.current!.apiDoFocus()
  }

  public apiDoSelectWillActive = (): void => {
    const { data, onChange } = this.props
    const { willActiveIndex } = this.state
    if (data[willActiveIndex]) {
      onChange(data[willActiveIndex].value)
    }
  }

  private _handleChange = (selected: V): void => {
    const { onChange } = this.props
    this._popupRef.current!.apiDoSetActive()
    onChange(selected)
  }

  private _handleKeyDown = (event: KeyboardEvent): void => {
    const { data, onKeyDown } = this.props
    let { willActiveIndex } = this.state
    if (!onKeyDown) {
      return
    }
    if (!(event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
      onKeyDown(event)
      return
    }
    // 没有数据，不用拦截
    if (data.length === 0) {
      onKeyDown(event)
      return
    }
    // 以下是需要拦截部分
    event.preventDefault()
    if (event.key === 'ArrowUp') {
      willActiveIndex--
    } else if (event.key === 'ArrowDown') {
      willActiveIndex++
    }
    // 修正
    if (willActiveIndex < 0) {
      willActiveIndex = data.length - 1
    } else if (willActiveIndex > data.length - 1) {
      willActiveIndex = 0
    }
    this.setState({
      willActiveIndex,
    })
  }

  render() {
    const {
      data,
      value,
      all,
      onChange,
      disabled,
      renderItem,
      clean,
      className,
      popoverType,
      isInPopup,
    } = this.props
    const { willActiveIndex } = this.state

    // @ts-ignore
    const zeroItem: ListDataItem<V> = { text: '全部', value: 0 }
    if (_.isObject(all)) {
      Object.assign(zeroItem, all)
    }

    const newData: ListDataItem<V>[] = all ? [zeroItem, ...data] : [...data]

    const selected = newData.find((v) => v.value === value)

    const popup = (
      <List
        data={newData}
        selected={value}
        onSelect={this._handleChange}
        renderItem={renderItem}
        willActiveIndex={willActiveIndex}
        className='gm-border-0'
        style={{ maxHeight: '250px' }}
      />
    )

    const handleChange = (selected: V) => {
      onChange(selected)
    }

    return (
      <Popover
        ref={this._popupRef}
        type={popoverType}
        disabled={disabled}
        popup={popup}
        isInPopup={isInPopup}
      >
        <Selection
          ref={this._selectionRef}
          selected={selected}
          onSelect={handleChange}
          disabled={disabled}
          disabledClose
          clean={clean}
          className={classNames('gm-select', className)}
          noInput
          onKeyDown={this._handleKeyDown}
        />
      </Popover>
    )
  }
}

export default Select
