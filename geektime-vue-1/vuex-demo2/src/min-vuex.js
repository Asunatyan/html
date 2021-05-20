import Vue from 'vue'
const Store = function Store (options = {}) {
  const {state = {}, mutations={}} = options
  this._vm = new Vue({
    data: {
      $$state: state////this._vm._data.$$state
    },
  })
  this._mutations = mutations
}
//所有的 JavaScript 对象都会从一个 prototype（原型对象）中继承属性和方法：
/* 
JavaScript 对象有一个指向一个原型对象的链。当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，
还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。

可以理解成给对象添加一个属性/方法

*/
Store.prototype.commit = function(type, payload){
  debugger;
  if(this._mutations[type]) {
    this._mutations[type](this.state, payload)
  }
}
Object.defineProperties(Store.prototype, { 
  state: { 
    get: function(){//重写obj的get方法
      return this._vm._data.$$state//获取state的时候实际上是访问vm的State的值
    } 
  }
});
//导入 Vue 中的Store
export default {Store}
