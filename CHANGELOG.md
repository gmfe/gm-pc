#### 参照antd前缀字符

- 🔥：支持新特性
- 🐞：修复bug
- 💄：样式修改
- 🛠：优化或重构

## 1.7.0

`2021-12-21`

- 🔥 `table-x` 增加`indexTableHoc`, ,通过配置prop为`isInex`自动增加序号列。[#68](https://github.com/gmfe/gm-pc/pull/68) [@bozouai](https://github.com/baozouai)
## 1.6.3
`2021-12-10`
1. 🔥 column加上`isKeyboard`的prop [#65](https://github.com/gmfe/gm-pc/pull/65) [@bozouai](https://github.com/baozouai)
2. 🐞 修复`BoxPanel`map时没加key导致警告 [#66](https://github.com/gmfe/gm-pc/pull/66) [@bozouai](https://github.com/baozouai)
## 1.6.2

`2021-12-01`

1. 🔥 table的column增加hide字段，用于隐藏列 [#62](https://github.com/gmfe/gm-pc/pull/62) [@bozouai](https://github.com/baozouai)
2. 🔥 Tabs的每一项增加hide字段，用于隐藏该tab [#64](https://github.com/gmfe/gm-pc/pull/64) [@bozouai](https://github.com/baozouai)
3. 🔥 Table增加rowSelect，支持点击行选择，demo参照[table.stories](packages/table-x/src/table/table.stories.tsx) [#61][https://github.com/gmfe/gm-pc/pull/61] [@bozouai](https://github.com/baozouai)

全新库

# 3.0.0

### breaking change

17. TableSelect 的 `selected` 由选传修改为必传；

18. Sortable 和 GroupSortable 的 `onChange` 由选传修改为必传；

19. `@gm-pc/table-x` 的 Th 内部实现的 SortHeader 废弃；

20. 由于 TypeScript 目前不支持带泛型参数的`React.memo` [[@type/react] Generic Props lost with React memo](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37087) ，所以内部包裹了一层实现`typedMemo`；

21. 由于 TypeScript 不支持 react-table 中 `accessor` 中的嵌套定义，请使用以下方法替代：

    ```typescript
    import { Columns } from 'react-table'

    interface InitialDataItem {
      address: {
        text: string
        value: number
      }
    }

    const columns: Columns<InitialDataItem>[] = [
      {
        ...
        accessor: 'address.text' as any // 使用断言的方式绕过 TSC 对类型的校验
        // 或者
        // @ts-ignore
        accessor: 'address.text' // 禁用掉 TSC 对下一行代码的校验
      }
    ]
    ```

22. 在使用 DiyTableX 时，如果传入的 `accessor` 是一个 function，请提供唯一的 `id`；

23. 在使用 SelectTableX 的子组件 BatchActionBar 时，count 不再需要手动去除来切换当前页和全部页；

24. 全键盘 keyboardTableHoc 修改为 keyboardTableHOC，同时不再维护，请迁移使用 keyboardTableXHOC；

25. 由于 TypeScript 启动了 `isoluatedModules`（该选项是为了确保当前程序可以被 babel 正确编译），babel 在编译中将会对所有的 interface 或 type 报出没有该模块的警告。为了解决该问题，所有导出的类型都需要修改为

    ```typescript
    // a.ts
    interface AProps {}
    export type { AProps }

    // b.ts
    import type { AProps } from './a'
    ```

    [TypeScript 仅仅导入声明语法](https://juejin.im/post/5e0a07c1e51d4575ca50e3b5)
