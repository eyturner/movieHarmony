import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Join from './Components/Join/Join'
import Choose from './Components/Choose/Choose'
import Navbar from './Components/Navbar/Navbar'
import About from './Components/About/About'
import { SocketContext, socket } from './Contexts/Socket';

import './App.scss'

const App = () => (
  <SocketContext.Provider value={socket}>
    <div id="root">
      <Navbar />
      <Router>
        <Switch>
          <Route path="/" exact component={Join} />
          <Route path="/harmony" component={Choose} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    </div>
  </SocketContext.Provider>
);

export default App;