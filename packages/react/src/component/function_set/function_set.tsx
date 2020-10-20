import React, { Component, createRef, FC, HTMLAttributes } from 'react'
import { FunctionSetData, FunctionSetProps } from './types'
import { Popover } from '../popover'
import Overlay from './overlay'
import { Button } from '../button'
import { getLocale } from '@gm-pc/locales'
import { IconDownUp } from '../icon_down_up'

interface InnerProps extends HTMLAttributes<HTMLDivElement> {
  disabled: boolean
}

const Inner: FC<InnerProps> = ({ disabled, className, children, ...rest }) => {
  return (
    <div className='gm-inline-block' {...rest}>
      {children ?? (
        <Default
          active={(className ?? '').includes('gm-popover-active')}
          disabled={disabled}
        />
      )}
    </div>
  )
}

interface DefaultProps {
  disabled: boolean
  active: boolean
}

const Default: FC<DefaultProps> = ({ disabled, active }) => {
  return (
    <Button type='primary' plain disabled={disabled}>
      {getLocale('更多功能')} &nbsp;
      <IconDownUp active={active} />
    </Button>
  )
}

class FunctionSet extends Component<FunctionSetProps> {
  private _popoverRef = createRef<Popover>()

  public apiDoSetActive = (active?: boolean): void => {
    this._popoverRef.current!.apiDoSetActive(active)
  }

  private _handleSelect = (select: FunctionSetData): void => {
    if (!select.onClick) {
      return
    }
    this._popoverRef.current!.apiDoSetActive()
    select.onClick()
  }

  render() {
    const { data, right, disabled, children } = this.props
    const newData = data.filter((value) => value.show !== false)
    if (!newData.length) {
      return null
    }
    return (
      <Popover
        ref={this._popoverRef}
        popup={<Overlay data={newData} onSelect={this._handleSelect} isReverse={right} />}
        right={right}
        type='hover'
        disabled={disabled}
        pureContainer
      >
        <Inner disabled={!!disabled}>{children}</Inner>
      </Popover>
    )
  }
}
export default FunctionSet
