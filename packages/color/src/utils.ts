import { colorNameMap } from "./constants";
import { ToArrayRecord, RegMap } from "./types";
const regMap = {
  [RegMap.RGB]: /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/,
  [RegMap.RGBA]: /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d*\.*\d*)\s*\)$/,
  [RegMap.HEX]: /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,
  [RegMap.HSL]: /^hsl\(\s*(\d+)\s*,\s*(\d*\.*\d*)%\s*,\s*(\d*\.*\d*)%\s*\)$/,
  [RegMap.NULL]: undefined
};
const RGB_MAX = 255;
const HUE_MAX = 360;
const SV_MAX = 100;
const colorUtils = {
  RegMap,
  regMap,
  match(type: RegMap, color: string): boolean {
    if (color && type) {
      return this.regMap[type].test(color)
    }
    return false;
  },
  isRgba(color: string) {
    return this.match(RegMap.RGBA, color);
  },
  isHex(color: string) {
    return this.match(RegMap.HEX, color);
  },
  isRgb(color: string) {
    return this.match(RegMap.RGB, color);
  },
  isHsl(color: string) {
    return this.match(RegMap.HSL, color);
  },
  isColor(color: string) {
    return (
      this.isRgb(color) ||
      this.isRgba(color) ||
      this.isHex(color) ||
      this.isHsl(color)
    );
  },
  nameToHex(name: string) {
    return name in colorNameMap ? colorNameMap[name] : undefined;
  },
  normalizeNameColor(name: string): string {
    const color = name in colorNameMap ? colorNameMap[name] : name;
    if(!this.isValidColor(color)) {
      throw new Error(`“${name}” is not a valid color`);
    }
    return color
  },
  anyToRgb(color: string): ToArrayRecord {
    if(!this.isValidColor(color))
      throw new Error(`“${color}” is not a valid color`);
    const record: ToArrayRecord = {
      type: RegMap.NULL,
      value: [],
    };
    if (this.isRgba(color)) {
      // rgba -- rgba(0,0,0,1)
      const res = color.match(this.regMap[RegMap.RGBA]);
      if (res) {
        const [_, r, g, b, a] = res;
        record.type = RegMap.RGBA;
        record.value = [r, g, b, a].map((e) => Number(e));
      }
    } else if (this.isRgb(color)) {
      // rgb -- rgb(0,0,0)
      const res = color.match(this.regMap[RegMap.RGB]);
      if (res) {
        let value = res[1];
        const result: number[] = [];
        if (value.length === 3) {
          value = value[0].repeat(2) + value[1].repeat(2) + value[2].repeat(2);
        }
        for (let i = 0; i < value.length; i += 2) {
          const c = value[i] + value[i + 1];
          result.push(parseInt(`0x${c}`));
        }
        result.push(1);
        record.type = RegMap.RGB;
        record.value = result;
      }
    } else if (this.isHex(color)) {
      // hex -- #000
      const res = color.match(this.regMap[RegMap.HEX]);
      if (res) {
        const [_, hexStr] = res;
        record.type = RegMap.HEX;
        record.value = this.hexToRgb(hexStr);
      }
    } else if (this.isHsl(color)) {
      // hsl -- hsl(200, 50%, 40%)
      const res = color.match(this.regMap[RegMap.HSL]);
      if (res) {
        const [_, h, s, l] = res;
        const result = this.hslToRgb(Number(h), Number(s), Number(l));
        result.push(1);
        record.type = RegMap.HEX;
        record.value = result;
      }
    }
    return record;
  },
  hslToRgb(h: number, s: number, l: number) {
    let r, g, b;
    if (s === 0) {
      r = g = b = 1;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    function hue2rgb(p: number, q: number, t: number) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), 1];
  },
  hexToRgb(hexStr = "") {
    if (!hexStr) return [];
    const result: number[] = [];
    if(hexStr.startsWith('#')) {
      hexStr = hexStr.slice(1)
    }
    if (hexStr.length === 3) {
      const arr: string[] = [];
      for (let i = 0; i < hexStr.length; i++) {
        const c = hexStr[i].repeat(2);
        arr.push(c);
      }
      hexStr = arr.join("");
    }
    console.log('hexStr', hexStr)
    for (let i = 0; i < hexStr.length; i+= 2) {
      result.push(parseInt(`0x${hexStr.slice(i, i + 2)}`));
    }
    result.push(1);
    return result;
  },
  rgbToHex(r: number, g: number, b: number): string {
    let rr = Math.round(r).toString(16);
    let gg = Math.round(g).toString(16);
    let bb = Math.round(b).toString(16);

    rr = rr.length === 1 ? "0" + rr : rr;
    gg = gg.length === 1 ? "0" + gg : gg;
    bb = bb.length === 1 ? "0" + bb : bb;
    return `#(${rr}${gg}${bb}`;
  },
  rgbToHsl(r: number, g: number, b: number) {
    r = r === RGB_MAX ? 1 : (r % RGB_MAX) / RGB_MAX;
    g = g === RGB_MAX ? 1 : (g % RGB_MAX) / RGB_MAX;
    b = b === RGB_MAX ? 1 : (b % RGB_MAX) / RGB_MAX;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    (h = Math.round(h * HUE_MAX)),
      (s = Math.round(s * SV_MAX)),
      (l = Math.round(l * SV_MAX));
    return `hsl(${h}, ${s}%, ${l}%)`;
  },
  rgbToRgba(r: number, g: number, b: number, a: number) {
    return `rgba(${r}, ${g}, ${b}, ${a})`
  },
  rgbToAny(toType = RegMap.RGB, ...reset: number[]): string {
    const [r, g, b, alpha = 1] = reset;
    switch (toType) {
      case RegMap.RGB:
        return `rgb(${r}, ${g}, ${b})`;
      case RegMap.RGBA:
        return this.rgbToRgba(r, g, b, alpha);
      case RegMap.HEX:
        return this.rgbToHex(r, g, b);
      case RegMap.HSL:
        return this.rgbToHsl(r, g, b);
      default:
        return "";
    }
  },
  isValidColor(color = '') {
    return this.isColor(color)
  }
};

export default colorUtils;
