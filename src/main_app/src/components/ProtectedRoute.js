import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import GlobalContext from '../context/global/GlobalContext'

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const globalState = useContext(GlobalContext)
  const { client } = globalState

  return (
    <Route {...rest} render={
      props => {
        if (client) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/'
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute