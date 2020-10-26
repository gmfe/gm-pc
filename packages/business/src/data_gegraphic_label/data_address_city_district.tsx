import React, { FC, useEffect } from 'react'
import { DataAddressCityDistrictProps } from './types'
import { PackageName, MessageName_enterprise } from 'gm_api/src/types'
import { messageStore } from 'gm_api/src/pc_util'
import { ListCity, ListDistrict } from 'gm_api/src/enterprise'
import { observer } from 'mobx-react'

const DataAddressCityDistrict: FC<DataAddressCityDistrictProps> = observer(
  ({ address }) => {
    useEffect(() => {
      messageStore.register(
        PackageName.enterprise,
        MessageName_enterprise.City,
        address.city_id,
        (params) => {
          return ListCity(params).then((res) => res.response.cities)
        }
      )
      messageStore.register(
        PackageName.enterprise,
        MessageName_enterprise.District,
        address.district_id,
        (params) => {
          return ListDistrict(params).then((res) => res.response.districts)
        }
      )
    }, [])

    const city = messageStore.getData(
      PackageName.enterprise,
      MessageName_enterprise.City,
      address.city_id
    )
    const district = messageStore.getData(
      PackageName.enterprise,
      MessageName_enterprise.District,
      address.district_id
    )

    if (!city || !district) {
      return null
    }

    return <>{`${city.local_name}/${district.local_name}`}</>
  }
)

export default DataAddressCityDistrict
