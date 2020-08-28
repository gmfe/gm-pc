import React, { FC, HTMLAttributes } from 'react'
import classNames from 'classnames'
import SVGSuccessCircle from '../../svg/success-circle.svg'
import SVGCloseCircle from '../../svg/close-circle.svg'
import { Flex } from '../flex'

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  percentage: number
  text?: string
  type?: 'success' | 'danger'
}

const Progress: FC<ProgressProps> = ({ percentage, type, text, className, ...rest }) => {
  return (
    <Flex
      alignCenter
      {...rest}
      className={classNames(
        'gm-progress',
        {
          [`gm-progress-${type}`]: type,
          'gm-progress-text': !!text,
        },
        className
      )}
    >
      <Flex flex block className='gm-progress-bar'>
        <div className='gm-progress-bar-outer'>
          <div
            className={classNames('gm-progress-bar-inner')}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </Flex>
      <div className='gm-gap-5' />
      <div className='gm-progress-icon'>
        {type === 'success' && <SVGSuccessCircle className='gm-text-success' />}
        {type === 'danger' && <SVGCloseCircle className='gm-text-danger' />}
      </div>
      {!type && <div className='gm-progress-text'>{text || `${percentage}%`}</div>}
    </Flex>
  )
}

export default Progress
export type { ProgressProps }
