import React, { useRef } from 'react'
import {
  Form,
  FormItem,
  FormButton,
  FormBlock,
  FormGroup,
  FormPanel,
  FormPanelMore,
} from './index'
import {
  Select,
  Switch,
  Validator,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
  Input,
  InputNumber,
  Flex,
  Button,
} from '../../index'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

const area = [
  {
    value: 0,
    text: '南山',
  },
  {
    value: 1,
    text: '福田',
  },
]

const store = observable({
  name: '',
  desc: '',
  area: null,
  sex: 0,
  taste: [],
  isWork: false,
  height: null,
  setData(key: string, value: any) {
    // @ts-ignore
    this[key] = value
  },
})

const Tets = observer(() => {
  return (
    <FormBlock col={2}>
      <FormItem label='邀请码' required>
        <input
          type='text'
          value={store.name}
          onChange={(e) => store.setData('name', e.target.value)}
        />
        <div className='gm-text-desc gm-margin-top-5'>
          可以允许商户在规定时间内自主修改已提交订单内容
        </div>
      </FormItem>
      <FormItem label='名字' required>
        <input
          type='text'
          value={store.name}
          onChange={(e) => store.setData('name', e.target.value)}
        />
      </FormItem>
      <FormItem label='地区地区地区'>
        <Select
          data={area}
          value={store.area}
          onChange={(value) => store.setData('area', value)}
        />
      </FormItem>
      <FormItem label='是否工作' required>
        <Switch
          checked={store.isWork}
          onChange={(checked) => store.setData('isWork', checked)}
        />
      </FormItem>
      <FormItem label='描述' required validate={Validator.create([], store.desc)}>
        <textarea
          value={store.desc}
          onChange={(e) => store.setData('desc', e.target.value)}
        />
      </FormItem>
    </FormBlock>
  )
})

export const ComReadme = () => (
  <div>
    <pre>
      ` 新UI表单约束较多 - 栏数。有 1栏(默认) 2栏 3栏。其中搜索区域 3栏，常规表单区域 1栏
      和 2栏 - 栏宽。一个表单内是固定的，宽度默认 320， FormPanel特殊一栏默认是
      400，具体情况可自定义 - Item 内自然撑开 -
      Item宽度。一般占一栏，可能占两栏，可能占三栏 -
      Item高度。一般占一行，其他看具体情况自然往下撑开 `
    </pre>
  </div>
)

export const ComFormWithDisabledCol = () => (
  <div>
    <pre>
      ` Form 包住。一栏用法需要提供 disableCol。 FormItem 包住表单元素 - 可以简单包住
      input 即可，FormItem 会自动去识别常用的表单元素，并添加 gm-form-control
      类名，以便撑开 - children 可以是数组，FormItem 读到第一个表单元素，做上面的操作 `
    </pre>
    <Form disabledCol labelWidth='100px' onSubmit={() => console.log('onSubmit')}>
      <FormItem label='名字' required>
        <Input
          type='text'
          value={store.name}
          onChange={(e) => store.setData('name', e.target.value)}
        />
      </FormItem>
      <FormItem label='描述' required validate={Validator.create([], store.desc)}>
        <textarea
          value={store.desc}
          onChange={(e) => store.setData('desc', e.target.value)}
        />
      </FormItem>
      <FormItem label='地区'>
        <Select
          data={area}
          value={store.area}
          onChange={(value) => store.setData('area', value)}
        />
      </FormItem>
      <FormItem label='是否工作'>
        <Switch
          checked={store.isWork}
          onChange={(checked) => store.setData('isWork', checked)}
        />
      </FormItem>
      <FormItem label='性别'>
        <RadioGroup
          name='sex'
          value={store.sex}
          onChange={(value) => store.setData('sex', value)}
        >
          <Radio value={0}>男</Radio>
          <Radio value={1}>女</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label='兴趣'>
        <CheckboxGroup
          name='taste'
          value={store.taste}
          onChange={(value) => store.setData('taste', value)}
        >
          <Checkbox value={0}>阅读</Checkbox>
          <Checkbox value={1}>打篮球</Checkbox>
          <Checkbox value={2}>美食</Checkbox>
          <Checkbox value={3}>旅游</Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label='自定义' unLabelTop>
        <div>
          这里是自定义。没有上边距的情况下，label 要对齐，则提供 unLabelTop 去掉 label
          的上边距
        </div>
      </FormItem>
      <FormItem label='身高'>
        <InputNumber
          value={store.height}
          onChange={(value) => store.setData('height', value)}
        />
        <div className='gm-text-desc gm-margin-top-5'>要填写升高，升高</div>
        <div>（这里演示多个 children 的情况）</div>
      </FormItem>
      <FormButton>
        <Button type='primary' htmlType='submit'>
          提交
        </Button>
      </FormButton>
    </Form>
  </div>
)

export const ComFormBlock = () => (
  <Form labelWidth='100px' onSubmit={() => console.log('onSubmit')}>
    <FormBlock col={2}>
      <FormItem label='名字' required>
        <input
          type='text'
          value={store.name}
          onChange={(e) => store.setData('name', e.target.value)}
        />
      </FormItem>
      <FormItem label='地区'>
        <Select
          data={area}
          value={store.area}
          onChange={(value) => store.setData('area', value)}
        />
      </FormItem>
      <FormItem label='是否工作'>
        <Switch
          checked={store.isWork}
          onChange={(checked) => store.setData('isWork', checked)}
        />
      </FormItem>
      <FormItem label='身高'>
        <InputNumber
          value={store.height}
          onChange={(value) => store.setData('height', value)}
        />
        <div className='gm-text-desc gm-margin-top-5'>要填写升高，升高</div>
        <div>（这里演示多个 children 的情况）</div>
      </FormItem>
      <FormItem label='性别'>
        <RadioGroup
          name='sex'
          value={store.sex}
          onChange={(value) => store.setData('sex', value)}
        >
          <Radio value={0}>男</Radio>
          <Radio value={1}>女</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label='兴趣'>
        <CheckboxGroup
          name='taste'
          value={store.taste}
          onChange={(value) => store.setData('taste', value)}
        >
          <Checkbox value={0}>阅读</Checkbox>
          <Checkbox value={1}>打篮球</Checkbox>
          <Checkbox value={2}>美食</Checkbox>
          <Checkbox value={3}>旅游</Checkbox>
        </CheckboxGroup>
      </FormItem>
    </FormBlock>
    <FormItem col={2} label='描述' required validate={Validator.create([], store.desc)}>
      <textarea
        value={store.desc}
        onChange={(e) => store.setData('desc', e.target.value)}
      />
    </FormItem>
    <FormItem col={2} label='自定义' unLabelTop>
      <div>
        这里是自定义。没有上边距的情况下，label 要对齐，则提供 unLabelTop 去掉 label
        的上边距
      </div>
    </FormItem>

    <FormButton>
      <Button type='primary' htmlType='submit'>
        提交
      </Button>
    </FormButton>
  </Form>
)

export const ComFormGroup = () => {
  const form1 = useRef(null)
  const form2 = useRef(null)
  return (
    <FormGroup
      formRefs={[form1, form2]}
      onCancel={() => console.log('Cancel')}
      onSubmit={() => {
        console.log('onSubmit')
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, 3000)
        })
      }}
    >
      <div>第一个表单</div>
      <Form ref={form1} labelWidth='100px' hasButtonInGroup>
        <FormItem label='名字' required>
          <input
            type='text'
            value={store.name}
            onChange={(e) => store.setData('name', e.target.value)}
          />
        </FormItem>
      </Form>
      <div>第二个表单</div>
      <Form ref={form2} labelWidth='100px' hasButtonInGroup>
        <FormItem label='描述' required validate={Validator.create([], store.desc)}>
          <textarea
            value={store.desc}
            onChange={(e) => store.setData('desc', e.target.value)}
          />
        </FormItem>
        <FormItem label='名字' required>
          <input
            type='text'
            value={store.name}
            onChange={(e) => store.setData('name', e.target.value)}
          />
        </FormItem>
      </Form>
    </FormGroup>
  )
}
export const ComFormPanel = () => {
  const form3 = useRef(null)
  const form4 = useRef(null)
  return (
    <FormGroup
      formRefs={[form3, form4]}
      onCancel={() => console.log('Cancel')}
      // onSubmit={() => console.log('onSubmit')}
      onSubmitValidated={() => console.log('onSubmitValidated')}
    >
      <FormPanel
        title='店铺设置'
        left={<Button type='primary'>搜索</Button>}
        right={<Button onClick={() => console.log('删除')}>删除</Button>}
      >
        <Form colWidth='400px' ref={form3} labelWidth='160px' hasButtonInGroup>
          <FormItem label='名字' colWidth='700px' required>
            <input
              type='text'
              className='gm-form-control'
              value={store.name}
              onChange={(e) => store.setData('name', e.target.value)}
            />
          </FormItem>
          <FormItem label='邀请码' required>
            <input
              type='text'
              value={store.name}
              onChange={(e) => store.setData('name', e.target.value)}
            />
            <div className='gm-text-desc gm-margin-top-5'>
              可以允许商户在规定时间内自主修改已提交订单内容
            </div>
          </FormItem>

          <FormBlock col={2}>
            <FormItem
              label='名字'
              required
              tooltip={
                <div className='gm-padding-10 gm-bg' style={{ width: '455px' }}>
                  <p style={{ marginBottom: '4px', fontSize: '12px' }}>
                    23333333333333333
                  </p>
                  <p style={{ marginBottom: 0, fontSize: '12px' }}>4555555555555555</p>
                </div>
              }
            >
              <Flex alignCenter>
                <input
                  type='text'
                  className='gm-form-control'
                  value={store.name}
                  onChange={(e) => store.setData('name', e.target.value)}
                />
              </Flex>
            </FormItem>
            <FormItem label='地区'>
              <Select
                data={area}
                value={store.area}
                onChange={(value) => store.setData('area', value)}
              />
            </FormItem>
            <FormItem label='描述' required validate={Validator.create([], store.desc)}>
              <textarea
                value={store.desc}
                onChange={(e) => store.setData('desc', e.target.value)}
              />
            </FormItem>
            <FormItem label='兴趣'>
              <CheckboxGroup
                style={{ width: '400px' }}
                name='taste'
                value={store.taste}
                onChange={(value) => store.setData('taste', value)}
              >
                <Checkbox value={0}>阅读</Checkbox>
                <Checkbox value={1}>打篮球</Checkbox>
                <Checkbox value={2}>美食</Checkbox>
                <Checkbox value={0}>阅读</Checkbox>
                <Checkbox value={1}>打篮球</Checkbox>
                <Checkbox value={2}>美食</Checkbox>
              </CheckboxGroup>
            </FormItem>
          </FormBlock>
          <FormPanelMore>
            <FormBlock col={2}>
              <FormItem label='邀请码' required>
                <input
                  type='text'
                  value={store.name}
                  onChange={(e) => store.setData('name', e.target.value)}
                />
                <div className='gm-text-desc gm-margin-top-5'>
                  可以允许商户在规定时间内自主修改已提交订单内容
                </div>
              </FormItem>
              <FormItem label='名字' required>
                <input
                  type='text'
                  value={store.name}
                  onChange={(e) => store.setData('name', e.target.value)}
                />
              </FormItem>
              <FormItem label={<span>地区地区地区</span>}>
                <Select
                  data={area}
                  value={store.area}
                  onChange={(value) => store.setData('area', value)}
                />
              </FormItem>
              <FormItem label='是否工作' required>
                <Switch
                  checked={store.isWork}
                  onChange={(checked) => store.setData('isWork', checked)}
                />
              </FormItem>
            </FormBlock>
          </FormPanelMore>
        </Form>
      </FormPanel>

      <FormPanel
        title='店铺设置'
        left={
          <span className='gm-margin-left-10' onClick={() => console.log('搜索')}>
            搜索
          </span>
        }
        right={<span onClick={() => console.log('删除')}>删除</span>}
      >
        <Form colWidth='400px' ref={form4} labelWidth='160px' hasButtonInGroup>
          <Tets />
        </Form>
      </FormPanel>
    </FormGroup>
  )
}

export default {
  title: '表单/Form',
}
