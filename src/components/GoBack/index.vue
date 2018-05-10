<template>
  <div class="tabs-side-menu">
    <i class="el-icon-close icon-close" @click="goBack" :title="$t('action.close')"></i>
  </div>
</template>

<script>
export default {
  name: 'GoBack',
  data() {
    return {

    }
  },
  methods: {
    goBack() {
      return this.$router.go(-1)
    }
  }
}
</script>