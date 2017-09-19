<template>
  <div class="c-login">
    <div class="login-name">
      <div class="name" v-if="showLogin">
        <input class="name-input" type="number" maxlength="10" placeholder="账号(6位数字)" v-model="loginAccount"/>
        <input class="name-input" type="number" maxlength="10" placeholder="密码(6位数字)" v-model="loginPass"/>
        <p class="name-p"><a class="btn" @click="pickLogin" herf="javascript:;">login</a></p>
        <a class="btn-a" @click="changeShow" herf="javascript:;">register -></a>
      </div>
      <div class="name" v-if="!showLogin">
        <input class="name-input" type="number" maxlength="10" placeholder="账号(6位数字)" v-model="registerAccount"/>
        <input class="name-input" type="text" maxlength="10" placeholder="昵称(不能为空)" v-model="registerNickName"/>
        <input class="name-input" type="number" maxlength="10" placeholder="密码(6位数字)" v-model="registerPass"/>
        <p class="name-p"><a class="btn" @click="pickRegister" herf="javascript:;">register</a></p>
        <a class="btn-a" @click="changeShow" herf="javascript:;">login -></a>
      </div>
      <p class="warning-p" v-show="showWarning">{{waringText}}</p>
    </div>
  </div>
</template>

<script>
  import './../../public/css/base.scss'
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  Vue.use(VueRouter)
  const router = new VueRouter()
  export default {
    data () {
      return {
        showLogin: true,
        waringText: '输入有误！',
        showWarning: false,
        loginAccount: '',
        loginPass: '',
        registerAccount: '',
        registerNickName: '',
        registerPass: '',
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
      pickLogin () {
        this.loginAccount = this.loginAccount.replace(/\s+/g, '')
        this.loginPass = this.loginPass.replace(/\s+/g, '')
        if (this.checkSixNum(this.loginAccount) && this.checkSixNum(this.loginPass)) {
          console.log('pass:')
          this.login()
        } else {
          this.waringText = '请输入正确的账号和密码！'
          this.showWarning = true
        }
      },
      login () {
        this.$http({
          url: '/api/user/login',
          method: 'GET',
          params: {
            account: this.loginAccount,
            pass: this.loginPass
          }
        })
          .then((res) => {
            let data = res.data
            console.log(data)
            if (data.code === 200) {
              // 登录成功,跳转路由
              console.log(data.msg)
              this.waringText = ''
              this.showWarning = false
//              router.push({ path: 'chatGroup' })
            } else {
              this.waringText = data.msg
              this.showWarning = true
            }
          })
      },
      pickRegister () {
        this.registerAccount = this.registerAccount.replace(/\s+/g, '')
        this.registerNickName = this.registerNickName.replace(/\s+/g, '')
        this.registerPass = this.registerPass.replace(/\s+/g, '')
        if (this.checkSixNum(this.registerAccount) && this.registerNickName.length > 0 && this.checkSixNum(this.registerPass)) {
          this.register()
//          this.successPass(this.registerAccount)
        } else {
          this.waringText = '请输入正确的账号和密码！'
          this.showWarning = true
        }
      },
      register () {
        this.$http({
          url: '/api/user/register',
          method: 'GET',
          params: {
            account: this.registerAccount,
            nickName: this.registerNickName,
            pass: this.registerPass,
            regTime: Date.parse(new Date())
          }
        })
          .then((res) => {
            let data = res.data
            console.log(data)
            if (data.code === 200) {
              // 注册成功,跳转路由
              console.log(data.msg)
              this.waringText = ''
              this.showWarning = false
//              router.push({ path: 'chatGroup' })
            } else {
              this.waringText = data.msg
              this.showWarning = true
            }
          })
      },
      successPass (account) {
        // 写入store
        this.$store.dispatch('updateChatState', {account: parseInt(account), nickName: '昵称' + account})
        // 写localStorage
        window.localStorage.setItem('CHAT-account', JSON.stringify({account: account}))
        let text = JSON.parse(window.localStorage.getItem('CHAT-account'))
        console.log(text)
        // 跳转路由
        router.push({ path: 'chatGroup' })
      },
      checkSixNum (num) {
        let pattern = /^\d{6}$/
        if (pattern.test(num)) {
          return true
        } else {
          return false
        }
      }
    }
  }
</script>

<style lang="scss" scope>
  .c-login{
    position: relative;
    box-sizing: border-box;
    max-width:600px;
    height: 100%;
    overflow: auto;
    margin: 0 auto;
    border: 1px solid #E6E6E6;
  }
  .login-name{
    position: fixed;
    z-index: 99;
    top:0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0,0.8);
    .name{
      width:310px;
      margin: 50px auto 0;
      text-align: center;
      .name-tip{
        font-size: 18px;
        color: #ffffff;
      }
      .name-input{
        height:24px;
        width: 280px;
        padding: 5px 15px;
        outline: none;
        font-size: 18px;
        color: #01aefb;
        background: rgba(0,0,0,0);
        border-bottom: 1px solid #ffffff;
      }
      .name-p{
        margin: 15px 0;
        text-align: center;
        .btn{
          display: inline-block;
          padding: 5px 15px;
          cursor: pointer;
          border: 1px solid #ffffff;
          border-radius: 8px;
          font-size: 18px;
          color: #ffffff;
        }
      }
      .btn-a{
        float: right;
        margin-top: 15px;
        text-align: right;
        cursor: pointer;
        text-decoration: underline;
        color: #ffffff;
      }
    }
    .warning-p{
      width: 300px;
      margin: 0 auto;
      color: orangered;
    }
  }
</style>
