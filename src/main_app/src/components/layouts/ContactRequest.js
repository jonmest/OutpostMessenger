import React, { Fragment, useContext, useState }   from 'react'
import GlobalContext from '../../context/global/GlobalContext'
import { getContact, setContact } from '../../util/addContact'

const ContactRequest = props => {
    const globalState = useContext(GlobalContext)
    const sender = props.sender
    const [visible, setVisible] = useState(true)

    
    /**
     * Make component invisible
     * after closing or accepting request
     */
    const setInvisible = () => setVisible(false)

    /**
     * Add user who sent request
     * as a contact
     */
    const addContact = async () => {
        const contact = await getContact(sender)
        setContact(contact, globalState.bearToken)
        globalState.addContact(contact)
        setVisible(false)
    }
    
    return (
        <Fragment> 
            {
                visible &&                   
                <div className="notification is-secondary">
                    <button className="delete" onClick={setInvisible}/>
                        Contact Request: { sender }
                    <button className="button" onClick={addContact}>Accept</button>
                </div>
            }
        </Fragment> 
        )
}


export default ContactRequest