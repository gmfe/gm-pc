import { HTMLAttributes, ReactNode } from 'react'

interface LoadingIconProps {
  size?: string
}

interface LoadingProps extends HTMLAttributes<HTMLSpanElement> {
  text?: string
  size?: string
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
  LoadingIconProps,
  LoadingProps,
  LoadingChunkProps,
  LoadingFullScreenProps,
  LoadingFullScreenStatic,
}
