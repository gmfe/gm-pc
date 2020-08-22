import React, { FC } from 'react'
import Row from './row'
import Col from './col'
import { ColProps } from './types'

const ColBlock: FC<ColProps> = (props) => {
  return (
    <Col
      {...props}
      className='gm-bg-primary gm-text-center gm-border'
      style={{ height: '50px' }}
    >
      {JSON.stringify(props)}
    </Col>
  )
}

export const ComGrid = () => (
  <div className='gm-padding-10'>
    <div>占满</div>
    <Row>
      <ColBlock span={24} />
    </Row>
    <div>三等分</div>
    <Row>
      <ColBlock span={8} />
      <ColBlock span={8} />
      <ColBlock span={8} />
    </Row>
    <div>偏移</div>
    <Row>
      <ColBlock span={8} />
      <ColBlock span={5} offset={8} />
      <ColBlock span={3} />
    </Row>
    <div>超出换行</div>
    <Row>
      <ColBlock span={8} />
      <ColBlock span={8} />
      <ColBlock span={2} />
      <ColBlock span={8} />
    </Row>
    <br />
    gutter
    <Row gutter={8}>
      <Col className='gm-bg-primary' style={{ height: '60px' }} span={8}>
        Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8
      </Col>
      <Col className='gm-bg-primary' style={{ height: '60px' }} span={8}>
        Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8
      </Col>
      <Col className='gm-bg-primary' style={{ height: '60px' }} span={8}>
        Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8Col 8
      </Col>
    </Row>
  </div>
)

export const ComGridForResponsive = () => (
  <div>
    <div>响应式</div>
    <Row>
      <ColBlock md={12} lg={6} />
      <ColBlock md={12} lg={6} />
      <ColBlock md={12} lg={6} />
      <ColBlock md={12} lg={6} />
    </Row>
  </div>
)

export default {
  title: '布局/Grid',
}
