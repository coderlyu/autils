import { Binding } from "../types";
import { isFunction } from '../utils'
const symbolKey = Symbol("symbolKey");
const symbolTimer = Symbol('symbolTimer')
const symbolEventListener = Symbol("symbolEventListener");
type keys = { [symbolKey]: any; [symbolEventListener]: any, [symbolTimer]: any  }
export const debounce = {
  bind: function (
    el: HTMLElement & keys,
    binding: Binding,
    vnode: any
  ) {
    // 添加点击事件
    // vue2 vnode.data.on.click
    // vue3 vnode.props.onClick
    console.log(vnode.props)
    let cbFun: any = (vnode.props && vnode.props.onClick) || vnode.data && vnode.data.on && vnode.data.on.click;
    if(!cbFun) return
    el[symbolEventListener] = cbFun
    const debounceTime = binding.value || 250
    let timer: NodeJS.Timeout | null = el[symbolTimer] = null
    const eventListener = (el[symbolKey] = (event: Event) => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        if(isFunction(cbFun)) cbFun.call(vnode)
        timer = null;
      }, debounceTime);
      event && event.stopImmediatePropagation();
    });
    el.addEventListener("click", eventListener, true);
  },
  unbind: function (
    el: HTMLElement & keys
  ) {
    const eventListener = el[symbolEventListener];
    if (eventListener) {
      el.removeEventListener("click", eventListener);
      el[symbolEventListener] = undefined;
    }
    if(el[symbolTimer]) {
      el[symbolTimer] = null
    }
  },
};
