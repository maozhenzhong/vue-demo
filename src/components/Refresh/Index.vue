<template>
  <div>
    <i class="iconfont icon-refresh" @click="click"></i>
  </div>
</template>
<script>
export default {
  name: 'Refresh',
  methods: {
    click() {
      location.reload()
    }
  }
}
</script>
