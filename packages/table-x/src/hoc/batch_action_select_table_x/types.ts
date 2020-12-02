import { BatchActionBarItem } from '../../components'

type Value = any

interface BatchActionSelectTableXProps {
  /** 重新定义 batchActions */
  batchActions: BatchActionBarItem[]
  batchActionBarPure?: boolean
}

interface BatchActionTableXChildProps extends BatchActionSelectTableXProps {
  childKeyField?: string
}

export type { Value, BatchActionSelectTableXProps, BatchActionTableXChildProps }
