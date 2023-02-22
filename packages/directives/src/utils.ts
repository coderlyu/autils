export const hasOwnProperty = (targetObj: Record<string, any>, key: string) => {
  return Object.prototype.hasOwnProperty.call(targetObj, key)
}
export const getVueVersion = (Vue: any) => {
  const version = Vue.version || '2'
  return version
}

export const filterDirective = (targetObj: Record<string, any>, fields: string[]): Record<string, any> => {
  const result: Record<string, any> = {}
  for (const [directiveKey, directivesValue] of Object.entries(targetObj)) {
    const _directive: Record<string, any> = {}
    for (const [key, value] of Object.entries(directivesValue)) {
      if(fields.includes(key)) {
        _directive[key] = value
      }
    }
    result[directiveKey] = _directive
  }
  return result
}
/**
 * 批量获取元素的最终样式
 * @param el 元素
 * @param fields 字段数组
 * @returns Array<field, style>
 */
export const getComputedStyles = (el: HTMLElement, fields: string[]) => {
  const result: Record<string, any> = {}
  if(el)  {
    const style = window.getComputedStyle(el, null)
    fields.forEach((field) => {
      const value = style.getPropertyValue(field)
      result[field] = value
    })
  }
  return result
}
/**
 * 处理copy的事件
 * @param text 文本
 */
export const handleCopyClick = (text: string) => {
  // 创建元素
  if (!document.getElementById('copyTarget')) {
    const copyTarget = document.createElement('input')
    copyTarget.setAttribute('style', 'position:fixed;top:0;left:0;opacity:0;z-index:-1000;')
    copyTarget.setAttribute('id', 'copyTarget')
    document.body.appendChild(copyTarget)
  }

  // 复制内容
  const input = document.getElementById('copyTarget') as HTMLInputElement
  if(input) {
    input.value = text
    input.select()
    document.execCommand('copy')
  }
}

export const getType = (value: any) => {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
}

export const isObject = (value: any) => {
  return getType(value) === 'string'
}

export const isArray = (value: any) => {
  return Array.isArray(value)
}

export const isFunction = (value: any) => {
  return getType(value) === 'function'
}