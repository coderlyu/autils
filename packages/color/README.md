# 颜色转换库

> 颜色(hsl, hex, rgba, rgb)之间转换
> 颜色混合叠加(两个颜色叠加，转换成一个颜色)

## Usage

```
const createColor = require('color');
const color = createColor('#fff')
// to rgba color
// const rgbaColor = color.toRgba()

// to hsl color
// const hslColor = color.toHsl()

// color mixin
// const mixinColor = color.colorMixin('rgba(178,179,179,1)')
```

## API
### methods
| 属性名 |  描述  |  入参  | 出参 |
| ----- | ---- | ----- | ----- |
| colorMixin |  颜色混合| (color1?:string, color2?: string) | color: string |
| anyToRgbArray |  转换成数组| (color1?:string) | number<r, g, b, a>[] |
| toRgba | 转换成rgba格式 | (color1?:string) | color: string |
| toHex |  转换成hex格式 | (color1?:string) | color: string |
| toRgb |  转换成rgb格式 | (color1?:string) | color: string |
| toHsl |  转转成hsl格式 | (color1?:string) | color: string |
| toCss |  同上 | (color1?:string) | color: string |