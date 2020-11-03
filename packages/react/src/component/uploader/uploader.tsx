import React, { ChangeEvent, FC, useCallback, useRef, DragEvent } from 'react'
import { is } from '@gm-common/tool'
import classNames from 'classnames'
import { UploaderFile, UploaderProps } from './types'
import DefaultContainer from './default_container'

const Uploader: FC<UploaderProps> = ({
  onUpload,
  accept,
  multiple,
  className,
  children,
  disabled,
  ...rest
}) => {
  const refInput = useRef<HTMLInputElement>(null)

  const handleClick = useCallback((): void => {
    if (disabled) {
      return
    }
    refInput.current!.click()
  }, [disabled])

  const handleUpload = useCallback(
    (event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLInputElement>) => {
      event.preventDefault()

      const uploadFiles = (event as DragEvent<HTMLInputElement>).dataTransfer
        ? (event as DragEvent<HTMLInputElement>).dataTransfer.files
        : (event as ChangeEvent<HTMLInputElement>).target.files!
      const files: UploaderFile[] = Array.from(uploadFiles).map((file) =>
        Object.assign(file, { preview: window.URL.createObjectURL(file) })
      )
      onUpload(files, event)

      // @ts-ignore
      event.target.value = ''
    },
    [onUpload]
  )

  return (
    <div
      {...rest}
      className={classNames('gm-uploader', { disabled }, className)}
      onClick={handleClick}
    >
      {children ?? <DefaultContainer />}
      <input
        ref={refInput}
        type='file'
        className='gm-uploader-input'
        multiple={!is.weixin() && multiple}
        accept={accept}
        onChange={handleUpload}
      />
    </div>
  )
}

export default Uploader
