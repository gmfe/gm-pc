import React, { FC } from 'react'
import { getCategoryTree, CategoryItem, SpuItem, SkuItem } from './util'
import { Tree, LoadingChunk } from '@gm-pc/react'
import { useAsync } from '@gm-common/hooks'

interface DataCategoryTreeProps {
  needSku?: boolean
  onReady?(data?: CategoryItem[]): void
  onActiveValue?(activeValue: any, item: CategoryItem | SpuItem | SkuItem): void
  onLeafActiveValue?(activeValue: any, item: SpuItem | SkuItem): void
}

const DataCategoryTree: FC<DataCategoryTreeProps> = ({
  needSku,
  onReady,
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
    <LoadingChunk
      loading={loading}
      className='gmb-category-tree'
      style={{ height: '500px', width: '200px' }}
    >
      <Tree
        list={data || []}
        onActiveValue={handleActiveValue}
        disabledCheckbox
        withFilter={false}
        showFind
      />
    </LoadingChunk>
  )
}

export default React.memo(DataCategoryTree)
