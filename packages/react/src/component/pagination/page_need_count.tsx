import React, { FC } from 'react'
import SVGLeftSmall from '../../svg/left-small.svg'
import SVGRightSmall from '../../svg/right-small.svg'
import { Flex } from '../flex'
import classNames from 'classnames'
import { CommonProps, InnerPaging } from './types'
import { getIndex } from './util'

function getInfo(paging: InnerPaging) {
  const index = getIndex(paging)
  const all = Math.ceil((paging.count || 0) / paging.limit)

  const diff = 2
  let pages = []

  let begin = Math.max(index - diff, 1)

  let end = Math.min(index + diff, all)

  if (all > diff * 2 + 1) {
    if (begin === 1) {
      end = diff * 2 + 1
    } else if (end === all) {
      begin = Math.max(end - 2 * diff, 1)
    }
  }

  for (let i = begin; i <= end; i++) {
    pages.push(i)
  }

  // 如果总数为0，还是要给个页码1
  if (paging.count === 0) {
    pages = [1]
  }

  return {
    index,
    all,
    begin,
    end,
    pages,
  }
}

const PageNeedCount: FC<CommonProps> = ({ paging, onChange }) => {
  const { index, all, begin, end, pages } = getInfo(paging)

  const handlePage = (_index: number) => {
    // 不处理
    if (index === _index || _index < 1 || _index > all) {
      return
    }

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
        onClick={() => handlePage(index - 1)}
      >
        <SVGLeftSmall />
      </div>

      {begin >= 2 && (
        <div className='gm-pagination-page-item' onClick={() => handlePage(1)}>
          1
        </div>
      )}
      {begin >= 3 && <span className='gm-pagination-page-text'>···</span>}

      {pages.map((page, i) => (
        <div
          key={i}
          className={classNames('gm-pagination-page-item', {
            active: index === page,
          })}
          onClick={() => handlePage(page)}
        >
          {page}
        </div>
      ))}

      {end <= all - 2 && <span className='gm-pagination-page-text'>···</span>}
      {end <= all - 1 && (
        <div className='gm-pagination-page-item' onClick={() => handlePage(all)}>
          {all}
        </div>
      )}

      <div
        className={classNames('gm-pagination-page-item', {
          disabled: index === all || all === 0,
        })}
        onClick={() => handlePage(index + 1)}
      >
        <SVGRightSmall />
      </div>
    </Flex>
  )
}

export default PageNeedCount
