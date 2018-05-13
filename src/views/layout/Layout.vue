<template>
  <!-- <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}"> -->
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <header-bar></header-bar>
    <div class="main-container">
      <sidebar class="sidebar-container"></sidebar>
      <breadcrumb class="breadcrumb-container"></breadcrumb>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { HeaderBar, Sidebar, AppMain } from './components'
import Breadcrumb from '@/components/Breadcrumb'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    HeaderBar,
    Breadcrumb,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  min-height: 100%;
  width: 100%;
}

.breadcrumb-container {
  padding-left: 12px;
  height: 48px;
  line-height: 48px;
}
</style>
