module.exports = (port, callback) => {


    // Require the framework and instantiate it
  const server = require('express')({
    logger: true
  })

  server.locals.accessTokenSecret = require('crypto').randomBytes(18).toString('base64')

  try {
    /**
    * DB
      */
    const path = require('path')
    const dbPath = path.resolve(process.env.USER_DATA_PATH, 'outpost.db')
    var sqlite3 = require('@journeyapps/sqlcipher').verbose()
    const db = new sqlite3.Database(dbPath)
    // ↓↓↓ Very important, routes won't work without this
    server.locals.db = db
    // ↑↑↑
  } catch (e) {
    console.log(e)
  }
  /**
   * Misc. middleware
   */
  server.use(require('body-parser').json())

  const cors = require('cors')
  server.use(cors())
  // server.use(require('./middlewares/restrictOrigin'))

  /**
   * Mount router
   */
  server.use('/', require('./routes'))

  /**
   * Listen to port argument
   */
  if (process.env.NODE_ENV !== 'test') {
    server.listen(port, 'localhost')
  }
  
  
  callback()

  return server
}