const express = require('express')
const utils = require('utility')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')
const model = require('./model')
const Chat = model.getModel('chat')

const app = express()
//work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection',function(socket){
  socket.on('sendmsg',function(data){
    // console.log(data)
    // io.emit('revicemsg',data)
    const {from,to,msg} = data
    const chatid = [from,to].sort().join('_')
    Chat.create({chatid,from,to,content:msg},function(err,doc){
      io.emit('recvmsg',Object.assign({},doc._doc))
    })
  })
})


app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)
// // 新建app
// app.get('/',function(req,res){
//   res.send('<h1>(*´▽｀)ノノ你好</h1>')
// })

server.listen(9093,function(){
  console.log('端口9093')
})