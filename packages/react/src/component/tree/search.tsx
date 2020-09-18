import React, { ChangeEvent, FC, useMemo, useState } from 'react'
import { SearchProps } from './types'
import { Input } from '../input'
import _ from 'lodash'

// 单独组建，存 query， 这样主组建不会因为 query 而 render 频繁
const Search: FC<SearchProps> = ({ placeholder, onChange }) => {
  const [query, setQuery] = useState('')

  const debounceChange = useMemo(() => {
    return _.debounce((value: string) => {
      onChange(value)
    }, 500)
  }, [onChange])

  const handleQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)

    debounceChange(e.target.value)
  }

  return (
    <div className='gm-tree-filter'>
      <Input type='text' value={query} onChange={handleQuery} placeholder={placeholder} />
    </div>
  )
}

export default React.memo(Search)
