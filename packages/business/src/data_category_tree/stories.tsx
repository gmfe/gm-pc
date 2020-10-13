import React from 'react'
import { DataCategoryTree } from './index'

export const ComDataCategoryTree = () => {
  return (
    <DataCategoryTree
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
    <DataCategoryTree
      needSku
      onReady={(data) => {
        console.log(data)
      }}
      onActiveValue={(value, item) => {
        console.log(value, item)
      }}
      onLeafActiveValue={(value, item) => {
        console.log('onLeafActiveValue', value, item)
      }}
    />
  )
}

export default {
  title: 'Business/DataCategoryTree',
}
