import { Link } from 'react-router-dom'
import React, { Fragment, useEffect, useContext, useState }   from 'react'
import { patch, get, deleteRequest } from '../../util/request'
import GlobalContext from '../../context/global/GlobalContext'
import Moment from 'react-moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

const ContactListItem = ({ contact }) => {
    const [lastMessage, setlastMessage] = useState({})
    const [alias, setAlias] = useState('')
    const [contactState, setContactState] = useState({})
    const [showMenu, setShowMenu] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const globalContext = useContext(GlobalContext)
    const { loadContacts } = globalContext

    const contactToString = () => {
        if (!contactState) return null
        if (contactState.alias) return contactState.alias
        else return contactState.id
    }
    

    const reFetch = () => {
        get(`http://localhost:5000/outpost/contacts?id=${contact.id}`,
            globalContext.bearToken)
        .then(res => res.contacts)
        .then(res => {
            setContactState(res)
        })
    }

    useEffect(() => {
        setContactState(contact)

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
                    <Moment fromNow>{ time }</Moment>
                }
                </span>
            </Fragment>
        }
    }

    const toggleMenu = event => {
        event.preventDefault()
        if (showMenu) setShowMenu(false)
        else setShowMenu(true)
    }

    const handleAliasChange = event => {
        setAlias(event.target.value)
    }

    const handleAliasSubmit = event => {
        event.preventDefault()

        patch('http://localhost:5000/outpost/contacts',
            globalContext.bearToken,
            { id: contact.id, alias })
        .then(res => console.log(res))
        .then(() => reFetch())
    }

    const handleKeydown = event =>  {
        if (event.keyCode === 13) {
          event.preventDefault()
          handleAliasSubmit(event)
      }
    }

    const deleteClick = event => {
        event.preventDefault()
        setShowDelete(true)
    }

    const confirmDelete = event => {
        event.preventDefault()
        deleteRequest('http://localhost:5000/outpost/contacts',
        globalContext.bearToken,
        { id: contact.id, alias })
        .then(() => loadContacts())
    }


    return (
            <Fragment>
                <section>
                <Link to={`/contact/${contactState.id}`}>
                    <div className="card">
                    <header class="card-header">
                        <p class="card-header-title">
                        { contactToString() }
                        </p>
                            <div style={{overflow: 'visible'}} class={ showMenu ? 'dropdown is-active is-right' : 'dropdown is-right'}>
                            <div class="dropdown-trigger">
                                <button onClick={toggleMenu} class="button card-header-icon" aria-haspopup="true" aria-controls="dropdown-menu2">
                                <span class="icon is-small">
                                    <FontAwesomeIcon icon={faUser} />
                                </span>
                                </button>
                            </div>
                            < div class="dropdown-menu" id="dropdown-menu2" role="menu">
                                <div class="dropdown-content">
                                { 
                                <div class="dropdown-item">
                                    <form onSubmit={handleAliasSubmit} onKeyDown={handleKeydown}>
                                    <input value={alias} onChange={handleAliasChange} onClick={e => e.preventDefault()} class="input is-small" type="text" placeholder="Text input"></input>
                                    <submit onClick={handleAliasSubmit} class="button is-primary is-small is-fullwidth">Give alias</submit>
                                    </form>
                                </div>

                                }
                                <hr class="dropdown-divider"/>
                                <div class="dropdown-item">
                                <button onClick={deleteClick} class="button is-danger is-small is-fullwidth">Delete</button>

                                </div>
                                </div>
                            </div>
                            </div>
                    </header>
                        <div className="card-content">

                            <span className="has-text-grey-light">
                                { renderLastMessage() }
                                </span>

                        </div>
                    </div>
                </Link>
                </section>
                {

                showDelete && <div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-content">
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Confirm deletion of contact</p>
      <button onClick={e => setShowDelete(false)} class="delete" aria-label="close"></button>
    </header>

    <footer class="modal-card-foot">
      <button onClick={confirmDelete} class="button is-danger">Delete now</button>
      <button onClick={e => setShowDelete(false)} class="button">Cancel</button>
    </footer>
  </div>
  </div>
  <button class="modal-close is-large" aria-label="close"></button>
</div>
}
            </Fragment> 
        )
}

export default ContactListItem
