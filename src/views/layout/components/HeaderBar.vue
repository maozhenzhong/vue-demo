<template>
  <el-header class="headerBar" height="58px">
      <!-- logo -->
      <router-link to="/" class="logo" :title="$t('headerBar.logo')">{{$t('headerBar.logo')}}</router-link>
      <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <div class="right-menu">
      <!-- 用户信息 -->
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
          <span class="login-user-info">{{name}}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">{{$t('headerBar.dashboard')}}</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/uCenter/BaseInfo">{{$t('headerBar.uCenter')}}</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="signOut" style="display:block;">{{$t('headerBar.signOut')}}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 主题设置 -->
      <theme-select class="right-menu-item"></theme-select>

      <!-- 更新缓存 -->
      <el-tooltip class="right-menu-item hidden-mobile" effect="dark" :content="$t('headerBar.refresh')" placement="bottom">
        <Refresh class="refresh right-menu-item"></Refresh>
      </el-tooltip>

      <!-- 全屏模式 -->
      <el-tooltip class="right-menu-item hidden-mobile" effect="dark" :content="$t('headerBar.screenfull')" placement="bottom">
        <Screenfull class="screenfull right-menu-item"></Screenfull>
      </el-tooltip>
    </div>
  </el-header>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'
import Refresh from '@/components/Refresh'
import ThemeSelect from '@/components/ThemeSelect'

export default {
  name: 'HeaderBar',
  components: {
    Hamburger,
    Screenfull,
    Refresh,
    ThemeSelect
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    signOut() {
      this.$store.dispatch('SignOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>