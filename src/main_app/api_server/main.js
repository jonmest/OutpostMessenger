const port = process.argv[2]
const userDataPath = process.argv[3]

process.env.USER_DATA_PATH = userDataPath

if (port === undefined) {
    const error = new Error("Arguments are required.")
    delete error.stack
    throw error
}

require('./server')(port, () => {
    console.log(`CICDB server running on http://localhost:${port}.`)
})