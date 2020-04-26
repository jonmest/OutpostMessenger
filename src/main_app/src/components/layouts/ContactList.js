import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const ContactList = ({ contacts }) => {

    /**
     * Return fragment depending on if
     * the supplied contact array is empty,
     * otherwise it lists each contact
     *
     * @returns {Fragment}
     */ 
    const renderContacts = () => {
        if (contacts.length < 1) {
            return <Fragment>
                    <div className="container has-text-centered">
                        <p className='title'>
                            <i className="far fa-angry"/>
                        </p>
                        <p className='title'>
                            You have no contacts!
                        </p>
                    </div>
                </Fragment>
        } else {
            return <Fragment>
                {
                    contacts.map(item => {
                        return (
                            <div className="card">
                                <div className="card-content">
                                    <p className="title">
                                        { item.id }
                                    </p>
                                </div>
                                <Link to={`/contact/${item.id}`}>
                                    <footer className="card-footer">
                                        <p className="card-footer-item">
                                            <span>
                                                <button className="button is-primary is-fullwidth">
                                                    Decrypt & Open Conversation
                                                </button>
                                            </span>
                                        </p>
                                    </footer>
                                </Link>
                            </div>
                        )
                    })
                            }
            </Fragment>
        }
    }
 
    return (
            <Fragment>
                { renderContacts() }
            </Fragment> 
        )
}

export default ContactList