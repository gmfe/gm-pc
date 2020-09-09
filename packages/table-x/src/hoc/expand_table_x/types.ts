interface ExpandTableXProps {
  /** 传了 expanded，组件 expand 状态交给 props 控制，则必须同时传 onExpand */
  expanded?: { [key: number]: boolean }
  onExpand?(expanded: { [key: number]: boolean }): void
  fixedExpand?: boolean
}

export type { ExpandTableXProps }
