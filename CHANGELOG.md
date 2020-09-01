# 0.0.1

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

    interface InitialDataOptions {
      address: {
        text: string
        value: number
      }
    }

    const columns: Columns<InitialDataOptions>[] = [
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
