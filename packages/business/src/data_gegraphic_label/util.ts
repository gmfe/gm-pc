import _ from 'lodash'
import { ListCity, ListDistrict } from 'gm_api/src/enterprise'
import { CityItem } from './types'

async function fetchCityDistrict(params: { city_ids: string[] }): Promise<CityItem[]> {
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

  _.each(cityRes.response.cities, (city) => {
    const cityItem = {
      value: city.city_id,
      text: city.local_name,
      children: [],
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
    }
    const p = cityMap[district.city_id]
    if (p) {
      p.children.push(districtItem)
    }
  })

  return cityDistrictTree
}

export { fetchCityDistrict }
