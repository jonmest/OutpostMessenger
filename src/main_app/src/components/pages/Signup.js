import React, { Fragment, useState, useEffect, useContext } from 'react'
import { get, post } from '../../util/request'
import GlobalContext from '../../context/global/GlobalContext'
import CopyField from '../layouts/CopyField'

const Signup = props => {

  /*
  * State
  */
  const globalState = useContext(GlobalContext)
  const [passphrase, setPassphrase] = useState([])

  /**
  * When component mounts, fetch
  * random words for passphrase
  */
  useEffect(() => {
    fetchPassphrase()
  }, [])

  /**
   * Fetch random passphrase
   */
  const fetchPassphrase = () => {
    get(`http://localhost:${window.cicdbPort}/open/passphrase-generate`)
    .then(data => setPassphrase(data.passphrase))
    .catch(error => console.log(error))
  }
  
  /**
   * Eventhandler for form submission
   * @param {Event} event 
   */
  const handleSubmit = async (event) => {
    event.preventDefault()
    post(
      `http://localhost:${window.cicdbPort}/open/create-client`,
      null,
      { passphrase } )
    .then(data => {
      if (data.result === 'success') {
        return globalState.authenticate(passphrase)
    }})
  .then(() => props.history.push('/'))
  }

  /**
   * Called when user wants another
   * passphrase generated
   */
  const getOtherWords = async event => {
    event.preventDefault()
    fetchPassphrase()
  }

  const generateString = () => {
    let toReturn = ""
    passphrase.map(item => {
      toReturn += item
      toReturn += ' '
      return null
    })
    return toReturn.slice(0, toReturn.length-1)
  }
  return (
    <Fragment>
      <section className="hero is-fullheight-with-navbar">
            <div className="hero-body">
              <div className="container">
                <div className="columns is-centered">
                  <div className="has-text-centered column is-6-tablet is-5-desktop is-4-widescreen">
                  <form onSubmit={handleSubmit}>


                      <div className="field">
                        <p className="title">Create your Outpost now</p>
                        <p className="subtitle">Is this passphrase OK?</p>

                        <div className="control">
                          <CopyField content={generateString()}
                          type='textarea'/>
                        </div>
                      </div>
 
                      <div className="field">
                        <button className="button is-primary is-fullwidth ">
                        Yes, I'll memorize and use this passphrase.
                        </button>
                      </div>
                      <div className="field">
                      <button onClick={getOtherWords}
                        className="button is-fullwidth">
                        No, generate another one.
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

export default Signup