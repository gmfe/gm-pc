import _ from 'lodash'
import { ListCity, ListDistrict, ListStreet, District } from 'gm_api/src/enterprise'
import { CityItem, DistrictItem } from './types'

async function fetchCityDistrictStreetTree(params: {
  city_ids: string[]
}): Promise<CityItem[]> {
  const { city_ids } = params

  const [cityRes, districtRes] = await Promise.all([
    ListCity({
      city_ids,
    }),
    ListDistrict({
      city_ids,
    }),
  ])

  const cityDistrictTree: CityItem[] = []
  const cityMap: { [key: string]: CityItem } = {}
  const districtMap: { [key: string]: DistrictItem } = {}

  _.each(cityRes.response.cities, (city) => {
    const cityItem = {
      value: city.city_id,
      text: city.local_name,
      // children: [], // 不一定有下一级
      original: city,
    }
    cityDistrictTree.push(cityItem)
    cityMap[city.city_id] = cityItem
  })

  _.each(districtRes.response.districts, (district) => {
    const districtItem = {
      original: district,
      value: district.district_id,
      text: district.local_name,
      // children: [], // 不一定有下一级
    }
    districtMap[district.district_id] = districtItem

    const p = cityMap[district.city_id]
    if (p) {
      if (Array.isArray(p.children)) {
        p.children.push(districtItem)
      } else {
        p.children = [districtItem]
      }
    }
  })

  const district_ids = _.map(
    districtRes.response.districts,
    (district: District) => district.district_id
  )

  // 空数组会报错阻塞后续执行，后端不改，所以判断一下
  if (!district_ids.length) return cityDistrictTree

  const streetRes = await ListStreet({
    district_ids,
  })

  _.each(streetRes.response.streets, (street) => {
    const streetItem = {
      original: street,
      value: street.street_id,
      text: street.local_name,
    }

    const p = districtMap[street.district_id]
    if (p) {
      if (Array.isArray(p.children)) {
        p.children.push(streetItem)
      } else {
        p.children = [streetItem]
      }
    }
  })

  return cityDistrictTree
}

export { fetchCityDistrictStreetTree }
