import React, { FC, useState } from 'react'
import moment from 'moment'

import {
  MoreSelect,
  MoreSelectDataItem,
  Select,
  FormBlock,
  FormButton,
  BoxForm,
  BoxFormMore,
  Button,
  ControlledFormItem,
  useControlFormRef,
  OnFieldsChange,
  ControlledFormProps,
  Divider,
  Switch,
  TextArea,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  InputNumber,
  DatePicker,
  RecommendInput,
  ColorPicker,
  LevelSelect,
  List,
} from '../../../index'

import { noop } from 'lodash'

import { DateRangeFilter, SearchFilter } from './components'
import { areaData } from '../../level_list/stories/constants'
import item from '../../tree/item'
interface FilterOptions {
  status: string
  pay_status: string
  is_out_stock: string
  searchType: string
  serial_no: string
  receive_customer_id: string
  app_id: string
  customers: MoreSelectDataItem<string>[]
  sale_menus: MoreSelectDataItem<string>[]
  drivers: MoreSelectDataItem<string>[]
  menu_period_group_ids: MoreSelectDataItem<string>[]
  sort_remark: string
  service_period_id: string
  has_remark: string
  is_create_stock_sheet: boolean
  is_scan_receipt: boolean
  dayRange: {
    begin: Date
    end: Date
    dateType: number
  }
}

const initialValues = {
  dayRange: {
    begin: moment().startOf('day').toDate(),
    end: moment().endOf('day').toDate(),
    dateType: 1,
  },
  searchType: 1,
  status: 0,
  pay_status: 0,
  app_id: 0,
  sort_remark: 0,
  is_scan_receipt: 0,
  is_create_stock_sheet: 0,
  has_remark: 0,
  drivers: [
    { value: '1', text: '司机1' },
    { value: '2', text: '司机2' },
  ],
}
const hideData = [
  {
    value: 'dayRange',
    text: '日期',
  },
  {
    value: 'status',
    text: '订单状态',
  },
  {
    value: 'has_remark',
    text: '订单备注',
  },
  {
    value: 'app_id',
    text: '订单来源',
  },
]
function getStates(label: string) {
  return Array(3)
    .fill(0)
    .map((_, index) => ({
      value: `${index + 1}`,
      text: `${label}${index + 1}`,
    }))
}

const dateFilterData = [
  {
    type: 1,
    diyText: '下单日期',
    name: '按下单日期',
    expand: false,
    // limit: (date: Date) => {
    //   return moment(date) > moment().endOf('day')
    // },
  },
  {
    type: 2,
    diyText: '收货日期',
    name: '按收货日期',
    expand: false,
    // limit: (date: Date) => {
    //   return moment(date) > moment().add(30, 'day').endOf('day')
    // },
  },
]
const groupOptions = [
  {
    value: 1,
    children: '广州',
  },
  {
    value: 2,
    children: '深圳',
    disabled: true,
  },
  {
    value: 3,
    children: '成都',
  },
  {
    value: 4,
    children: '东莞',
    disabled: true,
  },
  {
    value: 5,
    children: '珠海',
  },
  {
    value: 6,
    children: '惠州',
  },
]
export const ComBoxFormControl: FC = () => {
  const [searchTypeSelect, setsearchTypeSelect] = useState<1 | 2>(1)
  const [values, setValues] = useState<Partial<FilterOptions>>({})
  const [fieldsValues, setFieldsValues] = useState<Partial<FilterOptions>>({})

  const [hides, setHides] = useState<MoreSelectDataItem<string>[]>([])
  const hideItems: ControlledFormProps<FilterOptions>['hideItems'] = {}
  hides.forEach((item) => (hideItems[item.value as keyof FilterOptions] = true))
  const form = useControlFormRef<FilterOptions>()

  const omSubmit: ControlledFormProps<FilterOptions>['onSubmit'] = (values) => {
    setValues(values)
  }

  const onFieldsChange: OnFieldsChange<FilterOptions> = ([changeField, changeValue]) => {
    if (changeField === 'searchType') {
      setsearchTypeSelect(changeValue as 1 | 2)
    }
  }

  const changeValue = (): void => {
    form.current!.setFieldsValue({
      serial_no: '1',
      app_id: '1',
    })
  }
  return (
    <div>
      <BoxForm<FilterOptions>
        isControl
        initialValues={initialValues}
        hideItems={hideItems}
        normalizes={{
          menu_period_group_ids: (items: any[]) => {
            return items?.map((item) => item.value)
          },
        }}
        labelWidth='100px'
        colWidth='385px'
        onSubmit={omSubmit}
        onFieldsChange={onFieldsChange}
        form={form}
      >
        <FormBlock col={3}>
          <ControlledFormItem name='dayRange'>
            <DateRangeFilter data={dateFilterData} enabledTimeSelect />
          </ControlledFormItem>
          <SearchFilter />
        </FormBlock>
        <BoxFormMore>
          <FormBlock col={3}>
            <ControlledFormItem label='订单状态' name='status'>
              <Select all data={getStates('订单状态')} />
            </ControlledFormItem>
            <ControlledFormItem label='支付状态' name='pay_status'>
              <Select all data={getStates('支付状态')} />
            </ControlledFormItem>
            <ControlledFormItem
              label='报价单/菜谱'
              name='sale_menus'
              trigger='onSelect'
              valuePropName='selected'
            >
              <MoreSelect<number> data={getStates('报价单/菜谱')} />
            </ControlledFormItem>
            <ControlledFormItem
              label='商户筛选'
              name='customers'
              trigger='onSelect'
              valuePropName='selected'
            >
              <MoreSelect multiple data={getStates('商户')} placeholder='全部商户' />
            </ControlledFormItem>
            <ControlledFormItem label='订单来源' name='app_id'>
              <Select data={[...getStates('订单来源')]} />
            </ControlledFormItem>
            <ControlledFormItem
              label='司机筛选'
              name='drivers'
              trigger='onSelect'
              valuePropName='selected'
            >
              <MoreSelect
                multiple
                data={getStates('司机')}
                placeholder='全部司机'
                renderListFilterType='pinyin'
              />
            </ControlledFormItem>
            <ControlledFormItem label='分拣备注' name='sort_remark'>
              <Select all data={getStates('分拣备注')} />
            </ControlledFormItem>
            <ControlledFormItem label='订单备注' name='has_remark'>
              <Select all data={getStates('订单备注')} />
            </ControlledFormItem>
            <ControlledFormItem label='是否生成销售出库单' name='is_create_stock_sheet'>
              <Select all data={getStates('出库单')} />
            </ControlledFormItem>
            <ControlledFormItem label='回单状态' name='is_scan_receipt'>
              <Select all data={getStates('回单状态')} />
            </ControlledFormItem>
            <ControlledFormItem
              label='餐次'
              name='menu_period_group_ids'
              trigger='onSelect'
              valuePropName='selected'
              onFieldChange={(value) => console.log(value)}
            >
              <MoreSelect
                multiple
                data={getStates('餐次')}
                placeholder='全部餐次'
                renderListFilterType='pinyin'
              />
            </ControlledFormItem>
            <ControlledFormItem label='switch' name='switch' valuePropName='checked'>
              <Switch />
            </ControlledFormItem>
            <ControlledFormItem label='radio' name='radio' valuePropName='checked'>
              <Radio />
            </ControlledFormItem>
            <ControlledFormItem label='checkbox' name='checkbox' valuePropName='checked'>
              <Checkbox />
            </ControlledFormItem>
            <ControlledFormItem label='radioGroup' name='radioGroup'>
              <RadioGroup options={groupOptions} />
            </ControlledFormItem>
            <ControlledFormItem label='checkboxGroup' name='checkboxGroup'>
              <CheckboxGroup options={groupOptions} />
            </ControlledFormItem>
            <ControlledFormItem label='textarea' name='textarea'>
              <TextArea />
            </ControlledFormItem>
            <ControlledFormItem label='inputNumber' name='inputNumber'>
              <InputNumber />
            </ControlledFormItem>
            <ControlledFormItem label='DatePicker' name='DatePicker' valuePropName='date'>
              <DatePicker />
            </ControlledFormItem>
            <ControlledFormItem label='RecommendInput' name='RecommendInput'>
              <RecommendInput data={getStates('RecommendInput')} />
            </ControlledFormItem>
            <ControlledFormItem label='ColorPicker' name='ColorPicker'>
              <ColorPicker>
                <span>colorPicker</span>
              </ColorPicker>
            </ControlledFormItem>
            <ControlledFormItem
              label='LevelSelect'
              name='LevelSelect'
              valuePropName='selected'
              trigger='onSelect'
            >
              <LevelSelect data={areaData} />
            </ControlledFormItem>
            <ControlledFormItem
              label='onlySelectLeaf'
              name='onlySelectLeaf'
              valuePropName='selected'
              trigger='onSelect'
            >
              <LevelSelect data={areaData} onlySelectLeaf />
            </ControlledFormItem>
            <ControlledFormItem
              label='List'
              name='List'
              valuePropName='selected'
              trigger='onSelect'
            >
              <List data={areaData} />
            </ControlledFormItem>
          </FormBlock>
        </BoxFormMore>
        <FormButton>
          <Button type='primary' htmlType='submit'>
            搜索
          </Button>
          <BoxFormMore>
            <Button onClick={noop} className='gm-margin-left-10'>
              重置
            </Button>
          </BoxFormMore>
          <Button onClick={noop} className='gm-margin-left-10'>
            导出
          </Button>
        </FormButton>
      </BoxForm>
      <Divider />
      <div className='gm-margin-top-20'>搜索值(onSubmit)：{JSON.stringify(values)}</div>
      <Divider />
      <div className='gm-margin-top-20'>选择要隐藏的表单项(hideItems)：</div>
      <MoreSelect multiple data={hideData} selected={hides} onSelect={setHides} />
      <div className='gm-margin-top-20'>设置表单项的值(setFieldsValue)：</div>
      <Button type='primary' onClick={changeValue}>
        1.设置输入框的值为1；2.设置订单来源为来源1
      </Button>
      <div className='gm-margin-top-20'>
        获取表单项的值(getFieldsValue)：
        <div>输入框：{fieldsValues.serial_no}</div>
        <div>订单来源：{fieldsValues.app_id}</div>
      </div>
      <Button
        type='primary'
        onClick={() =>
          setFieldsValues(form.current!.getFieldsValue(['serial_no', 'app_id']))
        }
      >
        1.获取输入框的值；2.获取订单来源
      </Button>
    </div>
  )
}

export default {
  title: '表单/ControlledForm',
}
