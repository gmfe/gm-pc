import React, { Component, createRef, KeyboardEvent } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { SelectProps } from './types'
import { Popover } from '../popover'
import { Selection } from '../selection'
import { List } from '../list'
import { ListDataItem } from '../../types'
import { judgeFunction } from '../../common/utils'
import { ConfigConsumer, ConfigProvider } from '../config_provider'
import { ConfigProviderProps, FontSizeType } from '../config_provider/config_provider'
import { getLocale } from '@gm-pc/locales'

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
    const { data = [], onChange } = this.props
    const { willActiveIndex } = this.state
    if (data[willActiveIndex]) {
      judgeFunction(onChange, data[willActiveIndex].value)
    }
  }

  private _handleChange = (selected: V): void => {
    const { onChange } = this.props
    this._popupRef.current!.apiDoSetActive()
    judgeFunction(onChange, selected)
  }

  private _handleKeyDown = (event: KeyboardEvent): void => {
    const { data = [], onKeyDown } = this.props
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
      data = [],
      value,
      all,
      disabled,
      renderItem,
      clean,
      renderSelected,
      className,
      popoverType,
      isInPopup,
      addonLast,
      ...rest
    } = this.props
    const { willActiveIndex } = this.state

    const zeroItem = ({
      text: getLocale('全部'),
      value: 0,
    } as unknown) as ListDataItem<V>
    if (_.isObject(all)) {
      Object.assign(zeroItem, all)
    }

    const newData: ListDataItem<V>[] = all ? [zeroItem, ...data] : [...data]

    const selected = newData.find((v) => v.value === value)

    const popup = (config?: ConfigProviderProps) => (
      <>
        <ConfigProvider {...config}>
          <List
            data={newData}
            selected={value}
            onSelect={this._handleChange}
            renderItem={renderItem}
            willActiveIndex={willActiveIndex}
            className='gm-border-0'
            style={{ maxHeight: '250px' }}
          />
          {addonLast && (
            <div
              onClick={() => {
                this._popupRef.current!.apiDoSetActive()
              }}
            >
              {addonLast}
            </div>
          )}
        </ConfigProvider>
      </>
    )

    // disabledClose 了，不会触发
    const handleChange = _.noop

    return (
      <ConfigConsumer>
        {(config) => (
          <Popover
            ref={this._popupRef}
            type={popoverType}
            disabled={disabled}
            popup={popup(config)}
            isInPopup={isInPopup}
          >
            <Selection
              {...rest}
              ref={this._selectionRef}
              selected={selected}
              onSelect={handleChange}
              disabled={disabled}
              disabledClose
              clean={clean}
              renderSelected={renderSelected}
              className={classNames('gm-select', className)}
              noInput
              onKeyDown={this._handleKeyDown}
            />
          </Popover>
        )}
      </ConfigConsumer>
    )
  }
}

export default Select
