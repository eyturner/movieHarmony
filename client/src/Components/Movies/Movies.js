import React, { useContext } from 'react'
import TinderCard from 'react-tinder-card'
import { makeStyles } from '@material-ui/core/styles';

import handleSwipe from './SwipeHelper'
import { SocketContext } from '../../Contexts/Socket'

import Movie from './Movie/Movie'

const useStyles = makeStyles({
  root: {
    position: 'relative',
    height: '700px',
    overflow: 'hidden'
  },
})

const Movies = ({ movies }) => {
  const socket = useContext(SocketContext)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {
        movies.map(movie => (
          <div key={movie.title}>
            <TinderCard onSwipe={(direction) => handleSwipe(direction, movie, socket)}>
              <Movie movie={movie} />
            </TinderCard>
          </div>
        ))
      }
    </div>
  )
}

export default Movies