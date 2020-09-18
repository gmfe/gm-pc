import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { Value, BTreeBatchSelectProps, BTreeBatchSelectItem } from './types'
import { Flex, Tree, Button } from '@gm-pc/react'
import { useAsync } from '@gm-common/hooks'
import _ from 'lodash'

const BTreeBatchSelect: FC<BTreeBatchSelectProps> = ({
  onFetchTree,
  onFetchData,
  dataKeyField = 'value',
  onCancel,
  onSelectValues,
}) => {
  const treeAsync = useAsync(onFetchTree)

  const [values, setValues] = useState<Value[]>([])

  const handleSelectValues = useCallback((vs) => {
    setValues(vs)
  }, [])

  const handleOK = () => {
    onSelectValues(values)
  }

  const handleCancel = () => {
    onCancel()
  }

  const selectedValues = useMemo(() => {
    return _.map(values, (v) => v[dataKeyField])
  }, values)

  return (
    <div className='gm-b-batch-select-tree gm-padding-10'>
      <Flex style={{ height: '600px' }}>
        <div style={{ width: '210px' }}>
          <Tree
            list={treeAsync.data}
            selectedValues={selectedValues}
            onSelectValues={handleSelectValues}
            showAllCheck={false}
            withFilter={false}
          />
        </div>
        <div className='gm-margin-lr-20 gm-border-right' />
        <Flex block flex>
          data
        </Flex>
      </Flex>
      <div className='gm-border-top gm-margin-tb-10' />
      <Flex>
        <Flex column flex>
          <div>
            已选：<span className='gm-text-primary'>{values.length}</span>项
          </div>
        </Flex>
        <div>
          <Button onClick={handleCancel} className='gm-margin-right-10'>
            取消
          </Button>
          <Button type='primary' onClick={handleOK}>
            确认
          </Button>
        </div>
      </Flex>
    </div>
  )
}

export default BTreeBatchSelect
