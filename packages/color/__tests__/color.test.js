'use strict';

const createColor = require('../lib/index.cjs');
const { expect } = require('chai');

const baseColor = '#f0f1f2'
const baseRgbaColor = 'rgba(240, 241, 242, 1)'
const baseHslColor = 'hsl(210, 7%, 95%)'
const baseRgbColor =  'rgb(240, 241, 242)'

describe('[@au/color]: 基本功能测试', () => {
  it('create color', () => {
    const color = createColor(baseColor)
    expect(color.color).equal(baseColor)
  })
  it('hex to rgba', () => {
    const color = createColor(baseColor)
    const rgba = color.toRgba()
    expect(rgba).equal(baseRgbaColor)
  })
  it('hex to hsl', () => {
    const color = createColor(baseColor)
    const hsl = color.toHsl()
    expect(hsl).equal(baseHslColor)
  })
  it('hex to rgb', () => {
    const color = createColor(baseColor)
    const rgb = color.toRgb()
    expect(rgb).equal(baseRgbColor)
  })
  it('test not valid color', (done) => {
    function run() {
      return new Promise((resolve, reject) => {
        try {
          const color = createColor('000')
          resolve()
        } catch (error) {
         reject(error)
        }
      })
    }
    run().then(() => {
      //
      done('test is a valid color')
    }).catch((err) => {
      expect(true).equal(true)
      done()
    })
  })
  it('test toRgba methods', () => {
    const color = createColor(baseColor)
    const toColor = color.toRgba('#757575')
    expect(toColor).equal('rgba(117, 117, 117, 1)')
    expect(toColor).not.equal(baseRgbaColor)
  })
  it('color mixin', () => {
    const color = createColor(baseColor)
    const toColor = color.colorMixin('rgba(117,117,117, 0.5)')
    expect(toColor).equal('rgba(178,179,179,1)')
    const alphaColor = color.colorMixin('#a18cce', 'rgba(0,0,0,0.3)')
    expect(alphaColor).equal('rgba(112,98,144,1)')
  })
})
