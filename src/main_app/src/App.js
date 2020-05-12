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

const App = () => {
  // const [outpostExists, setOutpostExists] = useState(false)
  // const checkIfOutpostExists = () => {
  //   fetch(
  //     'http://localhost:5000/open/exists-client', 
  //     {
  //         method: 'GET',
  //         mode: 'cors',
  //         headers: new Headers({
  //             'Content-Type': 'application/json'
  //     })
  // })
  // .then(res => res.json())
  //   .then(data => {
  //     if (data.result === 'true') setOutpostExists(true)
  //   })

  // }
  // useEffect(() => {
  //   checkIfOutpostExists()
  //   // eslint-disable-next-line
  // }, [])


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
