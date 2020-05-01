import React, { Fragment } from 'react'
import Message from './Message'

const MessageList = ({ messages, contact, me }) => {
    return (
        <Fragment>                   
            {
          messages.filter(item => item !== undefined).map((item, index) => {
            return <Message key={index}
            data={item.data}
            sender={item.sender}
            contact={contact}
            timestamp={item.timestamp}
            me={me}
            />
          })
          }
        </Fragment> 
        )
}


export default MessageList