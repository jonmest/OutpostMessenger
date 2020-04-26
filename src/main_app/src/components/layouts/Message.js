import React, { Fragment } from 'react'

const Message = props => {
    const plaintext = props.plaintext
    const sender = props.sender
    const contact = props.contact

    console.log(sender)
    return (
        <Fragment>                   
            <div className="columns">
            <div className="column">
            {
                (sender === contact.id ) ?
                <Fragment>
                <span className="help has-text-grey-light">{contact.id}</span>
                <article className="message is-dark">
                <div className="message-body">
                { plaintext }
                </div>
                </article>
                </Fragment> :
                null
            }
            </div>
            <div className="column">
            {
                (sender !== contact.id ) ?
                <Fragment>
                    <span className="help has-text-grey-light">
                        You
                    </span>
                    <article className="message ">
                        <div className="message-body">
                            { plaintext }
                        </div>
                    </article>
                </Fragment> :
                null
            }
            </div>
            </div>
        </Fragment> 
        )
}


export default Message