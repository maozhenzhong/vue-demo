<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
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
import bowser from 'bowser'

export default {
  name: 'layout',
  components: {
    HeaderBar,
    Breadcrumb,
    Sidebar,
    AppMain
  },
  mounted() {
    if (bowser.mobile) {
      this.hiddenSidebar()
      window.addEventListener('resize', this.hiddenSidebar)
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },
  methods: {
    hiddenSidebar() {
      this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

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
