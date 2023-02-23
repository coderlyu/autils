# `directive`
> vue 自定义指令，区分vue2， vue3

## Usage

```
const directive = require('directive');

// TODO: DEMONSTRATE API
```

## vue2,vue3自定义指令区别
[Vue3和Vue2的差异系列之自定义指令](https://developer.aliyun.com/article/1111106)
### vue2
1. bind: 只会调用一次，指令 ==第一次== 绑定到元素时会调用
2. inserted: 被绑定元素插入父节点时调用
3. update: 元素第一次绑定不会触发，绑定的值发生更新触发，可能发生在其子节点更新之前
4. componentUpdated: 指令所在组件的 VNode 及其子 VNode 全部更新后调用
5. unbind: 只调用一次，指令与元素解绑时调用
### vue3
1. created: **新增**！在元素的 attribute 或事件监听器被应用之前调用
2. bind → beforeMount
3. inserted → mounted
4. beforeUpdate: **新增**！在元素本身被更新之前调用，与组件的生命周期钩子十分相似
5. update: **移除**！该钩子与 updated 有太多相似之处，因此它是多余的。请改用 updated
6. componentUpdated → updated
7. beforeUnmount: **新增**！与组件的生命周期钩子类似，它将在元素被卸载之前调用
8. unbind -> unmounted

## TODO

|   属性名   |    描述    |
| --------- | ------------------- |
| mask | 元素上添加蒙层 |
| focus | 元素聚焦 |
|  blur | 元素失焦点 |
| copy | 复制内容 |
| backTop | 回到顶部 |
| debounce | 防抖 |
| throttle | 节流 |
| xx | 展开收起 |