import { DiyShowMapType, TableXColumn } from '../base/types'

const getDiyShowMap = (columns: TableXColumn[]) => {
  const diyShowMap: DiyShowMapType = {}
  columns.forEach(({ show, id, label, Header }) => {
    if (show && id) {
      diyShowMap[id] = (label || Header) as string
    }
  })
  return diyShowMap
}
export default getDiyShowMap
