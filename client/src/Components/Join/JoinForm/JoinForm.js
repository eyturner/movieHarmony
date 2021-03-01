import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    border: '1px solid red',
  },
});

const JoinForm = () => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')

  return (
    <div className={classes.JoinFormContainer}>
      <TextField id="name" label="Name" onChange={(e) => setName(e.target.value)}/>
      <TextField id="room" label="Room" onChange={(e) => setRoom(e.target.value)}/>
      <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/harmony?name=${name}&room=${room}`}>
        <Button>Join</Button>
      </Link>
    </div>
  )
}

export default JoinForm