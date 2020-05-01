import { Link } from 'react-router-dom'
import React, { Fragment, useEffect, useContext, useState }   from 'react'
import { post, get } from '../../util/request'
import GlobalContext from '../../context/global/GlobalContext'
import Moment from 'react-moment'

const ContactListItem = ({ contact }) => {
    const [lastMessage, setlastMessage] = useState({})
    const globalContext = useContext(GlobalContext)

    useEffect(() => {
        get(`http://localhost:5000/outpost/messages?id=${contact.id}&limit=1`,
        globalContext.bearToken)
        .then(response => response.messages)
        .then(list => setlastMessage(list[0]))
        .catch(() => setlastMessage(null))
    }, [])

    const renderLastMessage = () => {
        const time = (lastMessage) ? new Date(lastMessage.timestamp) : null

        if (!lastMessage) {
            return 'Start a conversation now!'
        } else {
            return <Fragment>
                {lastMessage.data}
                
                <span className="help">
                {
                    <Moment date={time} format="HH:mm"/>
                    }
                </span>
            </Fragment>
        }
    }

    return (
            <Fragment>
                <Link to={`/contact/${contact.id}`}>
                    <div className="card">
                    <header class="card-header">
                        <p class="card-header-title">
                        { contact.id }
                        </p>
                        <a href="#" class="card-header-icon" aria-label="more options">
                        <span class="icon">
                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                        </span>
                        </a>
                    </header>
                        <div className="card-content">

                            <span className="has-text-grey-light">
                                { renderLastMessage() }
                                </span>

                        </div>
                    </div>
                </Link>
            </Fragment> 
        )
}

export default ContactListItem