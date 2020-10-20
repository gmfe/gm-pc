import React, { FC, CSSProperties } from 'react'
import { getCategoryTree, CategoryItem, SpuItem, SkuItem } from './util'
import { Tree, LoadingChunk } from '@gm-pc/react'
import { useAsync } from '@gm-common/hooks'
import classNames from 'classnames'
import { ListSkuRequest } from 'gm_api/src/merchandise'

interface DataCategoryTreeProps {
  className?: string
  style?: CSSProperties
  border?: boolean
  needSku?: boolean
  skuParams?: ListSkuRequest
  onReady?(data?: CategoryItem[]): void
  activeValue?: any
  onActiveValue?(activeValue: any, item: CategoryItem | SpuItem | SkuItem): void
  onLeafActiveValue?(activeValue: any, item: SpuItem | SkuItem): void
}

const DataCategoryTree: FC<DataCategoryTreeProps> = ({
  style,
  border,
  needSku,
  onReady,
  skuParams,
  className,
  activeValue,
  onActiveValue,
  onLeafActiveValue,
}) => {
  const { data, loading } = useAsync(getCategoryTree, {
    manual: false,
    cacheKey: 'GMGetCategoryTree',
    defaultParams: {
      needSku,
      skuParams,
    },
    onSuccess(data) {
      onReady && onReady(data)
    },
  })

  const handleActiveValue = (active: any, item: CategoryItem | SpuItem | SkuItem) => {
    onActiveValue && onActiveValue(active, item)
    if (!('children' in item && item.children)) {
      onLeafActiveValue && onLeafActiveValue(active, item as SpuItem | SkuItem)
    }
  }

  return (
    <LoadingChunk
      loading={loading}
      className={classNames('gmb-category-tree', className)}
      style={style}
    >
      <Tree
        list={data || []}
        border={border}
        activeValue={activeValue}
        onActiveValue={handleActiveValue}
        disabledCheckbox
        withFilter={false}
        showFind
      />
    </LoadingChunk>
  )
}

export default React.memo(DataCategoryTree)
