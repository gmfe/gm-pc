import { DiyShowObjType, TableXColumn } from '../base/types'

const getDiyShowObj = (columns: TableXColumn[]) => {
  const diyShowObj: DiyShowObjType = {}
  columns.forEach(({ show, id, label, Header }) => {
    if (show && id) {
      diyShowObj[id] = (label || Header) as string
    }
  })
  return diyShowObj
}
export default getDiyShowObj
