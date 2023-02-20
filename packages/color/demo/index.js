const createColor = require('../lib/index.cjs')
const baseColor = '#f0f1f2'
// const color = createColor('123')
// const rgba = color.toRgba()
// console.log(rgba)

// function run() {
//   return new Promise((resolve, reject) => {
//     try {
//       const color = createColor('000')
//       resolve()
//     } catch (error) {
//      reject(error)
//     }
//   })
// }
// run().then(() => {
//   //
//   console.log('0000')
// }).catch((err) => {
//   console.log('err', err)
// })

const color = createColor(baseColor)
const toColor = color.colorMixin('rgba(117,117,117, 0.5)')
console.log(toColor)