const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const _filter = {'pwd':0,'__v':0}  //内部使用
// Chat.remove({},function(e,d){

// })

Router.get('/list',function(req,res){
  const {type} = req.query
  //删除
  // User.remove({},function(e,d){

  // })
  // 查询
  User.find({type},function(err,doc){
    return res.json({code:0,data:doc})
  })
})

Router.get('/getmsglist',function(req,res){
  const user_id = req.cookies.user_id
  User.find({},function(e,userdoc){
    let users = {}
    userdoc.forEach(v=>{
      users[v._id] = {name:v.user,avatar:v.avatar}
    })
    Chat.find({'$or':[{from:user_id},{to:user_id}]},function(err,doc){
      if(!err){
        return res.json({code:0,msgs:doc,users:users})
      }
    })
  })
  // '$or':[{from:user_id,to:user_id}]
})

Router.post('/update',function(req,res){
  const user_id = req.cookies.user_id
  if(!user_id){
    return json.dumps({code:1})
  }
  const body = req.body
  User.findByIdAndUpdate(user_id,body,function(err,doc){
    const data = Object.assign({},{
      user:doc.user,
      type:doc.type
    },body)
    return res.json({code:0,data})
  })
})

Router.post('/login',function(req,res){
  const {user,pwd} = req.body
  User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
    if(!doc){
      return res.json({code:1,msg:'用户名或者密码错误'})
    }
    res.cookie('user_id',doc._id)
    return res.json({code:0,data:doc})
  })
})

Router.post('/register',function(req,res){
  const {user,pwd,type} = req.body
  User.findOne({user:user},function(err,doc){
    if(doc){
      return res.json({code:1,msg:'用户名重复'})
    }

    const userModel = new User({user,type,pwd:md5Pwd(pwd)})
    userModel.save(function(e,d){
      if(e){
        return res.json({code:1,msg:'后端出错了'})
      }
      const {user,type,_id} = d
      res.cookie('user_id',_id)
      return res.json({code:0,data:{user,type,_id}})
    })
    // User.create(function(e,d){
    //   if(e){
    //     return res.json({code:1,msg:'后端出错了'})
    //   }
    //   return res.json({code:0})
    // })
  })
})
Router.get('/info',function(req,res){
  const {user_id} = req.cookies
  if(!user_id){
    return res.json({code:1})
  }
  User.findOne({_id:user_id},_filter,function(err,doc){
    if(err){
      return res.json({code:1,msg:'后端出错了'})
    }
    if(doc){
      return res.json({code:0,data:doc})
    }
  })
})

function md5Pwd(pwd){
  const salt = 'imooc_2019_!@#$%'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router