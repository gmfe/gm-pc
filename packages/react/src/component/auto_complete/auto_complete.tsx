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
  /** input value */
  value?: string
  /** 填充文本列表 */
  options?: AutoCompleteOption[]
  /** 自定义 options 外层容器类名 */
  optionsWrapClassName?: string
  /** 自定义 options 外层容器行内样式 */
  optionsWrapStyle?: CSSProperties
  /** 自定义 option 渲染 */
  renderOption?: (value: AutoCompleteOption, index: number) => ReactNode
  /** 在 options 前追加内容 */
  addonOptionsBefore?: () => ReactNode
  /** 在 options 后追加内容 */
  addonOptionsAfter?: () => ReactNode
  /** input onChange 触发、点击 option 时触发、键盘选择 option 并回车时触发 */
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

const LIST_ITEM_PROPS: React.HTMLAttributes<HTMLDivElement> = {
  onPointerDown: preventDefault,
  onMouseDown: preventDefault,
  onClick: preventDefault,
}

const listItemProps = () => LIST_ITEM_PROPS

const AutoComplete = forwardRef<AutoCompleteRef, AutoCompleteProps>((props, ref) => {
  const {
    value,
    options: externalOptions,
    optionsWrapClassName,
    optionsWrapStyle,
    onChange,
    onKeyDown,
    onBlur,
    renderOption,
    addonOptionsAfter,
    addonOptionsBefore,
    ...rest
  } = props

  const [willActiveIndex, setWillActiveIndex] = useState(0)
  const popoverNode = useRef<Popover | null>(null)
  const popoverVisible = useRef(false)
  const inputNode = useRef<HTMLInputElement | null>(null)

  const triggerPopover = (value: boolean) => {
    if (value === true && options.length <= 0) return
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
      triggerPopover(false)
      if (willActiveIndex >= 0) {
        const val = options[willActiveIndex]?.value
        if (!_.isNil(val) && value !== val) {
          onChange && onChange(val)
          return
        }
      }
      onKeyDown && onKeyDown(event)
      return
    }
    if (!popoverVisible.current) {
      onKeyDown && onKeyDown(event)
      return
    }
    if (event.key === 'Escape') {
      triggerPopover(false)
    }
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') {
      onKeyDown && onKeyDown(event)
      return
    }
    let index = willActiveIndex
    if (event.key === 'ArrowUp') {
      index--
    } else if (event.key === 'ArrowDown') {
      index++
    }
    if (index < 0) {
      index = options.length - 1
    } else if (index > options.length - 1) {
      index = 0
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
      disabled={options.length === 0}
      onVisibleChange={(visible) => {
        popoverVisible.current = visible
      }}
      popup={
        <>
          {addonOptionsBefore && <div {...LIST_ITEM_PROPS}>{addonOptionsBefore()}</div>}
          <List
            data={options}
            selected={value}
            onSelect={(val) => {
              onChange && onChange(val as string)
              triggerPopover(false)
              inputNode.current && inputNode.current.focus()
            }}
            willActiveIndex={willActiveIndex}
            className={classNames('gm-border-0', optionsWrapClassName)}
            renderItem={renderItem}
            style={{ maxHeight: 250, ...optionsWrapStyle }}
            getItemProps={listItemProps}
          />
          {addonOptionsAfter && <div {...LIST_ITEM_PROPS}>{addonOptionsAfter()}</div>}
        </>
      }
    >
      <Input
        {...rest}
        ref={inputNode}
        value={value}
        onChange={(e) => {
          const val = e.target.value
          triggerPopover(val.length === 0)
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
