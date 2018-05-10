<template>
  <section class="copy-bar">&copy; 2018 北京企信云提供技术支持</section>
</template>

<script>
export default {
  name: 'FooterBar'
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .copy-bar {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 1000;
    padding: 12px;
    height: 58px;
    line-height: 34px;
    transition: left .28s;
  }
</style>
