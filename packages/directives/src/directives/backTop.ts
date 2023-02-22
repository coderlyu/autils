import { Binding } from "../types";
let handleBackTopClick: EventListenerOrEventListenerObject |null = null;
let handleBackTopScroll: EventListenerOrEventListenerObject | null = null
export const backTop = {
  bind(el: HTMLElement, binding: Binding) {
    // if(isObject(binding.value)) {
    //   const {} = binding.value || {}
    // }
    handleBackTopClick = () => {
      const target = binding.arg
        ? document.getElementById(binding.arg)
        : window;
      target &&
        target.scrollTo({
          top: 0,
          behavior: "smooth",
        });
    };
    el.addEventListener("click", handleBackTopClick);
  },
  update(el: HTMLElement, binding: Binding) {
    // 滚动到达参数值才出现绑定指令的元素
    const target = binding.arg ? document.getElementById(binding.arg) : window;
    if (target) {
      if (binding.value) {
        handleBackTopScroll = ((e: HTMLElement| Window) => {
          const scrollTop = (e as HTMLElement).scrollTop || (e as Window).scrollY
          if (scrollTop > binding.value) {
            el.style.visibility = "unset";
          } else {
            el.style.visibility = "hidden";
          }
        }) as unknown as EventListenerOrEventListenerObject
        target.addEventListener("scroll", handleBackTopScroll);
      }
      // 判断初始化状态
      if (((target as HTMLElement).scrollTop || (target as Window).scrollY) < binding.value) {
        el.style.visibility = "hidden";
      }
    }
  },
  unbind(el: HTMLElement, binding: Binding) {
    const target = binding.arg ? document.getElementById(binding.arg) : window;
    if (target) {
      handleBackTopScroll && target.removeEventListener("scroll", handleBackTopScroll);
      handleBackTopClick && el.removeEventListener("click", handleBackTopClick);
    }
  },
};
