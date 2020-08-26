import { HTMLAttributes } from 'react'

interface GutterSize {
  /** 需要提供最小尺寸，小的时候才不会乱。暂时这么解决 */
  sm: number
  md?: number
  lg?: number
  xl?: number
}

type Gutter = number | GutterSize

interface RowProps extends HTMLAttributes<HTMLDivElement> {
  /* 栅栏间隔，可以写成像素值或支持响应式的对象写法，默认为10 */
  gutter?: Gutter
}

type ColSize = number | { span?: number; offset?: number }

interface ColProps extends HTMLAttributes<HTMLDivElement> {
  /* 栅栏占位格数，为 0 时相当于 display: none */
  span?: number
  /* 栅栏左偏移量 */
  offset?: number
  /* 768px */
  sm?: ColSize
  /* 992px */
  md?: ColSize
  /* 1200px */
  lg?: ColSize
  /* 1920px */
  xl?: ColSize
}

export type { Gutter, RowProps, ColProps }
