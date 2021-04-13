import React, { FC } from 'react'
import { DateRangePicker, Select, Flex } from '../../../../index'

interface Data {
  type: number
  name: string
  expand: boolean
  limit?: (
    date: Date,
    v: {
      begin?: Date
      end?: Date
    }
  ) => boolean
}

export interface DRFOnChange {
  (value: { begin?: Date; end?: Date; dateType?: number }): void
}

interface DateRangeFilterProps {
  data: Data[]
  onChange?: DRFOnChange
  value?: {
    begin: Date
    end: Date
    dateType: number
  }

  className?: string
  enabledTimeSelect?: boolean
}
export const DateRangeFilter: FC<DateRangeFilterProps> = ({
  data,
  onChange,
  value,
  className = '',
  enabledTimeSelect = false,
}) => {
  const { begin, end, dateType } = value || {}

  const handleDateChange = (begin: Date, end: Date) => {
    onChange && onChange({ begin, end, dateType })
  }

  const handleSelectChange = (value: number) => {
    onChange && onChange({ dateType: value })
  }

  const target = data.find((item) => {
    return item.type === dateType
  })

  const datePart = (
    <DateRangePicker
      begin={begin}
      end={end}
      onChange={handleDateChange}
      disabledDate={target?.limit}
      enabledTimeSelect={enabledTimeSelect}
    />
  )

  return (
    <Flex>
      <div className='gm-padding-right-5' style={{ width: '110px', marginLeft: '-10px' }}>
        <Select
          clean
          value={dateType}
          onChange={handleSelectChange}
          className='gm-block'
          data={data.map((v) => ({
            value: v.type,
            text: v.name,
          }))}
        />
      </div>
      <Flex flex none column style={{ minWidth: 'auto' }}>
        {datePart}
      </Flex>
    </Flex>
  )
}
