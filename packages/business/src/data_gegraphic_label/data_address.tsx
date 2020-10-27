import React, { FC } from 'react'
import { useAsync } from '@gm-common/hooks'
import { fetchCityDistrictStreetTree } from './util'
import { LevelSelect } from '@gm-pc/react'
import { DataAddressProps } from './types'
import _ from 'lodash'

const DataAddress: FC<DataAddressProps> = ({
  selected,
  onSelect,
  city_ids,
  onlySelectLeaf,
}) => {
  const { data } = useAsync(fetchCityDistrictStreetTree, {
    manual: false,
    defaultParams: {
      city_ids,
    },
  })

  const oSelected = _.remove(
    [selected.city_id, selected.district_id, selected.street_id],
    (v?: string) => !!v
  )

  const handleSelect = (selected: string[]) => {
    onSelect({
      city_id: selected[0],
      district_id: selected[1],
      street_id: selected[2],
    })
  }

  return (
    <LevelSelect
      data={data || []}
      selected={data ? oSelected : []}
      onSelect={handleSelect}
      onlySelectLeaf={onlySelectLeaf}
    />
  )
}

export default DataAddress
