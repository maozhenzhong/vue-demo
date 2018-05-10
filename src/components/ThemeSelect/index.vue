<template>
  <el-dropdown class="theme-setting " trigger="click" @command="handleSetTheme">
    <span class="el-dropdown-link">
      <i class="iconfont icon-setting"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="light" :disabled="theme === 'light'">{{$t('headerBar.light')}}</el-dropdown-item>
      <el-dropdown-item command="dark" :disabled="theme === 'dark'">{{$t('headerBar.dark')}}</el-dropdown-item>
      <el-dropdown-item command="jack" :disabled="theme === 'jack'">{{$t('headerBar.jack')}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { changeTheme } from '@/utils'
import promptConfig from '@/promptConfig'
export default {
  name: 'ThemeSelect',
  data() {
    return {
    }
  },
  computed: {
    theme() {
      return this.$store.getters.theme
    }
  },
  methods: {
    handleSetTheme(themeItem) {
      const app = document.getElementById('app')
      this.$store.dispatch('setTheme', themeItem)
      this.$message({
        message: promptConfig.THEME_HAS_BEEN_CHANGED,
        type: 'success'
      })
      changeTheme(app, themeItem)
    }
  }
}
</script>
