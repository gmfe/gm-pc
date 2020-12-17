import React, { FC, forwardRef } from 'react'
import classNames from 'classnames'
import { ChartProps } from '../../../types/common'

export interface TableChartProps extends ChartProps {
  name?: string
  ref?: React.ForwardedRef<HTMLDivElement>
}

const TableChart: FC<TableChartProps> = forwardRef<HTMLDivElement, TableChartProps>(
  (props, ref) => {
    const { options, data } = props
    const { position, theme, height } = options
    const [x, y] = position.split('*')
    // data = data.sort((a, b) => b[y] - a[y])

    return (
      <div
        className={classNames('gm-vision-container', {
          'gm-vision-theme-ocean': theme === 'ocean',
          'gm-vision-theme-sunset': theme === 'sunset',
        })}
        style={{
          height,
        }}
      >
        {!theme && (
          <>
            <div className='gm-vision-title'>排名</div>
            <div className='gm-vision-title'>名称</div>
            <div className='gm-vision-title'>数据</div>
          </>
        )}
        {/* 排名 */}
        <div className='gm-vision-flex-column gm-vision-flex'>
          {data.map((_: any, index: number) => (
            <div
              key={`title_${index}`}
              className='gm-vision-flex-flex gm-vision-align-center gm-vision-flex gm-vision-index'
            >
              <div className='gm-vision-index-number'>{index + 1}</div>
            </div>
          ))}
        </div>
        {/* 图表 */}
        <div
          className='gm-vision-flex'
          style={{
            overflow: 'hidden',
          }}
        >
          {/* 名称 */}
          <div
            className='gm-vision-flex-column gm-vision-flex'
            style={{
              marginRight: '20px',
            }}
          >
            {data.map((item: any, index: number) => (
              <div
                key={`name_${index}`}
                className='gm-vision-flex-flex gm-vision-align-center gm-vision-flex gm-vision-name'
                style={{
                  whiteSpace: 'nowrap',
                }}
              >
                {item[x]}
              </div>
            ))}
          </div>
          <div
            className='gm-vision-flex-flex'
            ref={ref}
            style={{
              overflow: 'hidden',
            }}
          />
        </div>
        {/* 数据 */}
        <div className='gm-vision-flex-column gm-vision-flex'>
          {data.map((item: any, index: number) => (
            <div
              key={`value_${index}`}
              className='gm-vision-flex-flex gm-vision-align-center gm-vision-flex'
            >
              {item[y]}
            </div>
          ))}
        </div>
      </div>
    )
  }
)

export default TableChart
