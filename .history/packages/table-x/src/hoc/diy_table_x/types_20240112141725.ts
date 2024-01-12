import { TableXColumn } from '../../base'

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
  /** 字段顺序排序支持 */
  sequence?: number
}

interface DiyTableXProps {
  /** 存储 */
  id: string
  // /** 分组排序 */
  // diyGroupSorting: string[]
  columns: DiyTableXColumn[]
  /** diy 字段面板 className */
  diyModalClassName?: string
  /** 表头设置中启用选定字段排序, 其中fixed的字段不可排序 */
  customSequence?: boolean
  /** 保存可选表头设置回调 */
  handleAvailableHeaderOnSave?(columns: DiyTableXColumn[]):void
}

export type { DiyTableXColumn, DiyTableXProps }
