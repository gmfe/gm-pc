import React, {
  useRef,
  useState,
  useMemo,
  useEffect,
  InputHTMLAttributes,
  CSSProperties,
  ReactNode,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { Input } from '../input'
import { Popover } from '../popover'
import { List } from '../list'

import _ from 'lodash'
import classNames from 'classnames'
import { ListDataItem } from '../../types'

export interface AutoCompleteOption {
  value: string
}

type InputProps = InputHTMLAttributes<HTMLInputElement>

export interface AutoCompleteProps extends Omit<InputProps, 'value' | 'onChange'> {
  value?: string
  options?: AutoCompleteOption[]
  popoverClassName?: string
  popoverStyle?: CSSProperties
  renderOption?: (value: AutoCompleteOption, index: number) => ReactNode
  onChange?: (value: string) => void
}

export interface AutoCompleteRef {
  /** input DOM 节点 */
  input?: HTMLInputElement | null
  /** 控制弹出层显示 */
  triggerPopover: (value: boolean) => void
}

const preventDefault = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
  e.preventDefault()
}

const AutoComplete = forwardRef<AutoCompleteRef, AutoCompleteProps>((props, ref) => {
  const {
    value,
    options: externalOptions,
    popoverClassName,
    popoverStyle,
    onChange,
    onKeyDown,
    onBlur,
    renderOption,
    ...rest
  } = props

  const [willActiveIndex, setWillActiveIndex] = useState(0)
  const popoverNode = useRef<Popover | null>(null)
  const inputNode = useRef<HTMLInputElement | null>(null)

  const triggerPopover = (value: boolean) => {
    popoverNode.current && popoverNode.current.apiDoSetActive(value)
  }

  const options = useMemo(() => {
    return _.map(externalOptions, (item) => ({ text: item.value, value: item.value }))
  }, [externalOptions])

  useEffect(() => {
    if (_.isNil(value) || options.length <= 0) return
    setWillActiveIndex(() => {
      return options.findIndex((item) => item.value === value)
    })
  }, [value, options])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onChange && onChange(options[willActiveIndex].value)
      triggerPopover(false)
    }
    if (event.key === 'Escape') {
      triggerPopover(false)
    }
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
      onKeyDown && onKeyDown(event)
      return
    }
    let index = willActiveIndex
    if (event.key === 'ArrowUp' && index === 0) {
      event.preventDefault()
      onKeyDown && onKeyDown(event)
      return
    }
    if (event.key === 'ArrowDown' && index === options.length - 1) {
      event.preventDefault()
      onKeyDown && onKeyDown(event)
      return
    }
    event.preventDefault()
    if (event.key === 'ArrowUp') {
      index -= 1
    } else if (event.key === 'ArrowDown') {
      index += 1
    }
    if (index < 0) {
      index = 0
    } else if (index > options.length - 1) {
      index = options.length - 1
    }
    setWillActiveIndex(index)
  }

  const renderItem = useMemo(() => {
    if (renderOption) {
      return (value: ListDataItem<string>, index: number) => {
        return renderOption({ value: value.value }, index)
      }
    }
    return undefined
  }, [renderOption])

  useImperativeHandle(ref, () => {
    return {
      input: inputNode.current,
      triggerPopover,
    }
  })

  return (
    <Popover
      ref={popoverNode}
      type='click'
      popup={
        <List
          data={options}
          selected={value}
          onSelect={(val) => {
            onChange && onChange(val as string)
            triggerPopover(false)
            inputNode.current && inputNode.current.focus()
          }}
          willActiveIndex={willActiveIndex}
          className={classNames('gm-border-0', popoverClassName)}
          renderItem={renderItem}
          style={popoverStyle}
          getItemProps={() => ({
            onPointerDown: preventDefault,
            onMouseDown: preventDefault,
            onClick: preventDefault,
          })}
        />
      }
    >
      <Input
        {...rest}
        ref={inputNode}
        value={value}
        onChange={(e) => {
          const val = e.target.value
          if (val.length === 0) {
            triggerPopover(true)
          }
          onChange && onChange(val)
        }}
        onBlur={(e) => {
          triggerPopover(false)
          onBlur && onBlur(e)
        }}
        onKeyDown={handleKeyDown}
      />
    </Popover>
  )
})

export default AutoComplete
