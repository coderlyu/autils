import { Binding } from "../types";
const symbolClickKey = Symbol('handleBackTopClick')
const symbolScrollKey = Symbol('handleBackTopScroll')
export const backTop = {
  bind(el: HTMLElement & { [symbolClickKey]: any }, binding: Binding) {
    // if(isObject(binding.value)) {
    //   const {} = binding.value || {}
    // }
    const callback = el[symbolClickKey] = () => {
      const target = binding.arg
        ? document.getElementById(binding.arg)
        : window;
      target &&
        target.scrollTo({
          top: 0,
          behavior: "smooth",
        });
    };
    el.addEventListener("click", callback);
  },
  update(el: HTMLElement & { [symbolScrollKey]: any}, binding: Binding) {
    // 滚动到达参数值才出现绑定指令的元素
    const target = binding.arg ? document.getElementById(binding.arg) : window;
    if (target) {
      if (binding.value) {
        const callback = el[symbolScrollKey] = ((e: HTMLElement| Window) => {
          const scrollTop = (e as HTMLElement).scrollTop || (e as Window).scrollY
          if (scrollTop > binding.value) {
            el.style.visibility = "unset";
          } else {
            el.style.visibility = "hidden";
          }
        }) as unknown as EventListenerOrEventListenerObject
        target.addEventListener("scroll", callback);
      }
      // 判断初始化状态
      if (((target as HTMLElement).scrollTop || (target as Window).scrollY) < binding.value) {
        el.style.visibility = "hidden";
      }
    }
  },
  unbind(el: HTMLElement&{[symbolClickKey]: any, [symbolScrollKey]: any}, binding: Binding) {
    const target = binding.arg ? document.getElementById(binding.arg) : window;
    if (target) {
      if(el[symbolScrollKey]) 
        target.removeEventListener("scroll", el[symbolScrollKey])
      
      if(el[symbolClickKey]) el.removeEventListener("click", el[symbolClickKey]);
    }
  },
};
