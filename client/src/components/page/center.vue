<template>
  <div class="c-center">
    <ul>
      <li class="group-li" v-for="account in accountGroups">
        <a href="javascript:;" class="group-a" @click="enterGroup({groupAccount: account.groupAccount, groupNickName: account.groupNickName})">
          <img class="pic" src="http://img01.rastargame.com/p_upload/2017/0605/1496634201481713.png"/>
          <span class="name">{{account.groupNickName}}</span>
        </a>
      </li>
      <!--<li class="group-li">-->
        <!--<a href="javascript:;" class="group-a">-->
          <!--<img class="pic" src="http://img01.rastargame.com/p_upload/2017/0605/1496634201481713.png"/>-->
          <!--<span class="name">colleague</span>-->
        <!--</a>-->
      <!--</li>-->
      <!--<li class="group-li">-->
        <!--<a href="javascript:;" class="group-a">-->
          <!--<img class="pic" src="http://img01.rastargame.com/p_upload/2017/0605/1496634201481713.png"/>-->
          <!--<span class="name">classmate</span>-->
        <!--</a>-->
      <!--</li>-->
    </ul>
    <a href="javascript:;" class="center-info">我的账号：{{chatState.account}}</a>
    <a href="javascript:;" class="center-info">我的昵称：{{chatState.nickName}}</a>
    <a href="javascript:;" class="login-out" @click="loginOut()">退出登录</a>
  </div>
</template>

<script>
  import './../../public/css/base.scss'
//  import io from 'socket.io-client'
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  Vue.use(VueRouter)
  const router = new VueRouter()
  export default {
    data () {
      return {
        chatState: '',
        accountGroups: [],
        socket: null
      }
    },
    created () {
      // 判断是否登录
      this.chatState = this.$store.getters.getChatState
      if (this.chatState.account) {
        // 请求数据库
        this.getAccountGroup()
      } else {
        router.push({ path: 'login' })
      }
    },
    methods: {
      getAccountGroup () {
        this.accountGroups = [
          {groupAccount: 101, groupNickName: '同事群'},
          {groupAccount: 102, groupNickName: '同学群'}
        ]
//        this.$http({
//          url: '/api/user/getAccountGroup',
//          method: 'GET',
//          params: {
//            account: this.chatState.account
//          }
//        })
//          .then((res) => {
//            let data = res.data
//            if (data.code === 200) {
//              // 更新我加入的群
//              this.accountGroups = data.accountGroups
//            } else {
//              // 提示获取失败
//              console.log(data.msg)
//            }
//          })
      },
      enterGroup (obj) {
        console.log('enterGroup:' + obj)
        // 先更新state：
        this.$store.dispatch('updateGroupState', obj)
        // 跳转路由
        router.push({ path: 'chatGroup', query: {groupAccount: obj.groupAccount} })
      },
      loginOut () {
        // 在不在线？在线离线的控制点在哪好呢
        this.$store.dispatch('updateChatState', {account: null, nickName: null})
        router.push({ path: 'login' })
      }
    }
  }
</script>

<style lang="scss" scope>
  .c-center{
    position: relative;
    box-sizing: border-box;
    max-width:600px;
    height: 100%;
    overflow: auto;
    margin: 0 auto;
    border: 1px solid #E6E6E6;
  }
  .group-li{
    .group-a{
      display: block;
      padding: 5px 10px;
      overflow: hidden;
      background: #dbeef7;
      border-bottom: 1px solid #d8d8d8;
      .pic{
        float: left;
        width: 50px;
        height: 50px;
        margin-right: 8px;
        border-radius: 50px;
      }
      .name{
        display: inline-block;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
      }
    }
    &:last-child{
      margin-bottom: 20px;
    }
  }
  .center-info{
    display: block;
    padding: 5px 0 5px 10px;
    font-size: 16px;
    background: #dbeef7;
  }
  .login-out{
    display: block;
    margin-top: 20px;
    padding: 15px 0;
    text-align: center;
    font-size: 16px;
    background: #dbeef7;
  }
</style>
