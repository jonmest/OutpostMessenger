import React, { Fragment, useContext, useState }   from 'react' 
import GlobalContext from '../../../context/global/GlobalContext'
import { Redirect } from 'react-router-dom'

const Login = props => {

    const globalState = useContext(GlobalContext)
    const [passphrase, setPassphrase] = useState('')
    const [hasFailed, setHasFailed] = useState(false)
    const onChange = (event) => setPassphrase(event.target.value)

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        const wordArray = passphrase.split(' ').filter(
          item => item.length !== 0
          )

        if (wordArray.length !== 8) {
          setHasFailed(true)
        }

        const res = await globalState.authenticate(wordArray)
        if (res === 'SUCCESS') {
          setHasFailed(false)
          props.history.push('/')
        } else setHasFailed(true)
    }
    
    return (
            <Fragment>
              {
                globalState.client && <Redirect to='/'/>
              }
                <section className="hero is-fullheight-with-navbar">
            <div className="hero-body">
              <div className="container">
                <div className="columns is-centered">
                  <div className="has-text-centered column is-6-tablet is-5-desktop is-4-widescreen">
                    <form onSubmit={handleSubmit}>

                      <div className="field">
                        <p className="title">Log in with your passphrase</p>
                        <div className="control">
                        <textarea onChange={onChange} value={passphrase} className="textarea" rows="3" placeholder="8 words separated by a space"></textarea>

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