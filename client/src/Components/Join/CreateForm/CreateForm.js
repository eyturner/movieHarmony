import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Button, TextField, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { SocketContext } from '../../../Contexts/Socket'
import genreDict from './genreDict'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  
});

const CreateForm = () => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const [genres, setGenres] = useState([])

  const socket = useContext(SocketContext)

  const handleGenreCheck = (e) => {
    let newGenre = genreDict[e.target.name] //converting text to genre code 
    genres.includes(newGenre) ? 
    setGenres(genres.filter(genre => genre !== newGenre)) : 
    setGenres(genres.concat(newGenre))
    console.log(socket.id)
  }

  const handleCreateRoom = async (e) => {
    if(!name || !room) {
      e.preventDefault();
      return
    }
    await socket.emit('create_room', genres, room, () => console.log("Room created"))
  }

  return (
    <div className={classes.formContainer}>
      <FormGroup>
        {Object.keys(genreDict).map(genre => 
        <FormControlLabel
          control={
            <Checkbox
              checked={genres.includes(genreDict[genre])}
              onChange={handleGenreCheck}
              name={genre}
              color="primary"
            />
          }
          key={genre}
          label={genre}
        />
        )}
      </FormGroup>
      <FormGroup>
        <TextField id="name" label="Name" onChange={(e) => setName(e.target.value)}/>
        <TextField id="room" label="Room" onChange={(e) => setRoom(e.target.value)}/>
        <Link to={`/harmony?name=${name}&room=${room}`}>
          <Button onClick={handleCreateRoom}>Join</Button>
        </Link>
      </FormGroup>
    </div>
  )
}

export default CreateForm