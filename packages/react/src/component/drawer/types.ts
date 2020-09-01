import { CSSProperties, ReactNode } from 'react'

type DrawerSize = 'sm' | 'md' | 'lg'

interface DrawerProps {
  onHide?(): void
  className?: string
  style?: CSSProperties
  opacityMask?: boolean
  size?: DrawerSize
  children: ReactNode
}

export type { DrawerProps, DrawerSize }
