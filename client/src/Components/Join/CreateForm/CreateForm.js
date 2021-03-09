import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Button, FormGroup, Stepper, Step, StepLabel, StepContent, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Genres from './Genres/Genres'
import Name from './Name/Name'
import AdvancedOptions from './AdvancedOpts/advanceOpts'

import { SocketContext } from '../../../Contexts/Socket'

const ROOM_CODE_LENGTH = 4


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },

});

const generateRoomCode = (length) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  for (let i = 0; i < length; ++i) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result
}

const CreateForm = () => {
  const classes = useStyles()
  const [name, setName] = useState('')
  const [genres, setGenres] = useState([])
  const [yearRange, setYearRange] = useState([1888, new Date().getFullYear()]) //Setting dates to max range
  const [langCode, setLangCode] = useState('en')
  const [activeStep, setActiveStep] = useState(0);
  const ROOM = generateRoomCode(ROOM_CODE_LENGTH)

  const socket = useContext(SocketContext)

  const addGenre = (genreId) => {
    genres.includes(genreId) ?
      setGenres(genres.filter(genre => genre !== genreId)) :
      setGenres(genres.concat(genreId))
  }

  const changeName = (name) => {
    setName(name)
  }

  const changeYears = (years) => {
    setYearRange(years)
  }

  const changeLanguage = (lang) => {
    setLangCode(lang)
  }

  const handleCreateRoom = async (e) => {
    if (!name) {
      e.preventDefault()
      return
    }
    if (Number(yearRange[0]) > Number(yearRange[1])) { // Dates are flipped 
      const MIN_YEAR = yearRange[1]
      const MAX_YEAR = yearRange[0]
      setYearRange([MIN_YEAR, MAX_YEAR])
    }

    await socket.emit('create_room', { genres, yearRange, language: langCode }, ROOM, () => console.log(`Room created: genres: ${genres}, years: ${yearRange}, langCode: ${langCode}`))
  }



  return (
    <>
      <div className={classes.formContainer}>
        <FormGroup className={classes.root}>
          <Genres addGenre={addGenre} />
        </FormGroup>
        <FormGroup className={classes.root}>
          <Name changeName={changeName} />
          <AdvancedOptions years={yearRange} changeYears={changeYears} changeLanguage={changeLanguage} />
          <Link to={`/harmony?name=${name}&room=${ROOM}`}>
            <Button onClick={handleCreateRoom}>Join</Button>
          </Link>
        </FormGroup>
      </div>
    </>
  )
}

export default CreateForm