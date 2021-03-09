const { deepEqual } = require('./helpers')

// rooms is an object that contains an array of room objects. 
const rooms = {}
const MAX_LENGTH = 5 //max length of topMovies for each room

const addRoom = (roomName, roomData) => {
  rooms[roomName] = {
    ...roomData,
    possMovies: [],
    topMovies: [],
  }
}

const showTopMovies = (topMovies) => {
  topMovies.forEach(movie => {
    console.log(movie.title)
  })
}

const reverseSortMovies = (movie1, movie2) => movie2.score - movie1.score

const getRoomGenres = (user) => rooms[user.room].genres

const getRoomYears = (user) => rooms[user.room].yearRange

const getRoomLanguage = (user) => rooms[user.room].language

const getRoomSearchData = (user) => {
  console.log("ROOM:", rooms[user.room])
  return {
    "genres": getRoomGenres(user),
    "years": getRoomYears(user),
    "language": getRoomLanguage(user)
  }
}

const getRoom = (roomName) => rooms[roomName]

const roomHasData = (roomName) => rooms[roomName].data !== undefined

const getRoomData = (roomName) => rooms[roomName].data

const addRoomData = (roomName, data) => rooms[roomName].data = data

const roomHasMovie = (room, movie) => room.possMovies.find(possMovie => possMovie.title === movie.title)

const movieInTops = (topMovies, movie) => topMovies.find(topMovie => topMovie.title === movie.title)

//only called if we know the movie has been voted on by another user
const updateMovie = (movie, newScore, groupApproved) => {
  movie.score += newScore
  movie.votes++
  movie.groupApproved = groupApproved
  // console.log(`MOVIE: ${movie.title} group approved? ${groupApproved}`)
}
//Returns new topMovies if they have been changed
const updateTopMovies = (roomName) => {
  const possMovies = rooms[roomName].possMovies
  const topMovies = rooms[roomName].topMovies

  let newTopMovies = [...topMovies]

  if (topMovies.length < MAX_LENGTH) {
    newTopMovies = possMovies
    newTopMovies.sort((a, b) => reverseSortMovies(a, b))
    rooms[roomName].topMovies = newTopMovies
    return newTopMovies
  } else {
    possMovies.forEach(movie => {
      if (movie.score > newTopMovies[MAX_LENGTH - 1].score && !movieInTops(topMovies, movie)) {
        // console.log("ADDING A NEW MOVIE TO THE TOP:", movie);
        newTopMovies.splice(-1, 1, movie)//replace lowest score movie with new one
      }
    })
  }

  //check if newTopMovies is different than topMovies and return if true
  if (!deepEqual(topMovies, newTopMovies)) {
    newTopMovies.sort((a, b) => reverseSortMovies(a, b)) //sorting newTopMovies
    rooms[roomName].topMovies = [...newTopMovies]
    return newTopMovies
  }
  //if no new topMovies :(
  return null
}

const addMovie = (newMovie, score, roomName, groupApproved) => {
  let room = getRoom(roomName)
  let roomMovie = roomHasMovie(room, newMovie)

  if (roomMovie) {
    updateMovie(roomMovie, score, groupApproved)
  } else {
    room.possMovies = room.possMovies.concat({ ...newMovie, score, votes: 1 })
  }
}

module.exports = { addRoom, roomHasData, getRoomData, addRoomData, addMovie, updateTopMovies, getRoomSearchData }