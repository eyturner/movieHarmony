import React from 'react'
import { TextField } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const Name = ({ changeName }) => {
  const useStyles = makeStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap:'wrap'
    },
  })

  const classes = useStyles()

  return (
    <div className={classes.container}>
      <TextField id="name" label="Name" onChange={(e) => changeName(e.target.value)} />
    </div>
  )
}

export default Name