import React from 'react'
import Uploader from './uploader'
import DefaultImage from './default_image'
import { observable } from 'mobx'
import { Button } from '../button'

const store = observable({
  data: '',
  setData() {
    this.data =
      'https://js.guanmai.cn/static_storage/json/common/logo/default/logo.pure.png'
  },
})

export const ComUploader = () => (
  <Uploader onUpload={(files, e) => console.log(files, e)} accept='image/*' />
)

export const ComUploaderWithDisabled = () => (
  <Uploader disabled onUpload={(files, e) => console.log(files, e)} accept='image/*' />
)

export const ComUploaderForCustomer = () => (
  <Uploader onUpload={(files, e) => console.log(files, e)} accept='.xlsx'>
    <Button>自定义</Button>
  </Uploader>
)

export const ComUploaderForImage = () => (
  <Uploader onUpload={(files, e) => console.log(files, e)} accept='image/*'>
    <DefaultImage />
  </Uploader>
)

export const ComUploaderForImageCustomer = () => (
  <Uploader onUpload={() => store.setData()} accept='image/*'>
    <DefaultImage>
      {store.data && (
        <img
          src={store.data}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      )}
    </DefaultImage>
  </Uploader>
)

export default {
  title: '表单/Uploader',
}
