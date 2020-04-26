const { app, BrowserWindow, dialog, remote } = require('electron')
const ipc = require('electron').ipcMain
const { exec } = require('child_process')
const path = require('path')
const url = require('url')

const CICDB_PORT = 5000
// const FRONTEND_PORT = 3000
// const USER_DATA_PATH = (app || remote.app).getPath('userData')
// const USER_DATA_PATH = app.getPath('userData')
// console.log(USER_DATA_PATH)

// GLOBAL
let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  mainWindow.setTitle('Outpost')
  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '/../public/index.html'),
        protocol: 'file:',
        slashes: true
      })
  )
  // mainWindow.removeMenu()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}


function createServerWindow (port) {
    try {
      const USER_DATA_PATH = (app || remote.app).getPath('userData')
      const ls = exec(`npm run --s start-api Hejs`,
                  err => {
                      if (err) {
                        console.log(err)
                      }
      })
      ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
      })
    
      mainWindow.on('closed', () => {
        ls.kill()
      })

    } catch (e) {
      console.log(`Error: ${e}`)
  
    }
}



app.on('ready', () => {
  createWindow()
  createServerWindow(CICDB_PORT)

})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }

})