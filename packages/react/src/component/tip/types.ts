import { ReactNode } from 'react'

type TipType = 'success' | 'danger'

interface TipProps {
  type?: TipType
  time?: number
  onClose?(): void
  children: ReactNode
}

type TipOptions = string | TipProps

interface TipStatic {
  tip(props: TipOptions, type?: TipType): string
  success(props: TipOptions): string
  danger(props: TipOptions): string
  clear(id: string): void
  clearAll(): void
}

export type { TipType, TipProps, TipStatic, TipOptions }
