import React, { FC } from 'react'
import { DataAddressNameProps } from './types'
import { MapId_City, MapId_District, MapId_Street } from 'gm_api/src/enterprise/pc'

const DataAddressName: FC<DataAddressNameProps> = ({
  address: { city_id, district_id, street_id },
}) => {
  return (
    <>
      {city_id && (
        <>
          <MapId_City
            id={city_id}
            getName={(item) => item.local_name}
            getResponseData={(response) => response.cities}
          />
          /
        </>
      )}
      {district_id && (
        <>
          <MapId_District id={district_id} getName={(item) => item.local_name} />/
        </>
      )}
      {street_id && <MapId_Street id={street_id} getName={(item) => item.local_name} />}
    </>
  )
}

export default DataAddressName
