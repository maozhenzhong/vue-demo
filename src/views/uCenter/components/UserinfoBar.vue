<template>
  <div class="userinfo-side">
    <figure class="avatar-info">
      <img class="avatar" :src="userInfo.avatarUrl">
      <span class="name">{{userInfo.name}}</span>
    </figure>
    <div class="easy-navigation">
      <ul class="navbar">
        <li>
          <router-link to="./baseInfo">{{$t('userInfo.userInfo')}}</router-link>
        </li>
        <li>
          <router-link to="./bankInfo">{{$t('userInfo.bankInfo')}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserinfoBar',
  props: ['userInfo']
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
@import "src/styles/variables.scss";
.userinfo-side {
  .avatar-info {
    margin-top: 0;
    margin-right: auto;
    margin-bottom: 12px;
    margin-left: auto;
    padding: 16px;
    min-width: 160px;
    text-align: center;

    .avatar {
      margin: 0 auto;
      display: block;
      width: 128px;
      height: 128px;
    }

    .name {
      display: block;
      font-size: 14px;
      line-height: 34px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .easy-navigation {
    .navbar {
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        a {
          position: relative;
          padding-left: 12px;
          display: block;
          font-size: 14px;
          line-height: 40px;
          color: $gray;
          border-bottom: 1px solid $gray-300;
          transition: all .15s linear;

          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 0;
            z-index: 10;
            margin-top: -20px;
            display: black;
            width: 3px;
            height: 40px;
            transition: all .15s linear;
          }
        }
      }
    }
  }
}
</style>
