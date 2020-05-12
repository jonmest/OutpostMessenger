import React, { Fragment, useState } from 'react'


/**
 * Text field that automatically
 * copies content to user's clipboard
 * on click
 * @param {content} { content, string }
 * @param {type} {'textarea' or 'textfield'}
 * @returns {Fragment}
 */
const CopyField = ({ content, type, placeholder }) => {

    const [hasCopied, setHasCopied] = useState(false)
    
    /**
     * Onclick, copy content to clipboard
     * @param {Event} event
     */
    const clickField = event => {
        const field = event.target
        field.select()
        document.execCommand('copy')
        setHasCopied(true)
      }

    const renderTextArea = () => <textarea onClick={clickField} value={content}
        className={hasCopied ? 'textarea has-fixed-size is-primary' : 'textarea has-fixed-size' }
        readOnly rows="3" placeholder={placeholder}></textarea>

    const renderInputField = () => <input
        onClick={clickField} className="input"
        type="text" value={ content } readOnly />

    const renderTypeOfField = () => {
        if (type === 'textarea') return renderTextArea()
        if (type === 'textfield') return renderInputField()
    }
 
    return (
            <Fragment>
                { renderTypeOfField() }
                { hasCopied && <p className="help is-primary">Copied to clipboard</p> }
            </Fragment> 
        )
}

export default CopyField