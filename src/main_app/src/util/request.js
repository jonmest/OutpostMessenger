/**
 * Post to resource
 * @param {string} url 
 * @param {string} token 
 * @param {object} bodyObject 
 */
const post = async (url, token, bodyObject) => {
    const options = (token !== null) ?
        {
        method: 'POST',
        mode: 'cors',
        headers: new Headers({
            'Authorization': token,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(bodyObject)
        } :
        {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(bodyObject)
         }

    return fetch(
        url, 
        options
        )
    .then(res => res.json())
    .catch(error => {
        console.log('Failed to post.')
    })
}

/**
 * Get resource
 * (tailored to CICDB API)
 * @param {string} url 
 * @param {string} token 
 */
const get = async (url, token) => {
    return fetch(
        url, 
        {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                'Authorization': token,
                'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .catch(error => {
        console.log(error)
    })
}

export { post, get }