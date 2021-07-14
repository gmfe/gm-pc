import React, { FC, useRef, useEffect, useState } from 'react'
import classNames from 'classnames'
import _ from 'lodash'

import { Flex } from '../flex'
import { Popover } from '../popover'
import { List } from '../list'
import Label, { LabelType } from '../label'
import SVGMore from '../../svg/more.svg'
import FromCard, { FromCardProps } from './form_card'

interface CardActions {
  text: string
  onClick(): void
}

interface CardProps extends FromCardProps {
  title?: string
  labelType?: LabelType
  labelText?: string
  topLabelText?: string
  inactive?: boolean
  onClick?(...args: any[]): any
  /** 右上角功能定义 */
  className?: string
  actions?: CardActions[]
}

const Card: FC<CardProps> = (props) => {
  const {
    className,
    title,
    actions,
    labelType,
    labelText,
    topLabelText,
    children,
    inactive,
    onClick,
    type,
    ...rest
  } = props

  const popoverRef = useRef<Popover>(null)
  const moreList = _.map(actions || [], (v, i) => ({ value: i, text: v.text }))

  const handleSelect = (value: number): void => {
    popoverRef.current!.apiDoSetActive(false)
    actions && actions[value].onClick()
  }

  // 老Card不能支撑起业务， 以后尽量用FromCard
  if (type === 'form-card') return <FromCard {...props} />

  return (
    <div {...rest} className={classNames('gm-card', className)} onClick={onClick}>
      <div
        className={classNames('gm-card-header', {
          'gm-padding-top-15': !topLabelText,
          'gm-card-header-inactive': inactive,
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
          {labelText && (
            <Label className='gm-margin-right-5' type={labelType || 'default'}>
              {labelText}
            </Label>
          )}
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
        </Flex>
      </div>
      <div className='gm-padding-10'>{children}</div>
    </div>
  )
}

const TopLabel: FC<{ text: string }> = ({ text }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.getBoundingClientRect().width)
    }
  }, [ref])

  return (
    <Flex column className='gm-label-container'>
      <div ref={ref} className='gm-card-label'>
        {text}
      </div>
      <div
        className='gm-label-container-bottom'
        style={{ borderLeftWidth: `${width / 2}px`, borderRightWidth: `${width / 2}px` }}
      />
    </Flex>
  )
}

export default Card
export type { CardProps }
