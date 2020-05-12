import React, { useContext, Fragment, useState, useEffect }   from 'react'
import Dashboard from './Dashboard'
import GlobalContext from '../../context/global/GlobalContext'
import Login from './auth/Login'
import Signup from './Signup'
import { get } from '../../util/request'

const Home = props => {
  const globalState = useContext(GlobalContext)
  const [outpostExists, setOutpostExists] = useState(false)
  const { isAuthenticated } = globalState

  const checkIfOutpostExists = () => {
    get('http://localhost:5000/open/exists-client', null)
    .then(data => {
      if (data.result === 'true') setOutpostExists(true)
    })
    .catch(() => console.log("Something... failed?"))

  }
  useEffect(() => {
    checkIfOutpostExists()
    // eslint-disable-next-line
  }, [])

    return (
      <Fragment>
      {
                    isAuthenticated ?
                      <Dashboard/> :
                      outpostExists ?
                        <Login {...props}/> :
                        <Signup {...props}/>      
      }
      </Fragment>
    )

}


export default Home