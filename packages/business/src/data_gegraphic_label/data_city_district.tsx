import React, { FC } from 'react'
import { useAsync } from '@gm-common/hooks'
import { fetchCityDistrict } from './util'
import { LevelSelect } from '@gm-pc/react'
import { DataCityDistrictProps } from './types'
import _ from 'lodash'

const DataCityDistrict: FC<DataCityDistrictProps> = ({
  selected,
  onSelect,
  city_ids,
}) => {
  const { data } = useAsync(fetchCityDistrict, {
    manual: false,
    defaultParams: {
      city_ids,
    },
  })

  const handleSelect = (selected: string[]) => {
    // 只给最后一个
    onSelect(_.last(selected))
  }

  return (
    <LevelSelect
      data={data || []}
      selected={data ? selected : []}
      onSelect={handleSelect}
      onlySelectLeaf
    />
  )
}

export default DataCityDistrict
