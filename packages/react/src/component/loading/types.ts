import { HTMLAttributes, ReactNode } from 'react'

interface LoadingProps {
  size?: string
  type: any
}

interface LoadingChunkProps extends HTMLAttributes<HTMLDivElement> {
  loading?: boolean
  text?: string
  size?: string
  children: ReactNode
}

interface LoadingFullScreenProps {
  text?: string
  size?: string
}

interface LoadingFullScreenStatic {
  render(props: LoadingFullScreenProps): void
  hide(): void
}

export type {
  LoadingProps,
  LoadingChunkProps,
  LoadingFullScreenProps,
  LoadingFullScreenStatic,
}
