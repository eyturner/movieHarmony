import React, { useState } from 'react'
import { Container, Switch } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import './Navbar.scss'

const useStyles = makeStyles({
  root: {
    border: '1px solid black',
    padding: '5px 10px',
    background: '#6C5B7B',
  },
  navbar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    color: 'white'
  }
});

const Navbar = () => {
  const classes = useStyles()
  const [darkMode, setDarkMode] = useState(false)

  return (
    <Container className={classes.root} maxWidth="lg">
      <div className={classes.navbar}>
        <h1>MoviEHarmony</h1>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/how-it-works">How it Works</a>
        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          color="primary"
          name="darkMode"
        />
      </div>
    </Container>
  )
}

export default Navbar
