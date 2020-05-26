//! 此文件是用于打造客户端的
const net = require('net')
const rl = require('readline')
const socket = new net.Socket()
const PORT = 5000
const HOST_NAME = 'localhost'
// 客户端连接服务器

// 提供一个接口来读取可读流
const r = rl.createInterface({
  input: process.stdin,
  output: process.stdout
})

socket.connect(PORT,HOST_NAME,() => {
  socket.write('欢迎谁来到直播间')
})

socket.on('data', msg => {
  console.log( msg.toString() )
  say()
})

socket.on('error',error => {
  console.log(error)
})

socket.on('close',() => {
  console.log('正常下线')
  socket.destroy()
  r.close()
})

function say () {
  r.question('请输入: ', message => {
    if ( message == '88' ) {
      // 聊完了
      socket.destroy()
      r.close()
    } else {
      // 还在继续聊
      socket.write( message + '\n' )
    }
  })
}

