import React, { FC } from 'react'
import SVGLeftSmall from '../../svg/left-small.svg'
import SVGRightSmall from '../../svg/right-small.svg'
import { Flex } from '../flex'
import classNames from 'classnames'
import _ from 'lodash'
import { getIndex } from './util'
import { CommonProps } from './types'

const PageWithoutCount: FC<CommonProps> = ({ paging, onChange }) => {
  const index = getIndex(paging)

  // 往前显示4个页码
  const begin = Math.max(1, index - 4)
  // 往后显示的页码，
  // 最后一页不显示，属于 ...，所以 -1
  // 最多4页
  const end = paging.has_more ? index + 1 : index

  const handlePage = (_index: number) => {
    onChange({
      ...paging,
      offset: (_index - 1) * paging.limit,
    })
  }

  return (
    <Flex alignCenter className='gm-pagination-page'>
      <div
        className={classNames('gm-pagination-page-item', {
          disabled: index === 1,
        })}
        onClick={index === 1 ? _.noop : () => handlePage(index - 1)}
      >
        <SVGLeftSmall />
      </div>

      {_.map(_.range(begin, end + 1), (page, i) => (
        <div
          key={i}
          className={classNames('gm-pagination-page-item', {
            active: index === page,
          })}
          onClick={index === page ? _.noop : () => handlePage(page)}
        >
          {page}
        </div>
      ))}

      {paging.has_more && <span className='gm-pagination-page-text'>···</span>}

      <div
        className={classNames('gm-pagination-page-item', {
          disabled: !paging.has_more,
        })}
        onClick={!paging.has_more ? _.noop : () => handlePage(index + 1)}
      >
        <SVGRightSmall />
      </div>
    </Flex>
  )
}

export default PageWithoutCount
