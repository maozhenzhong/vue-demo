<template>
  <div id="app" :class="theme">
    <router-view></router-view>
  </div>
</template>

<script>
  export default{
    name: 'App',
    data() {
      return {
        theme: this.$store.getters.theme
      }
    }
  }
</script>
