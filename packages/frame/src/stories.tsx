import React from 'react'
import { Breadcrumb, Framework, Left, FullTabs, Info, RightTop } from './index'
import { Nav, Tabs } from '@gm-pc/react'

const tabs = [
  {
    text: 'Tab1',
    value: '1',
    children: <div>1</div>,
  },
  {
    text: 'Tab2',
    value: '2',
    children: <div>2</div>,
  },
  {
    text: 'Tab3',
    value: '3',
    children: <div>3</div>,
  },
  {
    text: 'Tab4',
    value: '4',
    children: <div>4</div>,
  },
  {
    text: '长度比较长的tabs文本',
    value: '5',
    children: <div>5</div>,
  },
]

const data = [
  {
    link: '/merchandise',
    name: '商品',
    sub: [
      {
        name: '商品管理',
        link: '/merchandise/manage',
        sub: [
          {
            link: '/merchandise/manage/sale',
            name: '报价单管理',
          },
          {
            link: '/merchandise/manage/list',
            name: '商品库',
          },
        ],
      },
      {
        name: '营销',
        link: '/merchandise/marketing_tool',
        sub: [
          {
            link: '/merchandise/marketing_tool/price_rule',
            name: '限时锁价',
          },
        ],
      },
    ],
  },
  {
    link: '/merchandise',
    name: '商品',
    sub: [
      {
        name: '商品管理',
        link: '/merchandise/manage',
        sub: [
          {
            link: '/merchandise/manage/tax_rate',
            name: '税率规则',
          },
        ],
      },
    ],
  },
  {
    link: '/supply_chain',
    name: '供应链',
    sub: [
      {
        name: '订单',
        link: '/supply_chain/order',
        sub: [
          {
            link: '/supply_chain/order/list',
            name: '订单列表',
          },
        ],
      },
    ],
  },
]

export const ComFrameWork = () => (
  <div>
    <Framework
      menu={
        <Left>
          <Nav data={data} selected='' />
        </Left>
      }
      rightTop={
        <RightTop
          breadcrumb={
            <Breadcrumb
              breadcrumbs={[]}
              navConfig={data}
              pathname='/merchandise/manage/tax_rate'
              onSelect={(item) => console.log(item)}
            />
          }
          info={
            <Info
              more={[
                {
                  text: 'adfasf',
                  onClick: () => {
                    console.log('123')
                  },
                },
              ]}
            />
          }
        />
      }
    >
      <FullTabs
        tabs={[
          {
            text: '按订单查看',
            value: 'order',
            children: <div>按订单按订单按订单</div>,
          },
          {
            text: '按商品查看',
            value: 'sku',
            children: <div>按商品按商品按商品</div>,
          },
          {
            text: '按司机查看',
            value: 'driver',
            children: <div>按司机按司机按司机</div>,
          },
          {
            text: '内含tabs的例子',
            value: 'tabs',
            children: <Tabs tabs={tabs} />,
          },
        ]}
        defaultActive='sku'
      />
    </Framework>
  </div>
)

export default {
  title: 'Framework/Framework',
}
