import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
});

const About = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <h1>Here's the about page!</h1>
    </div>
  )
}

export default About