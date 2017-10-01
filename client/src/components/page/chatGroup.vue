<template>
  <div class="c-chat">
    <div class="chat-top">
      <img class="top-head" src="http://img01.rastargame.com/p_upload/2017/0605/1496634201481713.png"/>
      <span class="top-name">{{groupNickName}}</span>
      <a class="top-group" href="javascript:;" @click="changeShowGroup">群成员({{groupNumber.length}})</a>
      <div class="group" v-show="showGroup">
        <a class="group-one group-one-on" href="javascript:;" v-for="account in groupNumber">
          <img class="one-head" src="http://img01.rastargame.com/p_upload/2017/0605/1496634201481713.png"/>
          <!--<span class="one-status">[在线]</span>-->
          <span class="one-name">{{account.nickName}}</span>
        </a>
        <!--<a class="group-one group-one-on" href="javascript:;" v-for="n in 3">-->
          <!--<img class="one-head" src="http://img01.rastargame.com/p_upload/2017/0605/1496634201481713.png"/>-->
          <!--<span class="one-status">[在线]</span>-->
          <!--<span class="one-name">秦始皇</span>-->
        <!--</a>-->
        <!--<a class="group-one" href="javascript:;" v-for="n in 10">-->
          <!--<img class="one-head" src="http://img01.rastargame.com/p_upload/2017/0605/1496634201481713.png"/>-->
          <!--<span class="one-status">[离线]</span>-->
          <!--<span class="one-name">秦始皇秦始皇秦始皇秦始皇秦始皇</span>-->
        <!--</a>-->
      </div>
    </div>
    <div class="chat-log" @click="changeShowGroupFalse">
      <li class="mes-li" v-for="chat in chatLog" :class="chat.chatType === 'tips' ? 'mes-li-center' : (account === chat.account ? 'mes-li-right' : 'mes-li-left')">
        <div class="li-head" v-if="chat.chatType === 'chat'"><img src="http://img01.rastargame.com/p_upload/2017/0605/1496634201481713.png"/></div>
        <div class="li-box" v-if="chat.chatType === 'chat'">
          <p class="box-name">{{chat.nickName}} {{chat.account}}<span class="time">{{chat.chatTime}}</span> </p>
          <p class="box-mes">{{chat.chatMes}}</p>
        </div>
        <p class="li-text" v-if="chat.chatType === 'tips'">{{chat.account}} {{chat.chatMes}}</p>
      </li>
      <!--<li class="mes-li mes-li-left">-->
        <!--<div class="li-head"><img src="http://img01.rastargame.com/p_upload/2017/0605/1496634201481713.png"/></div>-->
        <!--<div class="li-box">-->
          <!--<p class="box-name">汉武帝<span class="time">20170903</span> </p>-->
          <!--<p class="box-mes">聊天测试看看</p>-->
        <!--</div>-->
      <!--</li>-->
      <!--<li class="mes-li mes-li-right">-->
        <!--<div class="li-head"><img src="http://img01.rastargame.com/p_upload/2017/0605/1496634201481713.png"/></div>-->
        <!--<div class="li-box">-->
          <!--<p class="box-name">康熙<span class="time">20170903</span> </p>-->
          <!--<p class="box-mes">聊天测试看看</p>-->
        <!--</div>-->
      <!--</li>-->
      <!--<li class="mes-li mes-li-center">-->
        <!--<p class="li-text">退出/加入了</p>-->
      <!--</li>-->
      <!--<li class="mes-li mes-li-center">-->
        <!--<p class="li-text">上线/下线了</p>-->
      <!--</li>-->
      <!--<li class="mes-li mes-li-right" v-for="n in 6">-->
        <!--<div class="li-head"><img src="http://img01.rastargame.com/p_upload/2017/0605/1496634201481713.png"/></div>-->
        <!--<div class="li-box">-->
          <!--<p class="box-name">康熙<span class="time">20170903</span> </p>-->
          <!--<p class="box-mes">聊天测试看看</p>-->
        <!--</div>-->
      <!--</li>-->
    </div>
    <div class="chat-edit" @click="changeShowGroupFalse">
      <textarea class="edit-text" placeholder="请输入..." ref="r_editText" v-model="editText" @keyup.13="sendEnTer"></textarea>
      <div class="edit-btn">
        <a href="javascript:;" class="btn-a" @click="sendEnTer">发送</a>
        <!--<a href="javascript:;" class="btn-a">退出</a>-->
      </div>
    </div>
  </div>
</template>

<script>
  import './../../public/css/base.scss'
  import io from 'socket.io-client'
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  Vue.use(VueRouter)
  const router = new VueRouter()
  export default {
    data () {
      return {
        showGroup: false,
        editText: '',
        account: '',
        socket: null,
        groupNickName: '',
        chatLog: [],
//        chatLog: [
//          {
//            account: 999999,
//            nickName: '秦始皇',
//            chatTime: Date.parse(new Date()),
//            chatMes: '哈哈哈哈哈哈哈',
//            chatToGroup: 401,
//            chatType: 'chat'
//          },
//          {
//            account: 777777,
//            nickName: '秦始皇',
//            chatTime: Date.parse(new Date()),
//            chatMes: 'on-line',
//            chatToGroup: 401,
//            chatType: 'tips'
//          },
//          {
//            account: 888888,
//            nickName: '汉武帝',
//            chatTime: Date.parse(new Date()),
//            chatMes: '嘻嘻嘻嘻寻寻惺惺惜惺惺',
//            chatToGroup: 401,
//            chatType: 'chat'
//          }
//        ],
        groupNumber: []
      }
    },
    created () {
      console.log(this.$route.query.groupAccount)
      this.groupNickName = this.$store.getters.getGroupState.groupNickName
      // 判断是否on-line
      // let CHATaccount = JSON.parse(window.localStorage.getItem('CHAT-account'))
      // 换成vuex
      let chatState = this.$store.getters.getChatState
      console.log('chatState: ' + chatState)
      if (chatState.account) {
        // 1.连接websocket
        this.socket = io.connect('http://localhost:8081')
        // 2.组织数据
        this.account = chatState.account
        let chat = {
          account: this.account,
          nickName: '',
          chatTime: Date.parse(new Date()),
          chatMes: 'on-line',
          chatToGroup: 401,
          chatType: 'tips'     // chat/tips
        }
        // 3.on-line在线
        this.socket.removeAllListeners()
        this.socket.emit('userJoining', chat)
        this.talk()
        this.getGroupNumber()
        this.getChatLog()
      } else {
        router.push({ path: 'login' })
      }
    },
    mounted () {
      this.$refs.r_editText.focus()

      let oldTime = 1504509461000
      let old = new Date(oldTime)
      // console.log('old: new Date(1504509461000): ' + old)
      // console.log('Date.parse(new Date(1504509461000)): ' + Date.parse(old))
      console.log(old.getHours())
      let test = Date.parse(new Date())   // Date.parse(datestring) 是一个静态函数，可以直接调用
      console.log(test)                   // 返回一个整数,表示日期距1970年1月1日午夜之间的毫秒数(时间戳)
    },
    methods: {
      changeShowGroup () {
        this.showGroup = !this.showGroup
      },
      changeShowGroupFalse () {
        this.showGroup = false
      },
      getChatLog () {
        let groupAccount = this.$store.getters.getGroupState.groupAccount
        this.$http({
          url: '/api/getChatLog',
          method: 'GET',
          params: {
            groupAccount: groupAccount
          }
        })
          .then((res) => {
            let data = res.data
            console.log(data)
            if (data.code === 200) {
              // 更新我加入的群
              this.chatLog = data.chatLog
            } else {
              // 提示获取失败
              console.log(data.msg)
            }
          })
      },
      sendEnTer () {
        this.editText = this.editText.replace(/\s+/g, '')
        if (this.editText.length > 0) {
          // 发送消息
          let chat = {
            account: this.$store.getters.getChatState.account,
            nickName: this.$store.getters.getChatState.nickName,
            chatTime: Date.parse(new Date()),
            chatMes: this.editText,
            chatToGroup: 401,
            chatType: 'chat'     // tips
          }
          console.log(chat)
          // 发送前更新本地chatLog
          this.chatLog.push(chat)
          // 发送
          this.socket.emit('emitChat', chat)
          // 发送成功之后
          this.editText = ''
          this.$refs.r_editText.focus()
        } else {
          this.editText = ''
          this.$refs.r_editText.focus()
        }
      },
      getGroupNumber () {
        let groupAccount = this.$route.query.groupAccount
        if (!groupAccount) {
          console.log('不存在$route.query.groupAccount，不请求')
          return
        }
        this.$http({
          url: '/api/user/getGroupNumber',
          method: 'GET',
          params: {
            groupAccount: groupAccount
          }
        })
          .then((res) => {
            let data = res.data
            console.log(data)
            if (data.code === 200) {
              // 更新我加入的群
              this.groupNumber = data.groupNumber
            } else {
              // 提示获取失败
              console.log(data.msg)
            }
          })
      },
      talk () {
        this.socket.removeAllListeners()
        let that = this
        this.socket.on('userJoined', function (data) {
          let chat = data
          that.chatLog.push(chat)
        })
        this.socket.on('userQuit', function (data) {
          let chat = data
          that.chatLog.push(chat)
        })
        this.socket.on('broadChat', function (data) {
          let chat = data
          that.chatLog.push(chat)
        })
      }
    }
  }
</script>

<style lang="scss" scope>
  .c-chat{
    position: relative;
    height: 100%;
    overflow: auto;
  }
  .chat-top{
    position: fixed;
    z-index: 19;
    top: 0;
    height: 40px;
    padding: 5px 0;
    line-height: 40px;
    width: 100%;
    max-width: 750px;
    border-bottom: 1px solid #d8d8d8;
    background: #ffffff;
    .top-head,.top-name,.top-group{
      float: left;
      height: 40px;
    }
    .top-head{
      margin-right: 15px;
      border-radius: 10px;
    }
    .top-group{
      float: right;
    }
    .group{
      position: absolute;
      top: 50px;
      right: 0;
      padding: 10px 0;
      max-height: 350px;
      overflow: auto;
      border: 1px solid #d8d8d8;
      /*background: rgba(0,0,0,0.6);*/
      background: #ffffff;
      .group-one{
        display: block;
        min-width: 200px;
        padding: 3px 10px;
        overflow: hidden;
        .one-head,.one-status,.one-name{
          float: left;
          height: 25px;
          line-height: 25px;
          font-size: 14px;
          color: #575758;
        }
        .one-head{
          width: 25px;
          height: 25px;
          margin-right: 5px;
          border-radius: 25px;
        }
        .one-status{
          margin: 0 5px;
        }
        .one-name{
          max-width: 110px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .group-one-on{
        .one-status,.one-name{
          color: #01aefb;
        }
      }
    }
  }
  .chat-log{
    padding: 40px 0 100px;
    padding: 55px 5px 105px;
    .mes-li{
      position: relative;
      overflow: hidden;
      margin-bottom:10px;
      .li-head{
        width:40px;
        height:40px;
        border-radius: 40px;
        img{
          width:40px;
          height:40px;
          border-radius: 40px;
        }
      }
      .li-box{
        max-width: 75%;
        overflow: hidden;
        .box-name{
          font-size: 14px;
          color: #01aefb;
          .time{
            display: inline-block;
            margin: 0 10px;
            color: #b8b8bb;
          }
        }
        .box-mes{
          display: inline-block;
          padding: 3px 10px;
          font-size:15px;
          color: #575758;
          background: #dbeef7;
          border-radius: 4px;
        }
      }
    }
    .mes-li-left{
      .li-head{
        float: left;
        margin-right:8px;
      }
      .li-box{
        .box-name{
          .time{
            margin-left: 10px;
          }
        }
      }
    }
    .mes-li-right{
      .li-head{
        float: right;
        margin-left:8px;
      }
      .li-box{
        float: right;
        .box-mes{
          float: right;
        }
        .box-name{
          text-align: right;
          .time{
            float: left;
            margin-right:10px;
          }
        }
      }
    }
    .mes-li-center{
      text-align: center;
      .li-text{
        display: inline-block;
        padding: 4px 10px;
        font-size: 13px;
        color: #b8b8bb;
        border-radius: 5px;
        background:#f3f4f5;
      }
    }
  }
  .chat-edit{
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 750px;
    height: 100px;
    border-top: 1px solid #d8d8d8;
    background: #ffffff;
    .edit-text{
      box-sizing: border-box;
      width:100%;
      padding:5px;
      height:60px;
      font-size:15px;
      border: none;
      resize: none;
      outline: none;
    }
    .edit-btn{
      width: 100%;
      overflow: hidden;
      .btn-a{
        float: right;
        margin: 0 5px;
        padding: 3px 15px;
        color: #ffffff;
        border-radius: 4px;
        background: #42c5ff;
        &:active{
          background: #168af3;
        }
      }
    }
  }

</style>
