import React, {
  CSSProperties,
  FC,
  PropsWithChildren,
  ReactNode,
  MouseEvent,
  useCallback,
} from 'react'
import classNames from 'classnames'
import { Uploader, UploaderFile, DefaultImage } from '../uploader'
import { Flex } from '../flex'
import SvgCloseCircle from '../../svg/close-circle.svg'

// tip: 为了兼容特殊情况，设置 url 属性，提示调用方。
type CheckType<T> = T extends String ? string : T & { url: string }

export interface ImgUploaderProps<T> {
  /** 已上传图片 URL 集合 */
  data: CheckType<T>[]
  /** 图片修改回调 */
  onChange(lists: CheckType<T>[]): void
  /** 上传按钮回调函数 */
  onUpload(data: UploaderFile[]): Promise<CheckType<T>[]>
  disabled?: boolean
  accept?: string
  /** 注意，这是添加按钮选择单图还是多图 */
  multiple?: boolean
  /** 图片的尺寸 */
  contentSize?: {
    width: string
    height: string
  }
  desc?: string
  /** 自定义图片展示 */
  imgRender?(item: CheckType<T>): ReactNode
  /** max 最大图片数 */
  max?: number
  className?: string
  style?: CSSProperties
}

const ImgUploader = <T,>(
  props: PropsWithChildren<ImgUploaderProps<T>>
): ReturnType<FC<ImgUploaderProps<T>>> => {
  let {
    data,
    onChange,
    onUpload,
    disabled,
    accept,
    multiple,
    contentSize,
    desc,
    className,
    children,
    imgRender,
    max,
    ...rest
  } = props

  if (!imgRender) {
    imgRender = (item: any) => (
      <img
        src={item?.url || item}
        alt=''
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    )
  }

  const handleUploader = useCallback(
    (files: UploaderFile[]): void => {
      const result = onUpload(files)
      if (result && result.then) {
        result.then((urls) => {
          onChange(data.concat(urls))
          return urls
        })
      }
    },
    [onUpload, onChange, data]
  )

  const handleReplace = useCallback(
    (files: UploaderFile[], index: number): void => {
      const result = onUpload(files)
      if (result && result.then) {
        result.then((urls) => {
          const newData = [...data]
          newData[index] = urls[0]

          onChange(newData)

          return urls
        })
      }
    },
    [onUpload, onChange, data]
  )

  const handleRemove = useCallback(
    (index: number): void => {
      const newData = data.filter((_, i) => i !== index)
      onChange(newData)
    },
    [data, onChange]
  )

  return (
    <div {...rest} className={classNames('gm-img-uploader', className)}>
      <Flex wrap>
        {data.map((item, index) => (
          <Uploader
            onUpload={(files) => handleReplace(files, index)}
            key={index}
            accept={accept}
            disabled={disabled}
            className='gm-img-uploader-item'
          >
            <DefaultImage
              style={{ width: contentSize!.width, height: contentSize!.height }}
            >
              {imgRender!(item)}
            </DefaultImage>
            {!disabled && (
              <SvgCloseCircle
                className='gm-img-uploader-close'
                onClick={(event: MouseEvent) => {
                  event.stopPropagation()
                  handleRemove(index)
                }}
              />
            )}
          </Uploader>
        ))}
        {children ?? (
          <Uploader
            disabled={disabled || (max ? data.length >= max : false)}
            accept={accept}
            onUpload={handleUploader}
            multiple={multiple}
          >
            <DefaultImage
              style={{
                width: contentSize!.width,
                height: contentSize!.height,
              }}
            />
          </Uploader>
        )}
      </Flex>
      {desc && <div className='gm-text-desc gm-margin-5'>{desc}</div>}
    </div>
  )
}

ImgUploader.defaultProps = {
  contentSize: {
    width: '64px',
    height: '64px',
  },
  accept: 'image/*',
}
export default ImgUploader
