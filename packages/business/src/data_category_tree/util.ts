import {
  GetCategoryTree,
  ListSku,
  Category,
  Spu,
  Sku,
  ListSkuRequest,
} from 'gm_api/src/merchandise'
import { PagingMaxLimit } from 'gm_api'
import _ from 'lodash'
import { ListSkuResponse_SkuInfo } from 'gm_api/src/merchandise/types'
import { filterGroupListLeaf } from '@gm-common/tool'

interface CategoryItem {
  value: string
  text: string
  children: CategoryItem[] | SpuItem[]
  original: Category
}

interface SpuItem {
  value: string
  text: string
  // needSku 才有 children
  children?: SkuItem[]
  original: Spu
}

interface SkuItem {
  value: string
  text: string
  original: Sku
}

async function getCategoryTree(params?: {
  needSku?: boolean
  skuParams?: ListSkuRequest
}) {
  const { needSku, skuParams } = params || {}
  const res = await GetCategoryTree({})

  const { categories, spus } = res.response

  const map: { [key: string]: any } = {}

  const tree: CategoryItem[] = []

  _.each(categories, (category: Category) => {
    const newCategory: CategoryItem = {
      value: category.category_id,
      text: category.name,
      children: [],
      original: category,
    }

    map[newCategory.value] = newCategory

    // 一级
    if (category.parent_id === '0') {
      tree.push(newCategory)
    } else {
      if (map[category.parent_id]) {
        map[category.parent_id].children.push(newCategory)
      }
    }
  })

  _.each(spus, (spu: Spu) => {
    const newSpu: SpuItem = {
      value: spu.spu_id,
      text: spu.name,
      children: needSku ? [] : undefined,
      original: spu,
    }

    map[spu.spu_id] = newSpu

    if (map[spu.parent_id]) {
      map[spu.parent_id].children.push(newSpu)
    }
  })

  if (needSku) {
    const skuRes = await ListSku({
      paging: { limit: PagingMaxLimit },
      ...(skuParams || {}),
    })

    _.each(skuRes.response.sku_infos, (skuInfo: ListSkuResponse_SkuInfo) => {
      const sku: Sku = skuInfo.sku!

      const newSku: SkuItem = {
        value: sku.sku_id,
        text: sku.name,
        original: sku,
      }

      if (map[sku.spu_id]) {
        map[sku.spu_id].children.push(newSku)
      }
    })
  }

  // 过滤掉没有子的数据
  return filterGroupListLeaf(tree as any, () => true) as CategoryItem[]
}

export { getCategoryTree }
export type { CategoryItem, SpuItem, SkuItem }
