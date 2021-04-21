import { RecordPartial } from '../../types'
export function getRecordPartialObject<K, V>(): RecordPartial<K, V> {
  return Object.create(null)
}
