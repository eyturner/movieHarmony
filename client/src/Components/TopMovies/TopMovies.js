import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import Movie from '../Movies/Movie/Movie'
import { SocketContext } from '../../Contexts/Socket'

const TopMovies = () => {
  const socket = useContext(SocketContext)
  const [topMovies, setTopMovies] = useState([])

  const useStyles = makeStyles({
    topMoviesDiv: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap'
    },
  })
  const classes = useStyles()

  useEffect(() => {
    socket.on('new_top_movies', (newTopMovies) => {
      setTopMovies(newTopMovies.filter(movie => movie.score > 0))
    })

  }, [topMovies, socket])

  return (
    <>
      <h1>TOP MOVIES</h1>
      <div className={classes.topMoviesDiv}>
        {
          topMovies.map(movie => (
            <Movie movie={movie} imageSize='Small' swipeable={false} key={movie.title} />
          ))
        }
      </div>
    </>
  )
}

export default TopMovies
