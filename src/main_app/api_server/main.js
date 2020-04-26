const port = process.argv[2]
const userDataPath = process.argv[3]
console.log(process.argv)
process.env.USER_DATA_PATH = userDataPath

console.log("THE PATH IS:")
console.log(userDataPath)

if (port === undefined) {
    const error = new Error("Arguments are required.")
    delete error.stack
    throw error
}

require('./server')(port, () => {
    console.log(`CICDB server running on http://localhost:${port}.`)
})