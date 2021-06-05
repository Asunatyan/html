import { check } from "../../utils/auth";

function install(Vue, options = {}) {
  Vue.directive(options.name || "auth", { //Vue.directive( id, [definition] ) 注册或获取全局指令。
    inserted(el, binding) {//inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
      /*el 指令所绑定的元素，可以用来直接操作 DOM。 
      binding：一个对象
        - value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2
       */
      if (!check(binding.value)) {
        /* 当前绑定的元素有父类,则从父类中移除 */
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  });
}

export default { install };
