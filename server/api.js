const db = require('./db')

module.exports = function (app) {
  app.all("*", function(req, res, next) {
    next();
  });
  // api login
  app.get('/api/user/login', function (req, res) {
    // 对发来的登录数据进行验证
    if (!req.query.account) {
      res.json({code: 600, msg:'account 不能为空！'})
      return
    }
    if (!req.query.pass) {
      res.json({code: 600, msg:'pass 不能为空！'})
      return
    }
    db.accountModel.findOne({account: req.query.account}, function(err, doc){
      if (err) {
        console.log('查询出错：' + err);
        res.json({code: 700, msg:'查询出错：' + err})
        return
      } else {
        if (!doc) {
          res.json({code: 700, msg:'不存在该用户名：' + req.query.account})
          return
        } else {
          if (req.query.pass != doc.pass) {
            res.json({code: 700, msg:'密码不正确！'})
            return
          } else {
            res.json({code: 200, msg:'密码正确，登录成功', account: doc.nickName})
            return
          }
        }

      }
    })
  })
  // api register
  app.get('/api/user/register', function (req, res) {
    // 对发来的注册数据进行验证
    let account = req.query.account
    let nickName = req.query.nickName
    let pass = req.query.pass
    let regTime = req.query.regTime
    if (!account) {
      res.json({code: 600, msg:'account 不能为空！'})
      return
    }
    if (!nickName) {
      res.json({code: 600, msg:'nickName 不能为空！'})
      return
    }
    if (!pass) {
      res.json({code: 600, msg:'pass 不能为空！'})
      return
    }
    // 查询数据库验证注册账号、密码
    // 是否存在账号
    db.accountModel.findOne({account: req.query.account}, function(err, doc){
      if (err) {
        console.log('查询出错：' + err);
        res.json({code: 700, msg:'查询出错：' + err})
        return
      } else {
        if (doc) {
          res.json({code: 700, msg:'该用户名名已经被注册：' + account})
          return
        } else {
          db.accountModel.create({
            account: account,
            nickName: nickName,
            pass: pass,
            regTime: regTime,
          }, function (err, doc) {
            if (err) {
              res.end('注册失败:' + err)
            } else {
              res.json({code: 200, msg:'用户注册成功：' + account})
              return
            }
          })
        }

      }
    })
    // 返回注册状态
    // res.send(JSON.stringify({code: 200, data: {account: 'guojcres', pass: 111111}}))
  })
  //getAccountGroup
  app.get('/api/user/getAccountGroup', function (req, res) {
    // 对发来的注册数据进行验证
    let account = parseInt(req.query.account)
    if (!account) {
      res.json({code: 600, msg:'account 不能为空！'})
      return
    }
    let accountGroups = {}
    // 查询数据库,账号所在群组
    db.relationModel.find(
      // {groupNumber: {$in: [222222]}},
      {groupNumber: {$in: [account]}},
      {groupAccount:1, groupNickName:1, _id:0},
      function(err, doc){
        if (err) {
          console.log('relationModel find error!')
          res.json({code: 700, msg:'查询出错：' + err})
          return
        } else {
          if (!doc) {
            accountGroups = [];
            res.json({code: 200, msg:'success', accountGroups: accountGroups})
            return
          } else {
            accountGroups = doc;
            console.log(doc)
            res.json({code: 200, msg:'success', accountGroups: accountGroups})
            return
          }
        }
      })
  })
  //getAccountGroup
  app.get('/api/user/getGroupNumber', function (req, res) {
    // 对发来的注册数据进行验证
    let groupAccount = parseInt(req.query.groupAccount)
    if (!groupAccount) {
      res.json({code: 600, msg:'groupAccount 不能为空！'})
      return
    }
    // 查询数据库,账号所在群组
    db.relationModel.findOne(
      {groupAccount: groupAccount},
      {groupNumber:1, _id:0},
      function(err, doc){
        if (err) {
          console.log('relationModel find error!')
          res.json({code: 700, msg:'查询出错：' + err})
          return
        } else {
          if (!doc) {
            res.json({code: 200, msg:'success', groupNumber: []})
            return
          } else {
            console.log(doc)
            res.json({code: 200, msg:'success', groupNumber: doc.groupNumber})
            // 找出了account，还得找昵称啊
            return
          }
        }
      })
  })
  // api index
  app.get('/api/goods/index', function (req, res) {
    let temai = [],
      rexiao = [],
      jingpin = [];
    // temai
    const getTemai = new Promise((resolve,reject) => {
      db.goodsModel.find(
        {brand_status: "temai"},
        {brand_id:1, brand_name:1, brand_price:1, brand_pic:1, brand_status:1, _id:0},
        {limit: 3},
        function(err, doc){
          if (err) {
            console.log('temai find error!')
            reject('reject temai')
          } else {
            if (!doc) {
              temai = [];
            } else {
              temai = doc;
            }
            resolve(temai)
          }
        })
    })
    // rexiao
    const getRexiao = new Promise((resolve,reject) => {
      db.goodsModel.find(
        {brand_status: "rexiao"},
        {brand_id:1, brand_name:1, brand_desc:1, brand_pic:1, brand_status:1, _id:0},
        {limit: 3},
        function(err, doc){
          if (err) {
            console.log('rexiao find error!');
            reject('reject rexiao')
          } else {
            if (!doc) {
              rexiao = [];
            } else {
              rexiao = doc;
            }
            resolve(rexiao)
          }
        })
    })
    // jingpin
    const getJingpin = new Promise((resolve,reject) => {
      db.goodsModel.find(
        {brand_status: "jingpin"},
        {brand_id:1, brand_name:1, brand_price:1, brand_pic:1, brand_status:1, _id:0},
        {limit: 4},
        function(err, doc){
          if (err) {
            console.log('jingpin find error!')
            reject('reject jingpin')
          } else {
            if (!doc) {
              jingpin = []
            } else {
              jingpin = doc
            }
            resolve(jingpin)
          }
        })
    })

    const p_all = Promise.all([getTemai, getRexiao, getJingpin])

    p_all.then( (suc) => {
      let data = {
        "temai": suc[0],
        "rexiao": suc[1],
        "jingpin": suc[2]
      }
      res.json({code: 200, msg:'', data: data})
      return
    }).catch( (err) => {
      console.log('err all:' + err)
      res.json({code: 600, msg:'查询出错', data: data})
      return
    })
  })

  app.get('*', function(req, res){
    res.end('404')
  })
}