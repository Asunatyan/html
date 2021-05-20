<template>
  <div id="app">
    {{count}}
    <button @click="$store.commit('increment')">count++</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    count() {
      debugger
      return this.$store.state.count
    }
  }
}
</script>

<style>

</style>
