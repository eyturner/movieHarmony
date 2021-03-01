import React, { useState } from 'react'
import { Button, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import JoinForm from './JoinForm/JoinForm'
import CreateForm from './CreateForm/CreateForm'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'space-evenly',
    margin: '25px 0'
  },
});

const Join = () => {
  const [creatingRoom, setCreatingRoom] = useState(false)
  const [joiningRoom, setJoiningRoom] = useState(false)
  const classes = useStyles()

  const handleCreateRoom = () => {
    setCreatingRoom(true)
  }

  const handleJoinRoom = () => {
    setJoiningRoom(true)
  }

  return (
    <Container maxWidth="md">
      {(!creatingRoom && !joiningRoom) &&
        <div className={classes.root}>
          <Button variant="contained" color="primary" onClick={handleCreateRoom}>
            Create a Room
          </Button>
          <Button variant="contained" color="primary" onClick={handleJoinRoom}>
            Join a Room
          </Button>
        </div>
      }
      {creatingRoom &&
        <div>
          <CreateForm />
        </div>
      }

      {joiningRoom &&
        <div>
          <JoinForm />
        </div>
      }
    </Container>
  )
}

export default Join
