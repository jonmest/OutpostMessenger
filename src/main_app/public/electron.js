const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const { exec } = require('child_process');
const portfinder = require('portfinder')
const USER_DATA_PATH = (app || remote.app).getPath('userData')

const APP_PATH = app.getAppPath()

let mainWindow;
function createWindow(port) {
    mainWindow = new BrowserWindow({ 
        width: 1200, 
        height: 800,
        icon: "",
        webPreferences: {
          nodeIntegration: false,
          contextIsolation: true
        }
    })
    // mainWindow.removeMenu()
    mainWindow.setTitle('Outpost Messenger')
    mainWindow.maximize()
    mainWindow.loadURL(
        isDev
        ? `http://localhost:3000/?port=${port}`
        : `file://${path.join(__dirname, `../build/index.html?port=${port}`)}`
    )
    mainWindow.on("closed", () => {
      app.quit()
    })


    mainWindow.show()
}

function createServerWindow (port) {
    try {
      const ls = exec(`npm run --s start --prefix /usr/local/etc/outpost/api_server ${port} ${USER_DATA_PATH}`,
                  (err, stdout, stderr) => {
                      if (err) {
                        console.log(err)
                      }

                      if (stderr) {
                        console.log(stderr)
                      }

                      if (stdout) {
                        console.log(stdout)
                      }
                    })

      ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
      })
    

    } catch (e) {
      console.log(`Error: ${e}`)  
    }
}

app.on("ready", () => {
  portfinder.getPort((err, port) => {
    createServerWindow(port)
    createWindow(port)

  })
})


app.on("quit", () => {
  console.log("Quitting...")
})

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
    app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
      portfinder.getPort((err, port) => {
        createServerWindow(port)
        createWindow(port)
    
      })
    }
});
