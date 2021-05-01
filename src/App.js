import logo from './pyramidLogo.gif';
import React, { Component } from 'react';
import Homepage from './Pages/Pages/Homepage.js'
import './App.css';
import Web3 from 'web3';
import { Typewriter } from 'react-typewriting-effect';
import 'react-typewriting-effect/dist/index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PYRAMIDTOKEN_ADDRESS, PYRAMIDTOKEN_ABI } from './config.js'
import HowToBuy from './Pages/Pages/HowToBuy.js';
import HowToJoin from './Pages/Pages/HowToJoin';
import PageNotFound from './Pages/Pages/PageNoteFound.js'

function App() {
  return(
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Homepage/>
        </Route>
        <Route exact path='/how-to-buy'>
          <HowToBuy/>
        </Route>
        <Route exact path='/how-to-join'>
          <HowToJoin/>
        </Route>
        <Route>
          <PageNotFound/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
