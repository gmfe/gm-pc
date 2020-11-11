import React from 'react'
import sha256 from 'crypto-js/sha256'
import { Token } from 'gm_api/src/oauth'

export const ComLogin = () => {
  return (
    <div>
      <button
        onClick={() => {
          Token({
            grant_type: 'password',
            username: 'admin',
            group_id: '326311583942705176',
            password: sha256('123456').toString(),
            client_id: '1',
          })
        }}
      >
        login
      </button>
    </div>
  )
}

export default {
  title: 'Business/ceres login',
}
