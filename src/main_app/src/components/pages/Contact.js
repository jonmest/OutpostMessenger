import React, { Fragment, useContext, useEffect, useState, useRef }   from 'react';
import GlobalContext from '../../context/global/GlobalContext'
import { post, get } from '../../util/request'
import io from 'socket.io-client'
import socketAuth from '../../util/socketAuth'
import MessageList from '../layouts/MessageList'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGrinAlt } from '@fortawesome/free-solid-svg-icons'

import "emoji-mart/css/emoji-mart.css"
import { Picker } from "emoji-mart"


const Contact = props => {

  /*
  * Define local state
  * message = message user currently writing on
  * messages = array of existing messages in convo
  */
 const [message, setMessage] = useState('')
 const [messages, setMessages] = useState([])
 const [socket, setSocket] = useState(null)
 const [contact, setContact] = useState({})


 // Emoji
 const [emojiPickerShow, SetEmojiPickerShow] = useState(false)

  /*
  * Define global context and on mount
  * fetch current contact information
  */
  const globalContext = useContext(GlobalContext)
  const messagesEndRef = useRef(null)

  const setupSocket = async url => {
    return new Promise((resolve, reject) => {
      const socket = io(url)
      socketAuth(socket, globalContext, () => {
          socket.on('oldMessages', data => {
            data.forEach(item => handleMessage(item.message))
          })

          socket.on('message', data => {
            handleMessage(data)
          })
      })
      resolve(socket)
    })
    .then(data => setSocket(data))
  }

  /**
   * On EACH re-render
   */
  useEffect(() => {
    messagesEndRef.current.scrollIntoView()
    document.body.style.overflowY = 'hidden'
    if (socket) window.socketConn = socket
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })

  /**
   * On UNMOUNT
   */
  useEffect(() => {
    return () => {
      window.socketConn.close()
      window.removeEventListener("click", closeEmoji)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * On update of contact
   */
  useEffect(() => {
    globalContext.setTitle(contactToString(contact))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contact])

  /**
   * On MOUNT
   */
  useEffect(() => {
    get(`http://localhost:${window.cicdbPort}/outpost/contacts?id=${props.match.params.contact}`,
    globalContext.bearToken)
    .then(res => res.contacts)
    .then(res => {
      setContact(res)
    })

    get(
      `http://localhost:${window.cicdbPort}/outpost/messages?id=${props.match.params.contact}`,
      globalContext.bearToken,
    )
    .then(data => {
      setMessages(msgs => msgs.concat(data.messages))
    })

    // Establish IO connection
    setupSocket('https://outpostmessenger.com/')


    window.addEventListener('click', closeEmoji)

    // eslint-disable-next-line
  }, [])

  const closeEmoji = e => {
    e.preventDefault()
    if (!e.target.closest(".emojiOpener")) {
      SetEmojiPickerShow(false)
    }

  }
  
  /**
   * Handle INCOMING message
   * - Decrypt it
   * - Store to local message DB
   * @param {string} message 
   */
  const handleMessage = async message => {
    post(
      `http://localhost:${window.cicdbPort}/outpost/decrypt`,
      globalContext.bearToken,
      { message }
    ).then(decrypted => {
      post(
        `http://localhost:${window.cicdbPort}/outpost/messages`,
        globalContext.bearToken,
        decrypted.message
      )
      return decrypted.message
    })
    .then(message => {
      setMessages(msgs => msgs.concat(message))
    })


  }

  /*
  * Event handlers for user input
  */
  const handleMessageChange = event => setMessage(event.target.value)

  /**
   * Eventhandler for submission of message form
   * @param {Event} event 
   */
  const handleSubmit = async event => {
    event.preventDefault()
    if (message.length < 1) return

    // For timestamping the message
    const date = new Date()
    const now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.000`

    const body = {
      recipient: contact.id,
      sender: globalContext.client.id,
      data: message,
      timestamp: now
    }

    // Clear message form
    setMessage('')

    // Store to local message DB before encryption
    post(`http://localhost:${window.cicdbPort}/outpost/messages`,
      globalContext.bearToken,
      body)
    .catch(() => console.log('Failed to store message.'))
    
    /*
    * Encrypt message
    */
    post(`http://localhost:${window.cicdbPort}/outpost/encrypt`,
      globalContext.bearToken,
      body)
    .then(data => JSON.parse(data.message))
    .then(data => {
        /*
        * Send message to socket server
        */
        socket.emit('message', data)
    })
    .catch(() => console.log('Failed to encrypt message.'))

    setMessages(msgs => msgs.concat(body))
  }
  
  const handleKeydown = event =>  {
    if (event.keyCode === 13) {
      event.preventDefault()
      handleSubmit(event)
  }
}

const toggleEmojiPickerOn = e => {
  e.preventDefault()
  SetEmojiPickerShow(true)
  e.stopPropagation()
}

  return (
    <Fragment>
      <div style={{ height: '90vh', overflowY: 'hidden'}}>

        <div>
          <div style={{
            padding: '0 10px',
            height: '80vh',
            overflowX: 'hidden', overflowY: 'scroll'
            }}>

<div class="columns" style={{maxWidth: '100%'}}>
  <div className="column">
    
  </div>
  <div class="column is-three-quarters">
            <MessageList messages={messages} contact={contact} me={globalContext.client.id}/>
            <div ref={messagesEndRef} />
</div>
<div className="column">
  </div>
            </div>
          </div>
        </div>

                    <div style={{ 
                      height: '10vh', width: '100%',
                      bottom: '0%',
                      padding: '0 10px'
                      }}>
              <form onSubmit={handleSubmit} onKeyDown={handleKeydown}>
                


<div class="columns" style={{maxWidth: '100%'}}>
  <div className="column">

  </div>
  <div class="column is-three-quarters">
  <div className="control">
          <textarea autoFocus={true} onChange={handleMessageChange} value={message} className="textarea" rows="3" placeholder="Write here..."/>
        
          </div>
  </div>
  <div class="column">
  <div className="emojiOpener" className="control">
          <button className="emojiOpener" className="button is-light" onClick={toggleEmojiPickerOn}>
          <FontAwesomeIcon className="emojiOpener" icon={faGrinAlt} />
          </button>
          </div>
  </div>

</div>
                
              


                      { emojiPickerShow && <Picker
      id="emojiPicker"
      style={{ position: 'absolute', bottom: '20px', right: '20px' }}
        title="Pick your emoji…"
        emoji="point_up"
        set='twitter'
        onSelect={emoji => setMessage(message + emoji.native)}
        showSkinTones={false}

      />}
          </form>
                    </div>
                  </div>
                </Fragment> )
}

function contactToString (contact) {
  if (!contact) return null
  if (contact.alias) return contact.alias
  else return contact.id
}

export default Contact