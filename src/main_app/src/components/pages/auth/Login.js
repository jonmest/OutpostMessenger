import React, { Fragment, useContext, useState }   from 'react' 
import GlobalContext from '../../../context/global/GlobalContext'
import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
const Login = props => {

    const {client, authenticate} = useContext(GlobalContext)
    const [passphrase, setPassphrase] = useState('')
    const [hasFailed, setHasFailed] = useState(false)
    const [isMasked, setIsMasked] = useState(true)

    const onChange = (event) => setPassphrase(event.target.value)

    const handleSubmit = async (event) => {
        event.preventDefault()

        const wordArray = passphrase.split(' ')
                        .filter(item => item.length !== 0)

        if (wordArray.length !== 8) {
          setHasFailed(true)
        }

        authenticate(wordArray)
        .then(res => {
          if (res === 'SUCCESS') {
            setHasFailed(false)
            // props.history.push('/')
          } else setHasFailed(true)
        })
        .catch(() => {
          setHasFailed(true)
        })
    }

    const getView = () => {
      if (isMasked) return 'password'
      else return 'text'
    }

    const toggleMasked = e => {
      e.preventDefault()
      if (isMasked) setIsMasked(false)
      else setIsMasked(true)
    }
    
    return (
            <Fragment>
              {
                client && <Redirect to='/'/>
              }
                <section className="hero is-fullheight-with-navbar">
            <div className="hero-body">
              <div className="container">
                <div className="columns is-centered">
                  <div className="has-text-centered column is-6-tablet is-6-desktop is-6-widescreen">
                    <form onSubmit={handleSubmit}>

                      <div className="field">
                        <p className="title">Log in with your passphrase</p>
                        <div className="field is-grouped is-grouped-centered">
                        <p className="control">
                        <button onClick={toggleMasked} className="button">
                        <span className="icon is-small has-text-centered">
                          <FontAwesomeIcon icon={faEyeSlash} />
                        </span>
                        </button>
                        </p>
                      
                      </div>
                        <div className="control">
                        <input autoComplete="off" type={getView()} onChange={onChange} value={passphrase} className="textarea" rows="3" placeholder="8 words separated by a space"></input>
                      {
                        hasFailed && <p className="help is-danger">Incorrect credentials.</p>
                      }
                        </div>
                      </div>
                      
 
                      <div className="field">
                        <button className="button is-primary is-fullwidth ">
                          Login
                        </button>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

            </Fragment> 
   
        )

}


export default Login