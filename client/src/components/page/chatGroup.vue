<template>
  <div class="c-chat">
    <div class="chat-top">
      <img class="top-head" src="http://img01.rastargame.com/p_upload/2017/0605/1496634201481713.png"/>
      <span class="top-name">超短群</span>
      <a class="top-group" href="javascript:;">群成员(28/50)</a>
    </div>
    <div class="chat-log">
      <li class="mes-li mes-li-left">
        <div class="li-head"><img src="http://img01.rastargame.com/p_upload/2017/0605/1496634201481713.png"/></div>
        <div class="li-box">
          <p class="box-name">郭锦财<span class="time">20170903</span> </p>
          <p class="box-mes">聊天测试看看</p>
        </div>
      </li>
      <li class="mes-li mes-li-right">
        <div class="li-head"><img src="http://img01.rastargame.com/p_upload/2017/0605/1496634201481713.png"/></div>
        <div class="li-box">
          <p class="box-name">郭锦财<span class="time">20170903</span> </p>
          <p class="box-mes">聊天测试看看</p>
        </div>
      </li>
      <li class="mes-li mes-li-center">
        <p class="li-text">退出/加入了</p>
      </li>
      <li class="mes-li mes-li-center">
        <p class="li-text">上线/下线了</p>
      </li>
      <p>chat-logtop</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-log</p>
      <p>chat-logend</p>
    </div>
    <div class="chat-edit">
      <textarea class="edit-text" placeholder="请输入..."></textarea>
      <div class="edit-btn">
        <a href="javascript:;" class="btn-a">发送</a>
        <a href="javascript:;" class="btn-a">发送</a>
      </div>
    </div>
    <div class="chat-group"></div>
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
    border-bottom: 1px solid #b8b8bb;
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
    border-top: 1px solid #b8b8bb;
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
