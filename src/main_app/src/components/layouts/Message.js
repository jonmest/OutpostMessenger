import React, { Fragment } from 'react'

const Message = props => {
    const message = props.message
    const contact = props.contact

    return (
        <Fragment>                   
            <div className="columns">
            <div className="column">
            {
                (message.sender === contact.id ) ?
                <Fragment>
                <span className="help has-text-grey-light">{contact.id}</span>
                <article className="message is-dark">
                <div className="message-body">
                { message.message.plain }
                </div>
                </article>
                </Fragment> :
                null
            }
            </div>
            <div className="column">
            {
                (message.sender !== contact.id ) ?
                <Fragment>
                    <span className="help has-text-grey-light">
                        You
                    </span>
                    <article className="message ">
                        <div className="message-body">
                            { message.message.message.plain }
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