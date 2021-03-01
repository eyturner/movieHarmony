require('dotenv').config()
const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const router = require('./router.js')
const cors = require('cors')
const axios = require('axios').default

const { addUser, removeUser, getUser } = require('./users.js')
const { addRoom, getRoomGenres, roomHasData, getRoomData, addRoomData, addMovie, updateTopMovies } = require('./room.js')
const { createGenreString } = require('./helpers')

const PORT = 5000 || process.env.PORT
const TMDB_BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=`

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

  socket.on('create_room', (genres, room, callback) => {
    addRoom(room, genres)
    callback()
  })

  socket.on('send_movie_data', async () => {
    const user = getUser(socket.id)
    if (roomHasData(user.room)) {
      socket.emit('movie_data', getRoomData(user.room))
    } else {
      const res = await axios.get(TMDB_BASE_URL + createGenreString(getRoomGenres(user)))
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