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
  topLabelText?: string
  disabled?: boolean
  onClick?(...args: any[]): any
  /** 右上角功能定义 */
  actions?: CardActions[]
}

const Card: FC<CardProps> = ({
  className,
  title,
  actions,
  labelType,
  labelText,
  topLabelText,
  children,
  disabled,
  onClick,
  ...rest
}) => {
  const popoverRef = useRef<Popover>(null)
  const moreList = _.map(actions || [], (v, i) => ({ value: i, text: v.text }))

  const handleSelect = (value: number): void => {
    popoverRef.current!.apiDoSetActive(false)
    actions && actions[value].onClick()
  }

  return (
    <div
      {...rest}
      className={classNames('gm-card', { 'gm-card-disabled': disabled }, className)}
      onClick={disabled ? () => {} : onClick}
    >
      <div
        className={classNames('gm-card-header', {
          'gm-padding-top-15': !topLabelText,
          'gm-card-header-disabled': disabled,
        })}
        style={{ height: !topLabelText ? '50px' : '65px' }}
      >
        <Flex>
          {topLabelText && (
            <Flex>
              <TopLabel text={topLabelText} />
            </Flex>
          )}
          <Flex flex justifyEnd>
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
        </Flex>
        <Flex
          className={classNames({
            'gm-padding-right-20': !topLabelText,
            'gm-padding-top-10': !!topLabelText,
          })}
          alignCenter
        >
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
        </Flex>
      </div>
      <div className='gm-card-content'>{children}</div>
    </div>
  )
}

const TopLabel: FC<{ text: string }> = ({ text }) => {
  return (
    <Flex column className='gm-label-container'>
      <div className='gm-card-label'>
        <Flex className='gm-card-label-text'>{text}</Flex>
      </div>
      <Flex className='gm-card-label-content'>
        <div className='gm-card-label-left' />
        <div className='gm-card-label-right' />
      </Flex>
    </Flex>
  )
}

export default Card
export type { CardProps }
