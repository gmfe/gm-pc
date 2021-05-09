import { HandleParamsProps } from './types'

const handleParams = ({
  filter,
  filterProp = 'filter',
  isHeaderSort,
  isFilterSpread,
  sorts,
}: HandleParamsProps) => {
  const params = isFilterSpread ? { ...filter } : { [filterProp]: filter }
  if (isHeaderSort) {
    Object.assign(params, { sorts })
  }
  return params
}
export { handleParams }
