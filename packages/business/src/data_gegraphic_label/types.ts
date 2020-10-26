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

interface DataCityDistrictProps {
  city_ids: string[]
  selected: CityDistrictLabel
  onSelect(selected: CityDistrictLabel): void
}

interface DataAddressCityDistrictProps {
  address: CityDistrictLabel
}

export type {
  CityItem,
  DistrictItem,
  CityDistrictLabel,
  AddressCityDistrict,
  DataCityDistrictProps,
  DataAddressCityDistrictProps,
}
