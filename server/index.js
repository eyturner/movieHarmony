require('dotenv').config()
const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const router = require('./router.js')
const cors = require('cors')
const axios = require('axios').default

const { addUser, removeUser, getUser } = require('./users.js')
const { addRoom, roomHasData, getRoomData, addRoomData, addMovie, updateTopMovies, getRoomSearchData } = require('./room.js')
const { createSearchString } = require('./helpers')

const PORT = 5000 || process.env.PORT
const TMDB_BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}`

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on('connection', (socket) => {

  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room })
    if (error) return callback(error)

    socket.join(user.room);

    callback();
  })

  socket.on('create_room', (roomData, room, callback) => {
    addRoom(room, roomData)
    callback()
  })

  socket.on('send_movie_data', async () => {
    const user = getUser(socket.id)
    console.log("USER:", user)
    if (roomHasData(user.room)) {
      socket.emit('movie_data', getRoomData(user.room))
    } else {
      const searchData = getRoomSearchData(user)
      console.log("WE'VE GOT SEARCH DATA:", searchData)
      console.log("SEARCH URL:", TMDB_BASE_URL + createSearchString(searchData.genres, searchData.years, searchData.language))
      const res = await axios.get(TMDB_BASE_URL + createSearchString(searchData.genres, searchData.years, searchData.language))
      addRoomData(user.room, res.data)
      socket.emit('movie_data', res.data)
    }
  })

  socket.on('add_movie', (movie, score) => {
    const user = getUser(socket.id)
    addMovie(movie, score, user.room, movie.groupApproved)
    const topMoviesUpdated = updateTopMovies(user.room)
    if (topMoviesUpdated) {
      io.in(user.room).emit("new_top_movies", (topMoviesUpdated))
    }
  })

})

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

app.use(router)