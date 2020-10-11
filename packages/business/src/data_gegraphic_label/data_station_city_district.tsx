import React, { FC } from 'react'
import { GetStation, Station } from 'gm_api/src/enterprise'
import DataCityDistrict from './data_city_district'
import { useAsync } from '@gm-common/hooks'
import { DataStationCityDistrictProps } from './types'

async function getStation(params?: { station_id: string }): Promise<Station> {
  const { station_id } = params!
  const res = await GetStation({ station_id })
  return res.response.station!
}

// TODO 通过登录态获得 站点id

const DataStationCityDistrict: FC<DataStationCityDistrictProps> = ({ ...rest }) => {
  const { data } = useAsync(getStation, {
    manual: false,
    defaultParams: {
      station_id: '320713704125497370',
    },
  })

  if (!data) {
    return null
  }

  const city_ids = data?.attrs?.available_city_ids || []

  return <DataCityDistrict {...rest} city_ids={city_ids} />
}

export default DataStationCityDistrict
