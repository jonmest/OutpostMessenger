import React, { Fragment, useEffect, useContext, useState }   from 'react'
import { Link } from 'react-router-dom'
import GlobalContext from '../../context/global/GlobalContext'
import CopyField from '../layouts/CopyField'
import ContactList from '../layouts/ContactList'
import ContactRequest from '../layouts/ContactRequest'
import { post } from '../../util/request'
import io from 'socket.io-client'
import socketAuth from '../../util/socketAuth'

const Dashboard = () => {
    const globalState = useContext(GlobalContext)
    const { contacts, loadContacts, client, bearToken } = globalState
    const [contactRequests, setContactRequests] = useState([])
    const [socket, setSocket] = useState(null)

    const setupSocket = async url => {
        return new Promise((resolve, reject) => {
          const socket = io(url)
          console.log("Trying to connect...")
          socketAuth(socket, globalState, () => {
              console.log("Connected...")
              socket.on('message', message => {
                post(
                    `http://localhost:5000/outpost/decrypt`,
                    bearToken,
                    { message }
                  ).then(decrypted => {
                    post(
                    `http://localhost:5000/outpost/messages`,
                      bearToken,
                      decrypted.message
                    )
                  })
              })

              socket.on('contactRequests', requests => {
                setContactRequests(contactRequests =>  [...contactRequests, ...requests])
            })
          })
          resolve(socket)
        })
        .then(data => setSocket(data))
        .catch(e => console.log(e))
    }

    useEffect(() => {
        loadContacts()        
        
        const body = {
            id: client.id,
            publicKey: client.publicKey
        }

        post('https://outpostmessenger.com/outposts', null, body)
        .then(() => {
            setupSocket('https://outpostmessenger.com/')
        })
        .catch(error => console.log(error))   
    }, [])

    useEffect(() => {
        return () => {
            if (socket) {
                socket.close()
            }
        }
    })

    useEffect(() => {
        const body = {
            id: globalState.client.id,
            publicKey: globalState.client.publicKey
        }

        post('https://outpostmessenger.com/outposts', null, body)
        .catch(error => console.log(error))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contacts])
 
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
                                            contactRequests.map((item, index) => <ContactRequest key={index} sender={item.senderId}/>)
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