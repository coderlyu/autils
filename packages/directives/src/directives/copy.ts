import { handleCopyClick } from "../utils";
import { Binding } from "../types";
// 复制
export const copy = {
  bind(el: HTMLElement, binding: Binding) {
    // 双击触发复制
    if (binding.modifiers.dblclick) {
      el.addEventListener("dblclick", () => handleCopyClick(el.innerText));
      el.style.cursor = "copy";
    } else {
      // 单击触发复制
      el.addEventListener("click", () => handleCopyClick(el.innerText));
      el.style.cursor = "copy";
    }
  },
};