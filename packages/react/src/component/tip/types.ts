import { ReactNode } from 'react'

type TipType = 'success' | 'danger'

interface TipProps {
  type?: TipType
  time?: number
  onClose?(): void
  children: ReactNode
}

interface TipStatic {
  tip(props: string | TipProps, type?: TipType): string
  success(props: string | TipProps): string
  danger(props: string | TipProps): string
  clear(id: string): void
  clearAll(): void
}

export type { TipType, TipProps, TipStatic }
