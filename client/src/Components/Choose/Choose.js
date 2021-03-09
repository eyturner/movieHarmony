import React, { useState, useEffect, useContext } from 'react'
import queryString from 'query-string'

import Movies from '../Movies/Movies'
import TopMovies from '../TopMovies/TopMovies'

import { SocketContext } from '../../Contexts/Socket'

const Choose = ({ location }) => {
  const [movies, setMovies] = useState([])
  const socket = useContext(SocketContext)

  useEffect(() => {
    const { name, room } = queryString.parse(location.search)

    socket.emit('join', { name, room }, () => console.log(`${name} has joined ${room}`))
    socket.emit('send_movie_data')

    return () => {
      socket.emit('disconnect')
      console.log("SOCKET IS TURNING OFF")
      socket.off()
    }

  }, [location.search, socket])

  socket.on('movie_data', (data) => {
    setMovies(data.results)
  })

  return (
    <>
      <Movies movies={movies} />
      <TopMovies />
    </>
  )
}

export default Choose