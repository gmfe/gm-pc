import React, { FC } from 'react'
import { Empty, Loading } from '../components'

interface LoadingAndEmptyProps {
  loading?: boolean
  length: number
}
const LoadingAndEmpty: FC<LoadingAndEmptyProps> = ({ loading, length }) => {
  return (
    <>
      {loading && <Loading />}
      {!loading && !length && <Empty />}
    </>
  )
}

export default LoadingAndEmpty
