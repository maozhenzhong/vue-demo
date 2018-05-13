<template>
  <div class="container-fluid">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="农户认证" name="farmer">农户认证</el-tab-pane>
      <el-tab-pane label="企业认证" name="enterPrise">企业认证</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Farmer',
  data() {
    return {
      activeName: 'farmer'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(event)
      console.log(tab)
    }
  }
}
</script>
