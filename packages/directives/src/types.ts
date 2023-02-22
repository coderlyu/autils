export interface Binding {
  value: any
  oldValue: any
  arg: any
  modifiers: Record<string, any>
  expression?: string // vue2
  name?:string // vue2
  instance?: any // vue3 使用该指令的组件实例
  dir?: any // vue3 指令的定义对象
}