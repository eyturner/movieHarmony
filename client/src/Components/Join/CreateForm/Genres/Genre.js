import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { genreDict } from '../dictionaries'

const SIDE_LENGTH = '100px'

const Genre = ({ genre, addGenre }) => {
  const [checked, setChecked] = useState(false)
  const useStyles = makeStyles({
    container: {
      width: SIDE_LENGTH,
      height: SIDE_LENGTH,
      backgroundColor: checked ? 'black' : '',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap:'wrap'
    },
  })

  const classes = useStyles()

  const handleClick = () => {
    setChecked(!checked)
    addGenre(genreDict[genre].id)
  }


  return (
    <div className={classes.container} onClick={handleClick}>
      <h3>{genre}</h3>
    </div>
  )
}

export default Genre