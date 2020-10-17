import React from 'react'
import {
  DataCityDistrict,
  DataStationCityDistrict,
  DataAddressCityDistrict,
} from './index'
import { observable } from 'mobx'

const store = observable({
  selected: {},
  setSelected(selected: any) {
    this.selected = selected
  },
})

export const ComDataCityDistrict = () => {
  return (
    <div style={{ width: '300px' }}>
      <DataCityDistrict
        city_ids={['4401', '4403']}
        selected={store.selected}
        onSelect={(selected) => {
          store.setSelected(selected)
        }}
      />
    </div>
  )
}

export const ComDataStationCityDistrict = () => {
  return (
    <div style={{ width: '300px' }}>
      <DataStationCityDistrict
        selected={store.selected}
        onSelect={(selected) => {
          store.setSelected(selected)
        }}
      />
    </div>
  )
}

export const ComDataAddressCityDistrict = () => {
  return <DataAddressCityDistrict address={{ city_id: '4403', district_id: '440307' }} />
}

export default {
  title: 'Business/DataGegraphicLabel',
}
