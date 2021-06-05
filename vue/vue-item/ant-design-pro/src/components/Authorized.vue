<script>
import { check } from "../utils/auth";
export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true
    }
  },
  /* Vue 选项中的 render 函数若存在，则 Vue 构造函数不会从 template 选项或通过 el 选项指定的挂载元素中提取出的 HTML 模板编译渲染函数。 */
  render(h, context) {
    const { props, scopedSlots } = context;

    /* 
    向组件中传递不带 v-slot 指令的子节点时，这些子节点被存储在组件实例中的 $slots.default 中
    反正就是用 scopedSlots.default() 来获取槽位的内容并渲染到ui
    */
    return check(props.authority) ? scopedSlots.default() : null;
  }
};
</script>
