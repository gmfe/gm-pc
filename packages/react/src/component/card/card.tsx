import React, { FC, useRef, HTMLAttributes } from 'react'
import classNames from 'classnames'
import _ from 'lodash'

import { Flex } from '../flex'
import { Popover } from '../popover'
import { List } from '../list'
import Label from '../label'
import SVGMore from '../../svg/more.svg'

type LabelType = 'default' | 'primary' | 'success' | 'danger'

interface CardActions {
  text: string
  onClick(): void
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  labelType?: LabelType
  labelText?: string
  /** 右上角功能定义 */
  actions?: CardActions[]
}

const Card: FC<CardProps> = ({
  className,
  title,
  actions,
  labelType,
  labelText,
  children,
  ...rest
}) => {
  const popoverRef = useRef<Popover>(null)
  const moreList = _.map(actions || [], (v, i) => ({ value: i, text: v.text }))

  const handleSelect = (value: number): void => {
    popoverRef.current!.apiDoSetActive(false)
    actions && actions[value].onClick()
  }

  return (
    <div {...rest} className={classNames('gm-card', className)}>
      <Flex alignCenter className='gm-card-header'>
        <Popover
          right
          showArrow
          type='hover'
          style={{ minWidth: 0, maxWidth: '300px' }}
          popup={
            <div className='gm-bg gm-padding-10' style={{ wordBreak: 'break-all' }}>
              {title || '-'}
            </div>
          }
        >
          <div className='gm-card-header-title'>{title || '-'}</div>
        </Popover>
        {labelText && (
          <Label className='gm-margin-lr-10' type={labelType}>
            {labelText}
          </Label>
        )}
        {actions && (
          <Popover
            ref={popoverRef}
            showArrow
            type='hover'
            right
            popup={
              <List
                data={moreList}
                onSelect={handleSelect}
                className='gm-border-0'
                style={{ minWidth: '30px' }}
              />
            }
          >
            <div className='gm-card-header-action-icon'>
              <SVGMore />
            </div>
          </Popover>
        )}
      </Flex>
      <div className='gm-card-content'>{children}</div>
    </div>
  )
}

export default Card
export type { CardProps }
