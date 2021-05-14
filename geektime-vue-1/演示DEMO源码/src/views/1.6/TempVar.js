export default {
  functional: true,
      //。该渲染函数接收一个 createElement 方法作为第一个参数用来创建 VNode。
      //如果组件是一个函数组件，渲染函数还会接收一个额外的 context 参数，为没有实例的函数组件提供上下文信息。
  render: (h, ctx) => {
    //作用域插槽的本质是方法，而这个方法就是scopedSlots.xxx 
    //这个方法接收的参数就是传递的变量 其实等价于 <slot v-bind="props"/>
    //vm.$scopedSlots 用来访问作用域插槽。对于包括 默认 slot 在内的每一个插槽，该对象都包含一个返回相应 VNode 的函数。
    
    return ctx.scopedSlots.default && ctx.scopedSlots.default(ctx.props || {});
  }
};
