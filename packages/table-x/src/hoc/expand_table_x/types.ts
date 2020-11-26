interface ExpandTableXProps {
  /** 传了 expanded，组件 expand 状态交给 props 控制，则必须同时传 onExpand */
  expanded?: { [key: number]: boolean }
  onExpand?(expanded: { [key: number]: boolean }): void
  fixedExpand?: boolean
  /** 隐藏展开列，此时最好 expanded 展开 */
  hideExpandColumn?: boolean
  // TODO any
  /** 某列的 expand 不显示 */
  isExpandCellHidden?(cellProps: any): boolean
}

export type { ExpandTableXProps }
