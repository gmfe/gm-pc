import React, { FC } from 'react'
import { useAsync } from '@gm-common/hooks'
import { fetchCityDistrictTree } from './util'
import { LevelSelect } from '@gm-pc/react'
import { DataCityDistrictProps } from './types'

const DataCityDistrict: FC<DataCityDistrictProps> = ({
  selected,
  onSelect,
  city_ids,
}) => {
  const { data } = useAsync(fetchCityDistrictTree, {
    manual: false,
    defaultParams: {
      city_ids,
    },
  })
  const levelSelected =
    selected.city_id && selected.district_id
      ? [selected.city_id, selected.district_id]
      : []

  const handleSelect = (selected: string[]) => {
    const city_district_label = {
      city_id: selected[0],
      district_id: selected[1],
    }
    onSelect(city_district_label)
  }

  return (
    <LevelSelect
      data={data || []}
      selected={data ? levelSelected : []}
      onSelect={handleSelect}
      onlySelectLeaf
    />
  )
}

export default DataCityDistrict
