import React, {
  Component,
  createRef,
  RefObject,
  cloneElement,
  ReactElement,
  ReactNode,
  KeyboardEvent,
  CSSProperties,
} from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import SVGCloseCircle from '../../svg/close-circle.svg'
import { IconDownUp } from '../icon_down_up'

type Selected = any

interface SelectionProps {
  selected?: Selected
  onSelect(selected?: Selected): void

  disabled?: boolean
  placeholder?: string

  /** 自定义 selected */
  renderSelected?(value?: Selected): ReactNode
  /** 代替默认的 Icon */
  funIcon?: ReactNode
  /** 无边框 */
  clean?: boolean
  /** 禁用清除 */
  disabledClose?: boolean

  /** 给键盘用 */
  onKeyDown?(event: KeyboardEvent): void
  className?: string
  style?: CSSProperties

  /** 给 Select 定制 */
  noInput?: boolean
}

class Selection extends Component<SelectionProps> {
  static defaultProps = {
    renderSelected: (value: { text: string }) => value.text,
  }

  private _inputRef = createRef<HTMLInputElement | HTMLDivElement>()

  public apiDoFocus = (): void => {
    this._inputRef.current!.focus()
  }

  private _handleClear = (): void => {
    const { onSelect, disabled } = this.props
    if (disabled) {
      return
    }
    onSelect(null)
  }

  render() {
    const {
      selected,
      onSelect,
      disabled,
      renderSelected,
      placeholder,
      funIcon,
      clean,
      disabledClose,
      className,
      onKeyDown,
      noInput,
      ...rest
    } = this.props
    let text = ''
    if (renderSelected && !_.isNil(selected)) {
      text = renderSelected(selected) as string
    }

    return (
      <div
        {...rest}
        className={classNames(
          'gm-selection',
          {
            disabled,
            'gm-selection-disabled-clean': clean,
            'gm-selection-disabled-close': disabledClose,
          },
          className
        )}
      >
        {noInput ? (
          <div
            ref={this._inputRef}
            // @ts-ignore
            disabled={disabled}
            className='gm-form-control gm-selection-selected'
            tabIndex={0}
            onKeyDown={onKeyDown}
          >
            {text || placeholder}
          </div>
        ) : (
          <input
            type='text'
            ref={this._inputRef as RefObject<HTMLInputElement>}
            disabled={disabled}
            value={text}
            onChange={() => _.noop()}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className='gm-form-control gm-selection-selected'
          />
        )}
        {selected && !disabledClose && !clean && (
          <SVGCloseCircle
            onClick={this._handleClear}
            className='gm-selection-icon gm-selection-close-icon'
          />
        )}
        {funIcon ? (
          cloneElement(funIcon as ReactElement, {
            className: classNames(
              'gm-selection-icon',
              {
                'gm-selection-fun-icon': selected && !disabledClose && !clean,
              },
              (funIcon as ReactElement).props?.className
            ),
          })
        ) : (
          <IconDownUp
            disabled={disabled}
            active={(className ?? '').includes('gm-popover-active')}
            className={classNames('gm-selection-icon', 'gm-selection-down-up', {
              'gm-selection-fun-icon': selected && !disabledClose && !clean,
            })}
          />
        )}
      </div>
    )
  }
}

export default Selection
export type { SelectionProps }
