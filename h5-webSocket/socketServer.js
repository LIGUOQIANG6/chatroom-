//! 服务器
const ws = require('ws')
const host = '10.31.160.59'
const port = 9000
const server = new ws.Server({
  host,
  port
})

let count = 10000
const clients = []
// 获取客户端进行编号，然后存储它，广播它的数据
server.on('connection',client => {
  client.name = ++count 
  clients[client.name] = client
  // 获取数据
  client.on('message', msg => {
    msg.name = client.name 
    console.log( msg.toString() )
    boradcast(client,msg)
  })
  // 错误处理
})

function boradcast (client,msg) {
  for(let key in clients ){
    clients[ key ].send(msg.toString())
  }
}


server.on('listening',() => {
  console.log(`The server is running at: ws://${host}:${port}`)
})

