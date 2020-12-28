import { CSSProperties, ReactNode } from 'react'

type alignType = 'left' | 'center' | 'right'
export type numberOrUndefined = number | undefined
export type spanType = (rowIndex: number) => numberOrUndefined

interface IBaseProps {
  style?: CSSProperties
  className?: string
}
/* table basecell interface start */
interface IBaseCellProps<OriginalType = any> {
  // 行索引
  rowIndex: number
  // 每一行数据
  original: OriginalType
}
/* table basecell interface end */

/* table cell interface start */
interface ICellProps<OriginalType> extends IBaseCellProps<OriginalType> {
  // 每一格通过column的id取original[id]的值
  text: OriginalType[keyof OriginalType]
}
/* table cell interface end */

/* table interface start */
interface ISimpleTableProps<OriginalType>
  extends IBaseProps,
    ISimpleTbodyProps<OriginalType> {
  // 是否需要边框
  bordered?: boolean
}
/* table interface end */

/* table head interface */
interface ISimpleTheadProps<OriginalType> {
  columns: ISimpleColumn<OriginalType>[]
}

/* table column interface */
interface ISimpleColumn<OriginalType> {
  // 对齐方式
  align?: alignType
  // 每一列单元格的key
  id: string
  // 表头
  Header: ReactNode
  // 表头列跨度
  headerSpan?: number
  // 列宽
  width?: number | string
  // 行高
  height?: number | string
  // 跨列
  getColSpan?: spanType
  // 跨行
  getRowSpan?: spanType
  // 表格自定义渲染内容
  Cell?(cellProps: ICellProps<OriginalType>): ReactNode
}
/* table body interface start */
interface ISimpleTbodyProps<OriginalType> extends ISimpleTheadProps<OriginalType> {
  // 每一行的key
  rowKey: keyof OriginalType
  // 表格数据
  data: OriginalType[]
  // 行总结栏
  rowSummary?(original: OriginalType, index: number): ISimpleSummaryProps
  // 整个表格总结栏
  allSummary?(originals: OriginalType[]): ISimpleSummaryProps
}
/* table body interface end */

/* table row interface start */
interface ISimpleRowProps<OriginalType>
  extends IBaseCellProps,
    ISimpleTheadProps<OriginalType> {}
/* table row interface end */

/* table DivTd interface start */
interface ISimpleDivTdProps {
  // 对齐方式
  align?: alignType
  // 宽度 必须填写%，如50%
  width?: string
}
/* table DivTd interface end */

/* table td interface start */
interface ISimpleTdProps extends ISimpleDivTdProps {
  // 跨列
  colSpan?: number
  // 跨行
  rowSpan?: number
}
/* table td interface end */

type ISummary = ISimpleDivTdProps & { children: ReactNode }
/* table summary interface start */
interface ISimpleSummaryProps {
  summarys: ISummary[]
}
/* table summary interface end */

export type {
  ISimpleTableProps,
  ISimpleTheadProps,
  ISimpleTbodyProps,
  ISimpleColumn,
  ISimpleRowProps,
  ICellProps,
  ISimpleTdProps,
  ISimpleDivTdProps,
  ISimpleSummaryProps,
}
