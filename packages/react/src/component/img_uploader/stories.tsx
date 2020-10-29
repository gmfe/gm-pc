import React from 'react'
import ImgUploader from './img_uploader'
import { observable } from 'mobx'
import { UploaderFile } from '../uploader'

const store = observable({
  data: ['https://js.guanmai.cn/static_storage/json/common/logo/default/logo.pure.png'],
  setData(newData: string[]) {
    this.data = newData
  },
})

const handleUpload = (files: UploaderFile[]) => {
  console.log(files)
  // 调用方做突破尺寸和文件大小判断

  return Promise.resolve([
    'https://js.guanmai.cn/static_storage/json/common/logo/default/logo.pure.png',
  ])
}

export const ComImgUploader = () => (
  <div>
    <div style={{ height: '100px' }} />
    <ImgUploader
      data={store.data}
      onUpload={handleUpload}
      onChange={(data) => {
        store.setData(data)
      }}
      accept='image/*'
      desc='图片尺寸720*720像素，大小小于1M'
      multiple
      max={2}
    />
  </div>
)

export const ComImgUploaderWithDisabled = () => (
  <div>
    <div style={{ height: '100px' }} />
    <ImgUploader
      disabled
      data={store.data}
      onUpload={handleUpload}
      onChange={(data) => {
        store.setData(data)
      }}
      accept='image/*'
      desc='图片尺寸720*720像素，大小小于1M'
      multiple
    />
  </div>
)

export default {
  title: '表单/ImgUploader',
}
