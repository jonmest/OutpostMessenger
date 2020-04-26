const { getOutpost, setOutpost } = require('../db_interface/index')
module.exports = {
    getOutpost: async (request, reply) => {
        try {
            const id = request.query.id
            if (id === undefined) throw new Error()
        
            const success = await getOutpost(id, request.app.locals.db)
            reply.send({
                result: 'success',
                data: await success
            })
        } catch {
            reply.send({
                result: 'failure'
            })
        }
    },
    postOutpost: async (request, reply) => {
        const { id, publicKey } = request.body
        const success = setOutpost(id, publicKey, request.app.locals.db)
    
        if (success) {
            reply.send({
                result: 'success'
            })
        } else {
            reply.send({
                result: 'failure'
            })
        }
    }
}