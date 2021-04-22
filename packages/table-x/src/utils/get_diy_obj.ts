import { TableXDataItem, TableXColumn } from '../base/types'

const getDiyShowObj = (columns: TableXColumn[]) => {
  const diyShowObj: TableXDataItem<string> = {}
  columns.forEach(({ show, id, label, Header }) => {
    if (show && id) {
      diyShowObj[id] = (label || Header) as string
    }
  })
  return diyShowObj
}
export default getDiyShowObj
