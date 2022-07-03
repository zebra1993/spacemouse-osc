const osc = require('osc')
const oUDPport = 0;
const oServerIP = "";
const lib = require('./mainFunctions')
const electron = require('electron')
const { ipcMain } = require('electron')
const nativeTheme = electron.nativeTheme;
nativeTheme.themeSource = 'dark';
const { app, BrowserWindow } = require('electron');
const mainFunctions = require('./mainFunctions');
const { dialog } = require('electron')
const { webContents } = require('electron')
var translateX = 0
var translateY = 0
var translateZ = 0
var rotateX = 0
var rotateY = 0
var rotateZ = 0
const appVersion = app.getVersion()


ipcMain.on('sendUDPport', (event, oUDPport) => {
  console.log('Port de reception OSC:', oUDPport);
  oscCli = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: Number(oUDPport),
    metadata: true
  })
  oscCli.open()
  win.webContents.send('udpportOK');
})

function createWindow() {

    let win = new BrowserWindow({
    width: 1366,
    height: 768,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,

    },
    icon: `${__dirname}/assets/icons/64x64.png`
    })
    win.setMenu(null);
    win.loadFile('src/index.html')
    win.webContents.openDevTools()


    oscCli = new osc.UDPPort({
        localAddress: "0.0.0.0",
        localPort: 7007,
        metadata: true
    })
    oscCli.open()





    
    win.autoHideMenuBar = "true"
  win.menuBarVisible = "false"
  win.webContents.on('did-finish-load', () => {
  console.log("appVersion :", appVersion);
  win.webContents.send('appVersion', app.getVersion())

  })

  ipcMain.on('sendOSCserverIP', (event, oServerIP) => {
    console.log('IP du server OSC distant:', oServerIP);

    ipcMain.on('sendOSCserverPort', (event, oServerPort) => {
      console.log('Port du server OSC distant:', oServerPort);
      win.webContents.send('oServerOK');
    })
  }) 
  
async function main(){
sm = require("./lib.js");
iteration = 1
console.log ("operationnal1");
sm.spaceMice.onData = mouse => {
    console.clear();
//    console.log ("operationnal2");
datas = JSON.stringify(mouse.mice[0], null, 2);
translateX = mouse.mice[0].translate.x;
translateY = mouse.mice[0].translate.y;
translateZ = mouse.mice[0].translate.z;
rotateX = mouse.mice[0].rotate.x;
rotateY = mouse.mice[0].rotate.y;
rotateZ = mouse.mice[0].rotate.z;
buttons = mouse.mice[0].buttons;
win.webContents.send("buttons",buttons)

sendFrequency = 3

 if (iteration<sendFrequency){
     iteration = iteration+1
 }
 else{


    console.log(datas);
    console.log(translateX,translateY,translateZ,rotateX,rotateY,rotateZ)
    win.webContents.send("incoming_datas", translateX,translateY,translateZ,rotateX,rotateY,rotateZ)
    iteration = 0
  }
}

ipcMain.on("ok_to_send",(event,prefix,index,attr,value) =>{
  console.log("retour de gui : ", prefix + "/" + index + attr + " " + value)
})

//win.webContents.send("incoming_datas", translateX,translateY,translateZ,rotateX,rotateY,rotateZ)
}
main()
}

app.whenReady().then(createWindow)



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})