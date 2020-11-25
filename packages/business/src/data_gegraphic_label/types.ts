import { City, District, Street, Address } from 'gm_api/src/enterprise'

interface CityItem {
  value: string
  text: string
  original: City
  children: DistrictItem[]
}

interface DistrictItem {
  value: string
  text: string
  original: District
  children: StreetItem[]
}

interface StreetItem {
  value: string
  text: string
  original: Street
}

type DataAddress = Pick<Address, 'city_id' | 'district_id' | 'street_id'>

interface DataAddressProps {
  city_ids: string[]
  selected: DataAddress
  onSelect(selected: DataAddress): void
  onlySelectLeaf?: boolean
  placeholder?: string
}

interface DataAddressNameProps {
  address: DataAddress
}

export type {
  CityItem,
  DistrictItem,
  StreetItem,
  DataAddress,
  DataAddressProps,
  DataAddressNameProps,
}
