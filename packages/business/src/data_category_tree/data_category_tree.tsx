import React, { FC, CSSProperties, ReactNode } from 'react'
import { getCategoryTree, CategoryItem, SpuItem, SkuItem } from './util'
import { Tree, LoadingChunk, TreeListItem } from '@gm-pc/react'
import { useAsync } from '@gm-common/hooks'
import classNames from 'classnames'
import { ListSkuRequest } from 'gm_api/src/merchandise'

interface DataCategoryTreeProps {
  className?: string
  style?: CSSProperties
  border?: boolean
  needSku?: boolean
  skuParams?: Omit<ListSkuRequest, 'paging'>
  onReady?(data?: CategoryItem[]): void
  activeValue?: any
  findPlaceholder?: string
  onActiveValue?(activeValue: any, item: CategoryItem | SpuItem | SkuItem): void
  onLeafActiveValue?(activeValue: any, item: SpuItem | SkuItem): void
  renderLeafItem?: (data: TreeListItem) => ReactNode
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
  findPlaceholder,
  onLeafActiveValue,
  renderLeafItem,
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
        findPlaceholder={findPlaceholder}
        renderLeafItem={renderLeafItem}
        showFind
      />
    </LoadingChunk>
  )
}

export default React.memo(DataCategoryTree)
