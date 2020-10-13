import React, { FC } from 'react'
import { useAsync } from '@gm-common/hooks'
import { fetchCityDistrict } from './util'
import { AddressCityDistrict } from './types'

interface DataAddressCityDistrictProps {
  address: AddressCityDistrict
}

const DataAddressCityDistrict: FC<DataAddressCityDistrictProps> = ({ address }) => {
  const { data } = useAsync(fetchCityDistrict, {
    manual: false,
    defaultParams: {
      address,
    },
  })

  if (!data) {
    return null
  }

  return <>{`${data.city.local_name}/${data.district.local_name}`}</>
}

export default DataAddressCityDistrict
