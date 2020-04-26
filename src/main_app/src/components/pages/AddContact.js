import React, { Fragment, useContext, useState }   from 'react'
import GlobalContext from '../../context/global/GlobalContext'
import Notification from '../layouts/Notification'
import { getContact, setContact } from '../../util/addContact'

const AddContact = props => {

    /*
    * State
    */
  const globalState = useContext(GlobalContext)
  const [id, setId] = useState("")
  const [notification, setNotification] = useState(null)

  /*
  * Eventhandler for submission
  */
  const handleSubmit = async (event) => {
      event.preventDefault()
      // Fetch contacts
      const contact = await getContact(id)

      if (globalState.socket) {
        console.log("SOCKET")
        console.log(contact)
        globalState.socket.emit('contactRequest', { id: globalState.client.id, recipientId: contact.id })
      }

      setContact(contact, globalState.bearToken)
      .then(() => {
        globalState.addContact(contact)
        setNotification({
                message: "Contact successfully added.",
                type: "is-success"
            })
      })
      .catch(() => {
        setNotification({
            message: 'Something failed.',
            type: 'is-danger'
        })
      })

    }          

    return (
        <Fragment>
            <section className="hero">
                <div className="hero-body">
                    <div className="container">
                        <div className="card-content">
                            <div className="content has-text-centered">
                                <p className="title has-text-black">
                                    Add a contact by ID
                                </p>
                                <form onSubmit={handleSubmit}>
                                    <div className="control">
                                        <input 
                                        className="input is-large"
                                        onChange={
                                            event => setId(event.target.value)
                                        }
                                        type="search"/>

                                    </div>
                                </form>
                            </div>
                            { notification &&
                                <Notification message={notification.message} type={notification.type}/> }
                        </div>
                    </div>
                </div>
            </section>
        </Fragment> 
        )
}

export default AddContact