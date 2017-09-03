<template>
  <div class="c-login">
    <div class="login-name">
      <div class="name" v-if="showLogin">
        <h3 class="name-tip">login</h3>
        <input class="name-input" type="text" maxlength="10" placeholder="name" v-model="registerName" @keyup.enter="addUserName" />
        <input class="name-input" type="text" maxlength="10" placeholder="password" v-model="registerName" @keyup.enter="addUserName" />
        <a class="btn-a" @click="changeShow" herf="javascript:;">register -></a>
      </div>
      <div class="name" v-if="!showLogin">
        <h3 class="name-tip">register</h3>
        <input class="name-input" type="text" maxlength="10" placeholder="name" v-model="registerName" @keyup.enter="addUserName" />
        <input class="name-input" type="text" maxlength="10" placeholder="password" v-model="registerName" @keyup.enter="addUserName" />
        <a class="btn-a" @click="changeShow" herf="javascript:;">login -></a>
      </div>
    </div>
  </div>
</template>

<script>
  import './../../public/css/base.scss'
  export default {
    data () {
      return {
        showLogin: true,
        registerName: '',
        registerTime: null,
        date: new Date()
      }
    },
    methods: {
      changeShow () {
        this.showLogin = !this.showLogin
        console.log(this.showLogin)
      },
      addUserName () {
        this.registerName = this.registerName.replace(/\s+/g, '')
        if (this.registerName.length > 0) {
          console.log(this.registerName)
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
      width:320px;
      margin: 50px auto 0;
      text-align: center;
      .name-tip{
        font-size: 18px;
        color: #ffffff;
      }
      .name-input{
        height:24px;
        width: 290px;
        padding: 5px 15px;
        outline: none;
        font-size: 18px;
        color: #01aefb;
        background: rgba(0,0,0,0);
        border-bottom: 1px solid #ffffff;
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
  }
</style>
