const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://10.0.2.2:3000/",
  },
});

const PORT = 4000;

const users = []

app.get('/', (req, res) => {
  res.send("Hi")
})

const addUser = (userName, roomId) => {
  users.push({
    userName: userName,
    roomId: roomId
  })
}

const userLeave = (userName) => {
  users = users.filter(user => user.userName != userName)
}

const getRoomUsers = (roomId) => {
  return users.filter(user => (user.roomId == roomId))
}

io.on('connection', socket => {
  console.log('Connected')
  socket.on('join-room', ({roomId, userName}) => {
    console.log('User joined room');
    socket.join(roomId)
    addUser(userName, roomId)
    socket.to(roomId).emit('user-connected', userName)

    io.to(roomId).emit('all-users', getRoomUsers(roomId))

    socket.on('disconnect', () => {
      console.log('disconnected');
      socket.leave(roomId);
      userLeave(userName)
      io.to(roomId).emit('all-users', getRoomUsers(roomId))
    })
  })
})

http.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`)
})