import React, { Fragment, useEffect, useContext, useState }   from 'react'
import { Link } from 'react-router-dom'
import GlobalContext from '../../context/global/GlobalContext'
import CopyField from '../layouts/CopyField'
import ContactList from '../layouts/ContactList'
import ContactRequest from '../layouts/ContactRequest'

const Dashboard = props => {
    const globalState = useContext(GlobalContext)
    const { socket } = globalState
    const [contactRequests, setContactRequests] = useState([])

    useEffect(() => {
        globalState.openSocket()
        
    }, [])

    useEffect(() => {
        const body = JSON.stringify({
            id: globalState.client.id,
            publicKey: globalState.client.publicKey
          })

        fetch(
            'https://outpostmessenger.com/outposts', 
            {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body
      })
      .catch(error => console.log(error))

      if (socket) {
        socket.on('contactRequests', requests => {
            console.log("You've got a contact request.")
            setContactRequests(contactRequests =>  [...contactRequests, ...requests])
        })
      }
    })
 
    return (
            <Fragment>
                <section className="section">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-one-quarter">
                                <aside className="menu">
                                    <p className="menu-label">
                                        Outpost ID
                                    </p>
                                    <ul className="menu-list">
                                        <li>
                                            <CopyField 
                                            content={ globalState.client.id }
                                            type='textfield' />
                                        </li>
                                            <li><br/></li>
                                    </ul>
                                    <Link to="/add-contact">
                                        <button className="button is-primary is-fullwidth">
                                            Add Contact
                                        </button>
                                    </Link>
                                    <ul className="menu-list">
                                        {
                                            contactRequests.map(item => <ContactRequest sender={item.senderId}/>)
                                        }
                                    </ul>
                                </aside>
                            </div>
                            <div className="column is-three-quarters">
                                <ContactList contacts={globalState.contacts}/>
                            </div>
                        </div>
                    </div>
                </section>
            </Fragment> 
        )
}

export default Dashboard