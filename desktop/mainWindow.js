
const path =  require('path')

const { BrowserWindow, app } = require("electron");




let mainWindow = new BrowserWindow({
    width: 300,
    height: 600,
    alwaysOnTop : true,
    
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      
    }
  });
  
 
   
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
   mainWindow.webContents.openDevTools()
  

//   // Automatically open Chrome's DevTools in development mode.
//   if (!app.isPackaged) {
//     mainWindow.webContents.openDevTools();
//   }
 
 
mainWindow.on('close', (e)=>{
  app.quit()
})

module.exports = mainWindow;

