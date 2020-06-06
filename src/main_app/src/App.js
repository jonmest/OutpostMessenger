import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import { Fragment  } from 'react'
import Home from './components/pages/Home.js'
import AddContact from './components/pages/AddContact'
import Contact from './components/pages/Contact'
import ProtectedRoute from './components/ProtectedRoute'
import './App.scss'
import './App.css'
import Navbar from './components/layouts/Navbar'

/**
 * State
 */
import GlobalState from './context/global/GlobalState'

// Query parameter should look like:
// ?port=5000
window.cicdbPort = window.location.search.slice(6) // For just number

const App = () => {

    return (
      <GlobalState>
        <Router>
        <Navbar/>

          <Switch>
                      
            <Route exact path='/'
             render={props => {
                return <Fragment>
                  <Home {...props}/>
                </Fragment>
            }}/>

            <ProtectedRoute path='/contact/:contact' component={Contact}/>
            <ProtectedRoute exact path="/add-contact" component={AddContact}/>

          </Switch>
        </Router>
      </GlobalState>
    )
}

export default App
