import React, { Fragment } from 'react'
import ContactListItem from './ContactListItem'
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
                    contacts.map((item, index) => {
                        return (
                            <ContactListItem key={index} contact={item}/>
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