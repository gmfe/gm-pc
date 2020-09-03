import React, { FC, CSSProperties, useRef } from 'react'
import classNames from 'classnames'
import _ from 'lodash'

import { Flex } from '../flex'
import { Popover } from '../popover'
import { List } from '../list'
import Label from '../label'
import SVGMore from '../../svg/more.svg'

type LabelType = 'default' | 'primary' | 'success' | 'danger'

interface PanelMore {
  text: string
  onClick(): void
}

export interface PanelProps {
  className?: string
  style?: CSSProperties
  title?: string
  labelType?: LabelType
  labelText?: string
  /** 右上角功能定义 */
  more?: PanelMore[]
  children?: any
}

const Panel: FC<PanelProps> = ({
  className,
  title,
  more,
  labelType,
  labelText,
  children,
  ...rest
}) => {
  const popoverRef = useRef<Popover>(null)
  const moreList = _.map(more || [], (v, i) => ({ value: i, text: v.text }))

  const handleSelect = (value: number): void => {
    popoverRef.current!.apiDoSetActive(false)
    more && more[value].onClick()
  }

  return (
    <div {...rest} className={classNames('gm-panel', className)}>
      <Flex alignCenter className='gm-panel-header'>
        <Flex flex alignCenter>
          {title || '-'}
          {labelText && (
            <Label className='gm-margin-lr-10' type={labelType}>
              {labelText}
            </Label>
          )}
        </Flex>
        {more && (
          <Flex justifyEnd alignStart>
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
              <div className='gm-panel-header-more'>
                <SVGMore />
              </div>
            </Popover>
          </Flex>
        )}
      </Flex>
      <div className='gm-panel-content'>{children}</div>
    </div>
  )
}

export default Panel
