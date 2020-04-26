import React, { Fragment } from 'react'
import Message from './Message'

const MessageList = ({ messages, contact }) => {
    return (
        <Fragment>                   
            {
          messages.map((item, index) => {
            return <Message key={index}
            plaintext={item.plaintext}
            sender={item.sender}
            contact={contact}/>
          })
          }
        </Fragment> 
        )
}


export default MessageList