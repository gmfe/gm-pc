import React, {
  cloneElement,
  MouseEvent,
  ReactElement,
  ReactNode,
  CSSProperties,
} from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import SVGRemove from '../../svg/remove.svg'
import { IconDownUp } from '../icon_down_up'
import { Flex } from '../flex'

interface MultipleSelectionSelectedItem<V> {
  value: V
  text: string
  [key: string]: any
}

interface MultipleSelectionProps<V> {
  selected: MultipleSelectionSelectedItem<V>[]
  onSelect(selected: MultipleSelectionSelectedItem<V>[]): void

  placeholder?: string

  /** 自定义 selected */
  renderSelected?(item: MultipleSelectionSelectedItem<V>): ReactNode
  /** 代替默认的 Icon */
  funIcon?: ReactNode
  /** 禁用清除 */
  disabledClose?: boolean

  className?: string
  style?: CSSProperties
}

function MultipleSelection<V = any>({
  selected,
  onSelect,
  placeholder,
  renderSelected = (value: any) => value.text,
  funIcon,
  disabledClose,
  className,
  style,
  ...rest
}: MultipleSelectionProps<V>) {
  const handleClear = (e: MouseEvent<HTMLDivElement>): void => {
    e.preventDefault()
    e.stopPropagation()

    onSelect([])
  }

  const handleClose = (item: MultipleSelectionSelectedItem<V>) => {
    onSelect(_.xorBy(selected, [item], (v) => v.value))
  }

  return (
    <div
      {...rest}
      className={classNames(
        'gm-multiple-selection',
        {
          'gm-multiple-selection-disabled-close': disabledClose,
        },
        className
      )}
      style={style}
    >
      <Flex alignCenter wrap className='gm-multiple-selection-selected'>
        {selected.length === 0 && <span className='gm-text-desc'>{placeholder}</span>}
        {_.map(selected, (item: MultipleSelectionSelectedItem<V>, i) => (
          <div key={i} className='gm-multiple-selection-item'>
            {renderSelected(item)}
            <SVGRemove
              onClick={() => {
                handleClose(item)
              }}
              className='gm-multiple-selection-item-close'
            />
          </div>
        ))}
      </Flex>

      {selected && !disabledClose && (
        <div onClick={handleClear}>
          <SVGRemove className='gm-multiple-selection-icon gm-multiple-selection-close-icon' />
        </div>
      )}
      {funIcon ? (
        cloneElement(funIcon as ReactElement, {
          className: classNames(
            'gm-multiple-selection-icon',
            {
              'gm-multiple-selection-fun-icon': selected && !disabledClose,
            },
            (funIcon as ReactElement).props?.className
          ),
        })
      ) : (
        <IconDownUp
          active={(className ?? '').includes('gm-popover-active')}
          className={classNames(
            'gm-multiple-selection-icon',
            'gm-multiple-selection-down-up',
            {
              'gm-multiple-selection-fun-icon': selected && !disabledClose,
            }
          )}
        />
      )}
    </div>
  )
}

export default MultipleSelection
export type { MultipleSelectionProps, MultipleSelectionSelectedItem }
