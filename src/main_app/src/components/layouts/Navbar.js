import React   from 'react';
import { Fragment, useContext, useState } from 'react';
import GlobalContext from '../../context/global/GlobalContext'
import { useHistory } from "react-router-dom"

const Navbar = () => {
  const globalState = useContext(GlobalContext)
  const history = useHistory()
  const { title } = globalState

  const goBack = () => {
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
                    <a className="button" onClick={goBack}>
                      <span className="icon">
                        ◄
                      </span>
                    </a>
                  </p>
                  }
                  {
                        title && 
                        <p className="control">
                          <button className="button is-primary is-static">
                            <span className="icon">
                              <i className="fas fa-address-book" aria-hidden="true"></i>
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