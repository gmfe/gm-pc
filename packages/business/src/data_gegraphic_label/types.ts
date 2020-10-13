import { City, District, Address } from 'gm_api/src/enterprise'

interface CityItem {
  value: string
  text: string
  children: DistrictItem[]
  original: City
}

interface DistrictItem {
  value: string
  text: string
  original: District
}

type AddressCityDistrict = Pick<Address, 'city_id' | 'district_id'>

type CityDistrict = CityItem

interface DataCityDistrictProps {
  city_ids: string[]
  selected: string[]
  onSelect(selected?: string): void
}

interface DataStationCityDistrictProps {
  selected: string[]
  onSelect(selected?: string): void
}

export type {
  CityItem,
  DistrictItem,
  AddressCityDistrict,
  CityDistrict,
  DataCityDistrictProps,
  DataStationCityDistrictProps,
}
