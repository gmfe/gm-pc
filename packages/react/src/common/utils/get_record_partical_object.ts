import { RecordPartical } from '../../types'
export function getRecordParticalObject<K, V>(): RecordPartical<K, V> {
  return Object.create(null)
}
