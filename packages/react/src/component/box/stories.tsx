import React from 'react'
import Box from './box'
import { BoxTable, BoxTableInfo } from './box_table'
import BoxPagination from './box_pagination'
import { BoxForm, BoxFormMore } from './box_form'
import BoxPanel from './box_panel'
import { FormItem, FormBlock, FormButton } from '../form'
import { Button } from '../button'
import { Price } from '../price'
import { Pagination } from '../pagination'

export const ComBox = () => (
  <div>
    <Box>这是一块内容</Box>
    <Box>这是一块内容，内容直接会有 border </Box>
    <Box hasGap>这是一块内容，切有内边距</Box>
  </div>
)

export const ComBoxTable = () => (
  <div>
    <BoxTable
      info={<BoxTableInfo>这是左边的内容</BoxTableInfo>}
      action={<div>这是右边的内容</div>}
    >
      <div>真正的内容</div>
    </BoxTable>
  </div>
)

export const ComBoxPagination = () => (
  <div>
    <BoxPagination>
      <Pagination
        paging={{
          offset: 0,
          limit: 10,
          need_count: true,
          count: 100,
          has_more: true,
        }}
        onChange={() => {
          // something
        }}
      />
    </BoxPagination>
  </div>
)

export const ComBoxForm = () => (
  <div>
    <div>一定要用 FormBlock 包起来</div>
    <BoxForm labelWidth='4em'>
      <FormBlock col={3}>
        <FormItem label='商品'>
          <input type='text' />
        </FormItem>
        <FormItem label='啦啦'>
          <input type='text' />
        </FormItem>
      </FormBlock>
      <BoxFormMore>
        <FormBlock col={3}>
          <FormItem label='商品'>
            <input type='text' />
          </FormItem>
          <FormItem label='啦啦'>
            <input type='text' />
          </FormItem>
          <FormItem label='商品'>
            <input type='text' />
          </FormItem>
          <FormItem label='啦啦'>
            <input type='text' />
          </FormItem>
          <FormItem label='商品'>
            <input type='text' />
          </FormItem>
          <FormItem label='啦啦'>
            <input type='text' />
          </FormItem>
        </FormBlock>
      </BoxFormMore>
      <FormButton>
        <Button type='primary' htmlType='submit'>
          搜索
        </Button>
        <BoxFormMore>
          <Button type='link'>重置</Button>
        </BoxFormMore>
      </FormButton>
    </BoxForm>
  </div>
)

export const ComBoxPanel = () => <BoxPanel title='商品明细'>lalala</BoxPanel>

export const ComBoxPanelWithCollapseAndRight = () => (
  <BoxPanel title='商品明细' collapse right={<div>233333333</div>}>
    lalala
  </BoxPanel>
)
export const ComBoxPanelWithSummary = () => (
  <BoxPanel
    title='商品明细'
    collapse
    summary={[
      { text: '共计', value: 2 },
      { text: '合计', value: Price.getCurrency() + 23389 },
    ]}
    right={<div>233333333</div>}
  >
    lalala
  </BoxPanel>
)

export default {
  title: '布局/Box',
}
