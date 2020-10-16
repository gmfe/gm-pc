import React, { FC, CSSProperties } from 'react'
import { getCategoryTree, CategoryItem, SpuItem, SkuItem } from './util'
import { Tree, LoadingChunk } from '@gm-pc/react'
import { useAsync } from '@gm-common/hooks'

interface DataCategoryTreeProps {
  style: CSSProperties
  border?: boolean
  needSku?: boolean
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
  activeValue,
  onActiveValue,
  onLeafActiveValue,
}) => {
  const { data, loading } = useAsync(getCategoryTree, {
    manual: false,
    cacheKey: 'GMGetCategoryTree',
    defaultParams: {
      needSku,
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
    <LoadingChunk loading={loading} className='gmb-category-tree' style={style}>
      <Tree
        style={border ? {} : { border: 'none' }}
        list={data || []}
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
