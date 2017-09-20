<template>
  <div class="c-center">
    <ul>
      <li class="group-li">
        <a href="javascript:;" class="group-a">
          <img class="pic" src="http://img01.rastargame.com/p_upload/2017/0605/1496634201481713.png"/>
          <span class="name">colleague</span>
        </a>
      </li>
      <li class="group-li">
        <a href="javascript:;" class="group-a">
          <img class="pic" src="http://img01.rastargame.com/p_upload/2017/0605/1496634201481713.png"/>
          <span class="name">classmate</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  import './../../public/css/base.scss'
//  import Vue from 'vue'
//  import VueRouter from 'vue-router'
//  Vue.use(VueRouter)
//  const router = new VueRouter()
  export default {
    data () {
      return {
        showLogin: true,
        time: null      // Date.parse(new Date())
      }
    },
    created () {
      // window.localStorage.setItem(name, JSON.stringify(obj))
      // JSON.parse(window.localStorage.getItem(name))
    },
    methods: {
      changeShow () {
        this.showLogin = !this.showLogin
        console.log(this.showLogin)
      },
      getAccountGroup () {
        let chatState = this.$store.getters.getChatState
        this.$http({
          url: '/api/user/getAccountGroup',
          method: 'GET',
          params: {
            account: chatState.account
          }
        })
          .then((res) => {
            let data = res.data
            console.log(data)
            if (data.code === 200) {
              // 更新我加入的群

            } else {
              // 提示获取失败
            }
          })
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
  }
</style>
