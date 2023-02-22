import directives from './directives/index'
import { filterDirective, getVueVersion, hasOwnProperty } from './utils'
let isVue2 = true
let isVue3 = false
const compatibleToVue3 = (_directives: Record<string, any>, Vue: any): Record<string, any> => {
  // vue2 to vue3
  // 默认是 vue2指令
  // bind -> beforeMount
  // inserted -> mounted
  // componentUpdated -> updated
  // unbind -> unmounted
  const vue2LegalKeys = ['bind', 'inserted', 'update', 'componentUpdated', 'unbind']
  const vue3LegalKeys = ['created', 'beforeMount', 'mounted', 'beforeUpdate', 'update', 'updated', 'beforeUnmount', 'unmounted']
  const hasChangeMap = {
    bind: 'beforeMount',
    inserted: 'mounted',
    componentUpdated: 'updated',
    unbind: 'unmounted'
  }
  const version = getVueVersion(Vue)
  if(version.startsWith('2')) {
    // vue2
    // do nothing
  } else if(version.startsWith('3')) {
    // vue3
    isVue2 = false
    isVue3 = true
    for (const [directiveKey, directivesValue] of Object.entries(_directives)) {
      for (const [oldKey, newKey] of Object.entries(hasChangeMap)) {
        if(hasOwnProperty(directivesValue, oldKey) && !hasOwnProperty(directivesValue, newKey)) {
          directivesValue[newKey] = directivesValue[oldKey]
        }
      }
    }
  }
  let result: Record<string, any> = {}
  if(isVue2) {
    return filterDirective(_directives, vue2LegalKeys)
  } else if(isVue3) {
    return filterDirective(_directives, vue3LegalKeys)
  }
  return result
}

const useDirectives = (App: any) => {
  const _directives = compatibleToVue3(directives, App)
  for (const [key, value] of Object.entries(_directives)) {
    App.use(key, value)
  }
}
export default useDirectives