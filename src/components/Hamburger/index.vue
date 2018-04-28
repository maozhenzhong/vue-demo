<template>
  <div class="hamburger-drag">
    <div class="hamburger" :class="{'is-active':isActive}">
      <i class="iconfont icon-hamburger" @click="toggleClick"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.hamburger-drag {
  display: inline-block;
  text-align: center;

  .hamburger {
    cursor: pointer;
    width: 100%;
    height: 100%;
    transform: rotate(90deg);
    transition: all .3s linear;

    .iconfont {
      font-size: 16px;
    }

    &.is-active {
      transform: rotate(0);
    }
  }
}
</style>
