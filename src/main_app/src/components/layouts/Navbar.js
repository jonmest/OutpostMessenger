import React   from 'react';
import { Fragment, useContext } from 'react';
import GlobalContext from '../../context/global/GlobalContext'
import { useHistory } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const globalState = useContext(GlobalContext)
  const history = useHistory()
  const { title } = globalState

  const goBack = event => {
    event.preventDefault()
    globalState.setTitle(null)
    history.goBack()
  }
  
    return (
        <Fragment>
          
          <nav className="navbar is-fixed-top has-background-light" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <div className="navbar-item">
                <div className="field is-grouped">
                  {
                    history.length > 1 && <p className="control">
                    <a className="button" href="/" onClick={goBack}>
                      <span className="icon">
                      <FontAwesomeIcon icon={faArrowAltCircleLeft} />
                      </span>
                    </a>
                  </p>
                  }
                  {
                        title && 
                        <p className="control">
                          <button tabIndex="-1" className="button is-primary is-static">
                            <span className="icon">
                            <FontAwesomeIcon icon={faUser} />
                            </span>
                            <span>
                            { title }

                            </span>
                        </button>
                      </p>
                  }
                </div>
              </div>
            </div>
           </nav>
        </Fragment>       
    )
}

export default Navbar