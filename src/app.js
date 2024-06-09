const express = require('express')
const { createServer } = require('node:http')
const { join } = require('node:path')
const { Server } = require('socket.io')
const fs = require('fs')

const app = express()
const server = createServer(app)
const io = new Server(server)

const path = 'src/test.log'
let log = ''

// Tail = require('tail').Tail

// tail = new Tail('src/test.log')

// tail.on('line', function (data) {
//   log = data
//   console.log(data)
// })

// tail.on('error', function (error) {
//   console.log('ERROR: ', error)
// })

setInterval(() => {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      log = data
      console.log(data)
    }
  })
}, 100)

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'))
})

// io.on('connection', (socket) => {
  //   socket.on('log-update', (msg) => {
  io.emit('log-update', log)
  //   })
// })

server.listen(3000, () => {
  console.log('server running at http://localhost:3000')
})
