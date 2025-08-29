import React, { Component, createRef } from 'react'
import classNames from 'classnames'
import { xor, flatMap, isNil, noop } from 'lodash'
import { ListBaseProps } from './types'
import { ListDataItem } from '../../types'
import { ConfigConsumer } from '../config_provider'

class Base<V = any> extends Component<ListBaseProps<V>> {
  static defaultProps = {
    onSelect: noop,
    renderItem: (value: any) => value.text,
    getItemProps: () => ({}),
  }

  private _listRef = createRef<HTMLDivElement>()
  private _isUnMounted = false

  componentDidMount() {
    if (this.props.isScrollTo) {
      this._doScrollToSelected('.active')
      this._doScrollToSelected('.will-active')
    }
  }

  componentWillUnmount() {
    this._isUnMounted = true
  }

  componentDidUpdate() {
    if (this.props.isScrollTo) {
      this._doScrollToSelected('.will-active')
    }
  }

  public apiDoSelectWillActive = (): void => {
    const flatList = this._getFlatData()
    const { willActiveIndex } = this.props
    if (!isNil(willActiveIndex) && willActiveIndex < flatList.length) {
      this._handleSelect(flatList[willActiveIndex])
    }
  }

  private _getFlatData = () => {
    return flatMap(this.props.data, (v) => v.children)
  }

  private _doScrollToSelected = (selector: string): void => {
    // 找到第一个即可
    if (!this._isUnMounted) {
      const $active = this._listRef.current!.querySelector(selector)
      // active项超过list才scroll，用于模拟scrollIntoViewIfNeeded
      if ($active && $active.offsetTop >= this._listRef.current!.offsetHeight) {
        $active.scrollIntoView(false)
      }
    }
  }

  private _handleSelect = (item: ListDataItem<V>): void => {
    if (item.disabled) {
      return
    }
    const { multiple, selected, onSelect } = this.props
    if (multiple) {
      onSelect && onSelect(xor(selected, [item.value]))
    } else {
      onSelect && onSelect([item.value])
    }
  }

  render() {
    const {
      data,
      isGroupList,
      selected,
      multiple,
      onSelect,
      isScrollTo,
      renderItem,
      className,
      willActiveIndex,
      getItemProps,
      ...rest
    } = this.props

    let sequenceDataIndex = -1
    return (
      <ConfigConsumer>
        {({ fontSize }) => (
          <div
            {...rest}
            ref={this._listRef}
            className={classNames(
              'gm-list',
              {
                'gm-list-group': isGroupList,
                [`gm-list-text-${fontSize}`]: fontSize,
              },
              className
            )}
          >
            {data.map((group, gIndex) => (
              <div key={gIndex} className='gm-list-group-item'>
                <div className='gm-list-label'>{group.label}</div>
                {group.children.map((item, index) => {
                  sequenceDataIndex++
                  return (
                    <div
                      key={`${index}_${item.value}`}
                      {...getItemProps!(item)}
                      className={classNames('gm-list-item', {
                        active: selected.includes(item.value),
                        'will-active': willActiveIndex === sequenceDataIndex,
                        disabled: item.disabled,
                      })}
                      onClick={() => this._handleSelect(item)}
                    >
                      {renderItem!(item, index)}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        )}
      </ConfigConsumer>
    )
  }
}
export default Base
