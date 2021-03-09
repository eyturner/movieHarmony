import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import Genre from './Genre'
import { genreDict } from '../dictionaries'


const useStyles = makeStyles({
  genreContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
})

const Genres = ({ addGenre }) => {
  const classes = useStyles()

  return (
    Object.keys(genreDict).map((genre) =>
      <div className={classes.genreContainer} key={genre}>
        <Genre genre={genre} addGenre={addGenre} />
      </div>
    )
  )
}

export default Genres

