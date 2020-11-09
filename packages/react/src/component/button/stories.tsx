import React from 'react'
import Button from './button'
import ButtonText from './button_text'

function handleClick() {
  console.log('click')
  return new Promise((resolve) => setTimeout(() => resolve(), 2000))
}

export const ComButton = () => (
  <>
    默认
    <>
      <Button>默认</Button>
      <Button type='primary'>主色</Button>
      <Button type='success'>成功</Button>
      <Button type='danger'>危险</Button>
      <Button type='link'>Link</Button>
      <Button type='link' href='#/supply_chain/purchase/analysis?tab=3' target='_blank'>
        链接
      </Button>
    </>
    <br />
    plain
    <>
      <Button plain>默认</Button>
      <Button plain type='primary'>
        主色
      </Button>
      <Button plain type='success'>
        成功
      </Button>
      <Button plain type='danger'>
        危险
      </Button>
      <Button plain type='link'>
        Link
      </Button>
    </>
    <br />
    disabled
    <>
      <Button disabled>默认</Button>
      <Button disabled type='primary'>
        主色
      </Button>
      <Button disabled type='success'>
        成功
      </Button>
      <Button disabled type='danger'>
        危险
      </Button>
      <Button disabled type='link'>
        Link
      </Button>
      <Button disabled plain>
        默认
      </Button>
      <Button disabled plain type='primary'>
        主色
      </Button>
      <Button disabled plain type='success'>
        成功
      </Button>
      <Button disabled plain type='danger'>
        危险
      </Button>
      <Button disabled plain type='link'>
        Link
      </Button>
    </>
    <br />
    size
    <>
      <Button size='small'>小的</Button>
      <Button>默认</Button>
      <Button size='large'>大的</Button>
    </>
  </>
)

export const ComButtonWithLoading = () => (
  <>
    loading
    <>
      <Button loading>loading</Button>
    </>
    <br />
    onClick promise
    <>
      <Button onClick={handleClick}>点击显示 loading</Button>
      <Button type='primary' onClick={handleClick}>
        点击显示 loading
      </Button>
      <Button type='success' onClick={handleClick}>
        点击显示 loading
      </Button>
      <Button type='danger' onClick={handleClick}>
        点击显示 loading
      </Button>
    </>
  </>
)

export const ComButtonText = () => (
  <div>
    <div>文本按钮</div>
    <div>
      <ButtonText>默认</ButtonText>
      <ButtonText type='primary'>主色</ButtonText>
      <ButtonText type='success'>成功</ButtonText>
      <ButtonText type='danger'>危险</ButtonText>
    </div>
    <div>
      <ButtonText disabled>默认</ButtonText>
      <ButtonText disabled type='primary'>
        主色
      </ButtonText>
      <ButtonText disabled type='success'>
        成功
      </ButtonText>
      <ButtonText disabled type='danger'>
        危险
      </ButtonText>
    </div>
  </div>
)

export default {
  title: '表单/Button',
}
