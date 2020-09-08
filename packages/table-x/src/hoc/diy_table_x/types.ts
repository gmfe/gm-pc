import { TableXColumn, TableXProps } from '../../base'

type DiyTableXColumn = TableXColumn & {
  /** 默认 true，开启 */
  diyEnable?: boolean
  diyItemText?: string
  diyGroupName?: string
  key?: string
  /**
   * DiyTableX 中的 show 与其他 TableX 不同，
   * DiyTableX 中的 show 代表的是默认是否展示
   */
  show?: boolean
}

interface DiyTableXProps extends TableXProps {
  /** 存储 */
  id: string
  // /** 分组排序 */
  // diyGroupSorting: string[]
  columns: DiyTableXColumn[]
}

export type { DiyTableXColumn, DiyTableXProps }
