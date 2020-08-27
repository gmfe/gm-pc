import { ChangeEvent, CSSProperties, DragEvent } from 'react'
import { FlexProps } from '../flex'

interface UploaderFile extends File {
  preview: string
}

interface UploaderProps {
  onUpload(
    files: UploaderFile[],
    event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLInputElement>
  ): void
  disabled?: boolean
  accept?: string
  multiple?: boolean
  className?: string
  style?: CSSProperties
}

// FlexProps 有待考虑
type DefaultContainerProps = FlexProps

type DefaultImageProps = DefaultContainerProps

export type { UploaderProps, UploaderFile, DefaultContainerProps, DefaultImageProps }
