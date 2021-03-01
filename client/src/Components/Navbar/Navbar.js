import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    border: '1px solid black',
    padding: '5px 10px'
  },
});

const Navbar = () => {
  const classes = useStyles()

  return (
    <Container className={classes.root} maxWidth="lg">
      <h1>MoviEHarmony</h1>
      <div>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </div>
    </Container>
  )
}

export default Navbar
