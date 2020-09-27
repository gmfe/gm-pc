import React, { FC } from 'react'
import GMGetCategoryTree, { CategoryItem, SpuItem } from 'gm_api/gm/get_category_tree'
import { Tree, LoadingChunk } from '@gm-pc/react'
import { useAsync } from '@gm-common/hooks'
import { Value } from '@gm-pc/react/src/component/tree/types'

interface DataCategoryTreeProps {
  onReady?(data: CategoryItem[]): void
  onActiveValue?(activeValue: Value, item: CategoryItem | SpuItem): void
}

const DataCategoryTree: FC<DataCategoryTreeProps> = ({ onReady, onActiveValue }) => {
  const { data, loading } = useAsync(GMGetCategoryTree, {
    manual: false,
    cacheKey: 'GMGetCategoryTree',
    onSuccess(data?: Data, params?: UseAsyncParams) {
      onReady(data)
    },
  })

  return (
    <LoadingChunk
      loading={loading}
      className='gmb-category-tree'
      style={{ height: '500px', width: '200px' }}
    >
      <Tree
        list={data || []}
        onActiveValue={onActiveValue}
        disabledCheckbox
        withFilter={false}
        showFind
      />
    </LoadingChunk>
  )
}

export default DataCategoryTree
