(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.vUrl = factory());
})(this, (function () { 'use strict';

    const colorNameMap = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dodgerblue: "#1e90ff",
        feldspar: "#d19275",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgrey: "#d3d3d3",
        lightgreen: "#90ee90",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslateblue: "#8470ff",
        lightslategray: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370d8",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#d87093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        violetred: "#d02090",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32",
    };

    var RegMap;
    (function (RegMap) {
        RegMap["RGB"] = "rgb";
        RegMap["RGBA"] = "rgba";
        RegMap["HEX"] = "hex";
        RegMap["HSL"] = "hsl";
        RegMap["NULL"] = "";
    })(RegMap || (RegMap = {}));

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
        match(type, color) {
            if (color && type) {
                return this.regMap[type].test(color);
            }
            return false;
        },
        isRgba(color) {
            return this.match(RegMap.RGBA, color);
        },
        isHex(color) {
            return this.match(RegMap.HEX, color);
        },
        isRgb(color) {
            return this.match(RegMap.RGB, color);
        },
        isHsl(color) {
            return this.match(RegMap.HSL, color);
        },
        isColor(color) {
            return (this.isRgb(color) ||
                this.isRgba(color) ||
                this.isHex(color) ||
                this.isHsl(color));
        },
        nameToHex(name) {
            return name in colorNameMap ? colorNameMap[name] : undefined;
        },
        normalizeNameColor(name) {
            const color = name in colorNameMap ? colorNameMap[name] : name;
            if (!this.isValidColor(color)) {
                throw new Error(`“${name}” is not a valid color`);
            }
            return color;
        },
        anyToRgb(color) {
            if (!this.isValidColor(color))
                throw new Error(`“${color}” is not a valid color`);
            const record = {
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
            }
            else if (this.isRgb(color)) {
                // rgb -- rgb(0,0,0)
                const res = color.match(this.regMap[RegMap.RGB]);
                if (res) {
                    let value = res[1];
                    const result = [];
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
            }
            else if (this.isHex(color)) {
                // hex -- #000
                const res = color.match(this.regMap[RegMap.HEX]);
                if (res) {
                    const [_, hexStr] = res;
                    record.type = RegMap.HEX;
                    record.value = this.hexToRgb(hexStr);
                }
            }
            else if (this.isHsl(color)) {
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
        hslToRgb(h, s, l) {
            let r, g, b;
            if (s === 0) {
                r = g = b = 1;
            }
            else {
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }
            function hue2rgb(p, q, t) {
                if (t < 0)
                    t += 1;
                if (t > 1)
                    t -= 1;
                if (t < 1 / 6)
                    return p + (q - p) * 6 * t;
                if (t < 1 / 2)
                    return q;
                if (t < 2 / 3)
                    return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), 1];
        },
        hexToRgb(hexStr = "") {
            if (!hexStr)
                return [];
            const result = [];
            if (hexStr.startsWith('#')) {
                hexStr = hexStr.slice(1);
            }
            if (hexStr.length === 3) {
                const arr = [];
                for (let i = 0; i < hexStr.length; i++) {
                    const c = hexStr[i].repeat(2);
                    arr.push(c);
                }
                hexStr = arr.join("");
            }
            // console.log('hexStr', hexStr)
            for (let i = 0; i < hexStr.length; i += 2) {
                result.push(parseInt(`0x${hexStr.slice(i, i + 2)}`));
            }
            result.push(1);
            return result;
        },
        rgbToHex(r, g, b) {
            let rr = Math.round(r).toString(16);
            let gg = Math.round(g).toString(16);
            let bb = Math.round(b).toString(16);
            rr = rr.length === 1 ? "0" + rr : rr;
            gg = gg.length === 1 ? "0" + gg : gg;
            bb = bb.length === 1 ? "0" + bb : bb;
            return `#(${rr}${gg}${bb}`;
        },
        rgbToHsl(r, g, b) {
            r = r === RGB_MAX ? 1 : (r % RGB_MAX) / RGB_MAX;
            g = g === RGB_MAX ? 1 : (g % RGB_MAX) / RGB_MAX;
            b = b === RGB_MAX ? 1 : (b % RGB_MAX) / RGB_MAX;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;
            if (max === min) {
                h = s = 0;
            }
            else {
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
        rgbToRgba(r, g, b, a) {
            return `rgba(${r}, ${g}, ${b}, ${a})`;
        },
        rgbToAny(toType = RegMap.RGB, ...reset) {
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
            return this.isColor(color);
        }
    };

    // Hex --- #000
    // RGB --- rgb(0, 0, 0)
    // RGBA --- rgba(0, 0, 0, 1)
    // HSL --- hsl(300, 100%, 25.1%)
    class aColor {
        constructor(color) {
            this.color = colorUtils.normalizeNameColor(color);
        }
        colorMixin(baseColor = "", mixinColor = "") {
            // 如果只有一个参数，baseColor = this.color
            if (!mixinColor) {
                mixinColor = baseColor;
                baseColor = this.color;
            }
            const { value: baseValue } = this.toArray(baseColor);
            const { value: mixinValue } = this.toArray(mixinColor);
            const [r1, g1, b1, a1] = baseValue;
            const [r2, g2, b2, a2] = mixinValue;
            const result = [];
            const fAlpBlend = (a1 * 100 + a2 * 100 - a1 * 10 * (a2 * 10)) / 100;
            result[0] = crCalculateBlend(a1, a2, r1, r2, fAlpBlend);
            result[1] = crCalculateBlend(a1, a2, g1, g2, fAlpBlend);
            result[2] = crCalculateBlend(a1, a2, b1, b2, fAlpBlend);
            result[3] = fAlpBlend;
            return `rgba(${result.join(",")})`;
        }
        anyToRgbArray(color = "") {
            const value = colorUtils.anyToRgb(color || this.color);
            return value;
        }
        toRgba(color, alpha) {
            if (typeof color === 'number') {
                alpha = color;
                color = this.color;
            }
            const { value } = this.anyToRgbArray(color);
            if (alpha && value.length >= 2) {
                value[3] = alpha;
            }
            return colorUtils.rgbToAny(colorUtils.RegMap.RGBA, ...value);
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
        toCss(color = "", toType, alpha) {
            const { value, type } = this.anyToRgbArray(color);
            return colorUtils.rgbToAny(toType || type, ...value);
        }
        toArray(color = "") {
            return colorUtils.anyToRgb(color);
        }
    }
    function crCalculateBlend(alpha1, alpha2, c1, c2, fAlpBlend) {
        return Math.floor((c1 * alpha1 * (1.0 - alpha2) + c2 * alpha2) / fAlpBlend);
    }
    function createColor(color) {
        const instance = new aColor(color);
        return instance;
    }

    return createColor;

}));
