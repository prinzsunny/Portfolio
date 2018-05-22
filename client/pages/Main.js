import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const Main = () => (
  <MuiThemeProvider>
    <Header/>
	    <Switch>
	       <Route exact path='/' component={Home}/>
	    </Switch>
    <Footer/>
   </MuiThemeProvider>
)

export default Main
