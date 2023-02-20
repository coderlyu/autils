import { RegMap, ToArrayRecord } from "./types";
import colorUtils from "./utils";
// Hex --- #000
// RGB --- rgb(0, 0, 0)
// RGBA --- rgba(0, 0, 0, 1)
// HSL --- hsl(300, 100%, 25.1%)
class aColor {
  color: string;
  constructor(color: string) {
    this.color = colorUtils.normalizeNameColor(color);
  }
  colorMixin(baseColor = "", mixinColor = ""): string {
    // 如果只有一个参数，baseColor = this.color
    if (!mixinColor) {
      mixinColor = baseColor;
      baseColor = this.color;
    }
    const { value: baseValue } = this.toArray(baseColor);
    const { value: mixinValue } = this.toArray(mixinColor);
    const [r1, g1, b1, a1] = baseValue;
    const [r2, g2, b2, a2] = mixinValue;
    const result: number[] = [];
    const fAlpBlend = (a1 * 100 + a2 * 100 - a1 * 10 * (a2 * 10)) / 100;
    result[0] = crCalculateBlend(a1, a2, r1, r2, fAlpBlend);
    result[1] = crCalculateBlend(a1, a2, g1, g2, fAlpBlend);
    result[2] = crCalculateBlend(a1, a2, b1, b2, fAlpBlend);
    result[3] = fAlpBlend;
    return `rgba(${result.join(",")})`;
  }
  anyToRgbArray(color = "") {
    const value = colorUtils.anyToRgb(color || this.color);
    return value
  }
  toRgba(color = "") {
    return this.toCss(color, colorUtils.RegMap.RGBA);
  }
  toHex(color = "") {
    return this.toCss(color, colorUtils.RegMap.HEX);
  }
  toRgb(color = "") {
    return this.toCss(color, colorUtils.RegMap.RGB);
  }
  toHsl(color = "") {
    return this.toCss(color, colorUtils.RegMap.HSL);
  }
  toCss(color = "", toType?: RegMap) {
    const { value, type } = this.anyToRgbArray(color);
    return colorUtils.rgbToAny(toType || type, ...value);
  }
  toArray(color = ""): ToArrayRecord {
    return colorUtils.anyToRgb(color);
  }
}
function crCalculateBlend(
  alpha1: number,
  alpha2: number,
  c1: number,
  c2: number,
  fAlpBlend: number
) {
  return Math.floor((c1 * alpha1 * (1.0 - alpha2) + c2 * alpha2) / fAlpBlend);
}
function createColor(color: string): aColor {
  const instance = new aColor(color);
  return instance;
}

export default createColor;
