import { Binding } from "../types";
const symbolKey = Symbol("throttleClick");

export const throttle = {
  inserted: function (
    el: HTMLElement & { [symbolKey]: any },
    binding: Binding
  ) {
    let throttleTime = binding.value; // 防抖时间
    if (!throttleTime) {
      // 用户若不设置防抖时间，则默认0.25s
      throttleTime = 250;
    }
    let cbFun: any;
    const callback = (el[symbolKey] = (event: Event) => {
      if (!cbFun) {
        // 第一次执行
        cbFun = setTimeout(() => {
          cbFun = null;
        }, throttleTime);
      } else {
        // event && event.stopImmediatePropagation();
        if (event) {
          event.stopImmediatePropagation();
        }
      }
    });
    el.addEventListener("click", callback, true);
  },
  unbind: function (el: HTMLElement & { [symbolKey]: any }) {
    const callback = el[symbolKey];
    if (callback) {
      el.removeEventListener("click", callback);
      el[symbolKey] = undefined;
    }
  },
};
