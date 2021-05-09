/*
 * @Description:获取虚拟列表的一些参数
 */
import _ from 'lodash'
import { VirtualizedProps } from '../table/types'
import { TABLE_X } from './constant'

export default function getVirtualizedParams({
  length,
  limit = 12,
  virtualizedHeight,
  virtualizedItemSize = TABLE_X.HEIGHT_TR,
}: Partial<VirtualizedProps> & { length: number }) {
  const itemSize = (index: number): number => {
    if (index === 0) {
      return TABLE_X.HEIGHT_HEAD_TR
    }
    if (_.isFunction(virtualizedItemSize)) {
      return virtualizedItemSize(index - 1)
    }
    return virtualizedItemSize
  }
  virtualizedHeight =
    virtualizedHeight ||
    TABLE_X.HEIGHT_HEAD_TR + Math.min(limit, length) * TABLE_X.HEIGHT_TR
  return {
    itemCount: length + 1,
    virtualizedHeight,
    itemSize,
  }
}
