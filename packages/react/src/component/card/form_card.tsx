import React, { ReactNode, CSSProperties } from 'react'
import classNames from 'classnames'
import './style.less'

export interface FromCardProps {
  id?: string
  title?: string | ReactNode
  type?: 'form-card'
  bordered?: boolean // 是否有边框
  extra?: ReactNode // 卡片右上角的操作区域
  headStyle?: CSSProperties // 自定义标题区域样式
  loading?: boolean // 当卡片内容还在加载中时，可以用 loading 展示一个占位
  children?: ReactNode
  [propName: string]: any
}

const FromCard = (props: FromCardProps) => {
  const { id, title, bordered, extra, children, ...restProps } = props

  return (
    <div
      id={id}
      {...restProps}
      className={classNames('gm-new-card-style', {
        'gm-new-card-border': !!bordered,
      })}
    >
      {title && (
        <div className='gm-new-card-head'>
          <div className='gm-new-card-title'>{title}</div>
          {extra && <div className='gm-new-card-extra'>{extra}</div>}
        </div>
      )}
      <div className='gm-new-card-body'>{children}</div>
    </div>
  )
}

export default FromCard
