import React from 'react'
import { DataCategoryTree } from './index'

export const ComDataCategoryTree = () => {
  return (
    <DataCategoryTree
      style={{ width: '250px', height: '500px', padding: '10px' }}
      onReady={(data) => {
        console.log(data)
      }}
      onActiveValue={(value, item) => {
        console.log(value, item)
      }}
      onLeafActiveValue={(value, item) => {
        console.log(value, item)
      }}
    />
  )
}

export const ComDataCategoryTreeNeedSku = () => {
  return (
    <div style={{ width: '250px', padding: '10px' }}>
      <DataCategoryTree
        border={false}
        needSku
        style={{ height: '500px' }}
        onReady={(data) => {
          console.log(data)
        }}
        onActiveValue={(value, item) => {
          console.log(value, item)
        }}
        onLeafActiveValue={(value, item) => {
          console.log('onLeafActiveValue', value, item)
        }}
        findPlaceholder='输入sku名称'
        skuParams={{ process: 1, sku_type: 2 }}
      />
    </div>
  )
}

export default {
  title: 'Business/DataCategoryTree',
}
