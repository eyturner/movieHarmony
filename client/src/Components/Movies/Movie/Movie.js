import React from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const imgBase = 'https://image.tmdb.org/t/p/original'
const getImgURL = (path) => imgBase + path

const imageSizes = {
  'Large': '500px',
  'Medium': '250px',
  'Small': '100px'
}


const Movie = ({ movie, imageSize }) => {
  const size = imageSize || 'Large'
  const useStyles = makeStyles({
    movieContainer: {
      background: '#FFF',

      // If size is large, then person is swiping. So position needs to be absolute
      position: size === 'Large' ? 'absolute' : ''
    },
    movieImage: {
      width: imageSizes[size],
      border: movie.groupApproved ? '5px solid gold' : ''
    },
  })
  const classes = useStyles()
  return (
    <>
      <Box className={classes.movieContainer}>
        <img className={classes.movieImage} src={getImgURL(movie.poster_path)} alt="movie poster"></img>
      </Box>
      {imageSize === 'Large' ? (
        <p>{movie.overview}</p>
      ) : ''}
    </>
  )
}

export default Movie