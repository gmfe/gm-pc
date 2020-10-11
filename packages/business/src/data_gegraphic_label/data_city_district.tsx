import React, { FC } from 'react'
import { useAsync } from '@gm-common/hooks'
import { fetchCityDistrict } from './util'
import { LevelSelect } from '@gm-pc/react'
import { DataCityDistrictProps } from './types'

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

  return <LevelSelect data={data || []} selected={selected} onSelect={onSelect} />
}

export default DataCityDistrict
