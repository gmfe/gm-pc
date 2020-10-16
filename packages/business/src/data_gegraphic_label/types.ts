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

interface CityDistrictLabel {
  city_id: string
  district_id: string
}

type AddressCityDistrict = Pick<Address, 'city_id' | 'district_id'>

type CityDistrict = CityItem

interface DataCityDistrictProps {
  city_ids: string[]
  selected: CityDistrictLabel
  onSelect(selected?: CityDistrictLabel): void
}

interface DataStationCityDistrictProps {
  selected: CityDistrictLabel
  onSelect(selected?: CityDistrictLabel): void
}

export type {
  CityItem,
  DistrictItem,
  AddressCityDistrict,
  CityDistrict,
  DataCityDistrictProps,
  DataStationCityDistrictProps,
}
