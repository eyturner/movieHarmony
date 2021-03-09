import React, { useState } from 'react'
import { TextField } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import { languageDict } from '../dictionaries'

const AdvancedOptions = ({ years, changeYears, changeLanguage }) => {
  const [language, setLanguage] = useState('English')
  const useStyles = makeStyles({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
  })

  //Need special function so we update the form and also the state from the main CreateForm component
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang)
    changeLanguage(languageDict[newLang])
  }

  const classes = useStyles()

  return (
    <div>
      <TextField
        id="standard-number"
        label="Earliest Year"
        placeholder={years[0].toString()}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => changeYears([e.target.value, years[1]])}
      />
      <TextField
        id="standard-number"
        label="Latest Year"
        type="number"
        placeholder={years[1].toString()}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) => changeYears([years[0], e.target.value])}
      />
      <TextField
        select
        label="Language"
        value={language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        SelectProps={{
          native: true,
        }}
        helperText="Original movie language"
        variant="outlined"
      >
        {Object.keys(languageDict).map((langOption) => (
          <option key={langOption} value={langOption}>
            {langOption}
          </option>
        ))}
      </TextField>
    </div>
  )
}

export default AdvancedOptions