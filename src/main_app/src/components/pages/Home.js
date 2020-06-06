import React, { useContext, Fragment, useState, useEffect }   from 'react'
import Dashboard from './Dashboard'
import GlobalContext from '../../context/global/GlobalContext'
import Login from './auth/Login'
import Signup from './Signup'
import { get } from '../../util/request'

const Home = props => {
  const globalState = useContext(GlobalContext)
  const [outpostExists, setOutpostExists] = useState(false)
  const [hasReceivedResponse, setHasReceivedResponse] = useState(false)
  const { isAuthenticated } = globalState

  const checkIfOutpostExists = () => {
    get(`http://localhost:${window.cicdbPort}/open/exists-client`, null)
    .then(data => {
      if (data.result === 'true') setOutpostExists(true)
      else setOutpostExists(false)
      setHasReceivedResponse(true)
    })
    .catch(() => {
      setTimeout(() => {
        checkIfOutpostExists()
      }, 1000)
    })

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
                      hasReceivedResponse ?
                      <Fragment>
                        {
                        outpostExists ?
                          <Login {...props}/> :
                          <Signup {...props}/> 
                        }
                      </Fragment> :
                      <Fragment>

                        <section className="hero is-primary is-bold is-fullheight">
                          <div className="hero-body">
                            <div className="container">
                            <div className="loader has-text-centered is-loading" style={{ fontSize: '80px', color: 'red', margin: 'auto'}}></div>

                            </div>
                          </div>
                        </section>
                        
                          

                      </Fragment>
      }
      </Fragment>
    )

}


export default Home