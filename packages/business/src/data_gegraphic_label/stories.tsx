import React from 'react'
import { DataAddress, DataAddressName } from './index'
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
      <DataAddress
        city_ids={['4401', '4403']}
        selected={store.selected}
        onSelect={(selected) => {
          store.setSelected(selected)
        }}
      />
    </div>
  )
}

export const ComDataAddressCityDistrict = () => {
  return (
    <DataAddressName
      address={{ city_id: '4403', district_id: '440307', street_id: '440103001' }}
    />
  )
}

export default {
  title: 'Business/DataGegraphicLabel',
}
