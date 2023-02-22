import { Binding } from "./types";
// 文本超出省略
export const ellipsis = {
  bind(el: HTMLElement, binding: Binding) {
    const line = binding.value || 1;
    el.style.overflow = "hidden";
    el.style.textOverflow = "ellipsis";
    el.style.display = "-webkit-box";
    el.style["-webkit-line-clamp" as unknown as number] = line;
    el.style["-webkit-box-orient" as unknown as number] = "vertical";
  },
};