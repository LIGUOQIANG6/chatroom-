//! 此文件是用于打造一个服务端
const net = require('net') // Node.js内置模块
const server = net.createServer()
const PORT = 5000
const HOST_NAME = 'localhost'

let count = 9999
const clients = [] // 100个满了
server.on('connection',socket => {
  // socket 就是客户端
  // 触发条件： 只要有客户端连接就会触发
  socket.name = ++count
  clients[socket.name] = socket 
  if ( clients.length === 100 ) {
    console.log('满了')
  }

  // 接收客户端发来的信息
  socket.on('data',msg => {
    // msg就是客户端发来的信息  Buffer
    console.log( socket.name +'say: '+ msg.toString().replace('谁',socket.name) )
    broadcast(socket,msg)
  })

  socket.on('error', error => {
    console.log( error )
  })

  socket.on('close',() => {
    console.log(socket.name + '下线了')
    delete( clients[socket.name ])
  })
 
})

// 创建一个广播，用于将客户端发来的信息给广播出来

function broadcast (socket,msg) {
  socket.write( `${socket.name}说: ${ msg }` )
}

server.listen(PORT,HOST_NAME,() => {
  console.log(`The server is running at: http://${ HOST_NAME }:${ PORT }`)
})