const express = require('express')
const mongoose = require('mongoose')

// 链接mongo   并且使用imooc集合
const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
  console.log('链接成功')
})

const User = mongoose.model('user',new mongoose.Schema({
  user:{type:String,require:true},
  age:{type:Number,require:true}
}))
// 新增数据
// User.create({
//   user:'imooc',
//   age:18,
// },function(err,doc){
//   if(!err){
//     console.log(doc)
//   }
// })

// 更新数据
// User.update({_id:'5c9c39ce0379140fc4dd76bb'},{'$set':{age:23}},function(err,doc){
//   if(!err){
//     console.log(doc)
//   }
// })

// 删除数据
// User.remove({age:18},function(err,doc){
//   if(!err){
//     console.log(doc)
//   }
// })
// 新建app
const app = express()

app.get('/',function(req,res){
  res.send('<h1>(*´▽｀)ノノ你好</h1>')
})
app.get('/data',function(req,res){
  // 查询数据
  User.find({age:23},function(err,doc){
    res.json(doc)
  })
})

app.listen(9093,function(){
  console.log('端口9093')
})