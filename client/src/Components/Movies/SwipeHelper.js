const handleSwipeDown = (socket, movie) => {
  movie.groupApproved = false
  const SCORE = -99999999 //essentially making it not possible to be top
  socket.emit('add_movie', movie, SCORE)
}

const handleSwipeRight = (socket, movie) => {
  movie.groupApproved = true
  const SCORE = 2 //right swipe score
  socket.emit('add_movie', movie, SCORE)
}

const handleSwipeUp = (socket, movie) => {
  movie.groupApproved = true
  const SCORE = 1 //up swipe score
  socket.emit('add_movie', movie, SCORE)
}

const handleSwipeLeft = (socket, movie) => {
  movie.groupApproved = false
  const SCORE = -1 //left swipe score
  socket.emit('add_movie', movie, SCORE)
}

const handleSwipe = (direction, movie, socket) => {
  console.log('You swiped: ' + direction)
  switch (direction) {
    case 'left':
      handleSwipeLeft(socket, movie)
      break
    case 'right':
      handleSwipeRight(socket, movie)
      break
    case 'up':
      handleSwipeUp(socket, movie)
      break
    case 'down':
      handleSwipeDown(socket, movie)
      break
    default:
      console.error('errant swipe direction detected')

  }
}

export default handleSwipe