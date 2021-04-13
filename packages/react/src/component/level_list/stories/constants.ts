import { TreeDataItem } from '../../../types'

export const areaData: TreeDataItem<string>[] = [
  {
    value: '0',
    text: '宝安',
    children: [
      {
        value: '01',
        text: '西乡',
      },
      {
        value: '02',
        text: '固戍',
      },
    ],
  },
  {
    value: '1',
    text: '南山',
    children: [
      {
        value: '11',
        text: '科技园科技园科技园科技园科技园科技园科技园科技园科技园科技园',
        children: [
          {
            value: '111',
            text: '东区',
          },
          {
            value: '112',
            text: '西区',
          },
        ],
      },
      {
        value: '112',
        text: '科技园科',
        children: [
          {
            value: '1112',
            text: '东区',
          },
          {
            value: '1122',
            text: '西区',
          },
        ],
      },
    ],
  },
  {
    value: '2',
    text: '福田',
    children: [
      {
        value: '21',
        text: '竹子林',
        children: [
          {
            value: '211',
            text: '东区',
          },
          {
            value: '212',
            text: '西区',
          },
        ],
      },
    ],
  },
]
