import { getComputedStyles, isObject } from "../utils";
import { Binding } from "../types";
// 给元素添加蒙层
export const mask = {
  inserted(el: HTMLElement, binding: Binding) {
    let backColor = "rgba(0, 0, 0, 0.05)",
      z_index = "1";
    if (isObject(binding.value)) {
      const { color = "rgba(0, 0, 0, 0.05)", zIndex = "1" } =
        binding.value || {};
      backColor = color;
      z_index = zIndex;
    } else {
      backColor = binding.value;
    }
    const { position, borderRadius } = getComputedStyles(el, [
      "position",
      "borderRadius",
    ]);
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.borderRadius = borderRadius;
    div.style.left = "0px";
    div.style.top = "0px";
    div.style.bottom = "0px";
    div.style.right = "0px";
    div.style.backgroundColor = backColor;
    div.style.zIndex = String(z_index);
    //
    if (!position) {
      el.style.position = "relative";
    }
    el.appendChild(div);
  },
};