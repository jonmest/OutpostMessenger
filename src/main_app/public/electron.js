const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
const { exec } = require('child_process');

const CICDB_PORT = 5000

const USER_DATA_PATH = (app || remote.app).getPath('userData')

let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({ 
        width: 1200, 
        height: 800,
        icon: ""
    })

    

    mainWindow.setTitle('Outpost')
    mainWindow.toggleDevTools()

    mainWindow.loadURL(
        isDev
        ? "http://localhost:3000"
        : `file://${path.join(__dirname, "../build/index.html")}`
    );
    mainWindow.on("closed", () => {
      app.quit()
    });
}

function createServerWindow (port) {
    try {
      const ls = exec(`npm run --s start-api ${port} ${USER_DATA_PATH}`,
                  (err, stdout, stderr) => {
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

app.on("ready", () => {
  createServerWindow(5000)
  createWindow()
});
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
    app.quit();
    }
});

app.on("activate", () => {
    if (mainWindow === null) {
    createWindow();
    createServerWindow(5000)
    }
});