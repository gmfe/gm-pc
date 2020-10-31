import { StorageFactory } from '@gm-common/tool'

const LocalStorage = new StorageFactory('_gm-pc_', window.localStorage)
const SessionStorage = new StorageFactory('_gm-pc_', window.sessionStorage)

export { SessionStorage, LocalStorage }
export default LocalStorage
