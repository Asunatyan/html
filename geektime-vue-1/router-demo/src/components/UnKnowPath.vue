<template>
  <p>404</p>
</template>
<script>
export default {
  props: ['id'],
  computed: {
    routerInfo() {
      const { fullPath, path, name, params, query, meta } = this.$route
      return {
        fullPath, path, name, params, query, meta
      }
    }
  }
}
</script>

