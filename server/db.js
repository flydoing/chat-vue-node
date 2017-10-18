const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 用户信息的数据结构模型
const accountSchema = new Schema({
  account: {type: Number},
  nickName: {type: String},
  pass: {type: Number},
  regTime: {type: Number}
})
// 聊天群的数据结构模型：聊天群包含的成员
const relationSchema = new Schema({
  groupAccount: Number,
  groupNickName: String,
  groupNumber: []
})
// 单个聊天群的聊天消息记录
const groupSchema = new Schema({
  account: Number,
  nickName: String,
  chatTime: Number,
  chatMes: String,
  chatToGroup: Number,
  chatType: String
})

mongoose.Promise = global.Promise

// var database = mongoose.connect('mongodb://127.0.0.1:27017/chat-vue-node', {
//   useMongoClient: true
//   /* other options */
// });
// database.then(function() {
//   database.connection.on('error', function(error){
//     console.log('数据库test_nodeVue连接失败：' + error)
//     return
//   })
//   database.connection.once('open', function(){
//     console.log('数据库test_nodeVue连接成功')
//     // 初始化数据库
//     initData();
//   })
// }).catch(function(err) {
//   console.log("Promise Rejected");
//   console.log(err);
// })

const database = mongoose.connect('mongodb://127.0.0.1:27017/chat-vue-node')
database.connection.on('error', function(error){
  console.log('数据库test_nodeVue连接失败：' + error)
  return
})
database.connection.once('open', function(){
  console.log('数据库test_nodeVue连接成功')
  // 初始化数据库
  initData();
})

const db = {
  accountModel: database.model('accountModel', accountSchema),
  relationModel: database.model('relationModel', relationSchema),
  group1Model: database.model('group1Model', groupSchema),
  group2Model: database.model('group2Model', groupSchema)
}

const initAccount = [
  {
    'account': 111111,
    'nickName': '秦始皇',
    'pass': 111111,
    'regTime': 1504509461000
  },
  {
    'account': 222222,
    'nickName': '汉武帝',
    'pass': 111111,
    'regTime': 1504509462000
  },
  {
    'account': 333333,
    'nickName': '李世民',
    'pass': 111111,
    'regTime': 1504509463000
  },
  {
    'account': 444444,
    'nickName': '朱元璋',
    'pass': 111111,
    'regTime': 1504509464000
  }
]

const initRelation = [
  {
    'groupAccount': 101,
    'groupNickName': '同事群',
    'groupNumber': [111111, 222222, 333333]
  },
  {
    'groupAccount': 102,
    'groupNickName': '同学群',
    'groupNumber': [333333, 444444]
  },
]

const initGroup1 = [
  {
    'account': 111111,
    'nickName': '秦始皇',
    'chatTime': 1504509461000,
    'chatMes': '哈哈哈哈哈哈',
    'chatToGroup': 101,
    'chatType': 'chat'
  },
  {
    'account': 222222,
    'nickName': '汉武帝',
    'chatTime': 1504509461000,
    'chatMes': '哈哈哈哈哈哈',
    'chatToGroup': 101,
    'chatType': 'chat'
  },
  {
    'account': 333333,
    'nickName': '李世民',
    'chatTime': 1504509461000,
    'chatMes': '加入',
    'chatToGroup': 101,
    'chatType': 'tips'
  }
]

const initGroup2 = [
  {
    'account': 333333,
    'nickName': '李世民',
    'chatTime': 1504509461000,
    'chatMes': '加入',
    'chatToGroup': 102,
    'chatType': 'chat'
  },
  {
    'account': 444444,
    'nickName': '朱元璋',
    'chatTime': 1504509461000,
    'chatMes': '嘻嘻嘻嘻',
    'chatToGroup': 102,
    'chatType': 'chat'
  }
]

const initData = function () {
  // 初始化1
  db.accountModel.find({}, function(err, doc){
    if (err) {
      console.log('initAccount出错：' + err);
    } else if (!doc.length) {
      console.log('db accountModel open first time');
      // 初始化数据，遍历插入；先打印出来看看
      initAccount.map(iterm => {
        db.accountModel.create(iterm)
      })
    } else {
      console.log('db open not first time');
    }
  })
  // 初始化2
  db.relationModel.find({}, function(err, doc){
    if (err) {
      console.log('initData出错：' + err);
    } else if (!doc.length) {
      console.log('db relationModel open first time');
      // 初始化数据，遍历插入；先打印出来看看
      initRelation.map(iterm => {
        db.relationModel.create(iterm)
      })
    } else {
      console.log('db open not first time');
    }
  })
  // 初始化3
  db.group1Model.find({}, function(err, doc){
    if (err) {
      console.log('initData出错：' + err);
    } else if (!doc.length) {
      console.log('db group1Model open first time');
      // 初始化数据，遍历插入；先打印出来看看
      initGroup1.map(iterm => {
        db.group1Model.create(iterm)
      })
    } else {
      console.log('db open not first time');
    }
  })
  // 初始化4
  db.group2Model.find({}, function(err, doc){
    if (err) {
      console.log('initData出错：' + err);
    } else if (!doc.length) {
      console.log('db group2Model open first time');
      // 初始化数据，遍历插入；先打印出来看看
      initGroup2.map(iterm => {
        db.group2Model.create(iterm)
      })
    } else {
      console.log('db open not first time');
    }
  })
}

module.exports = db