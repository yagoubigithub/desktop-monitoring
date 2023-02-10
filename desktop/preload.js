// Copyright 2022-2023 eContriver, LLC
const {contextBridge, ipcRenderer} = require('electron');

let interval = null;
contextBridge.exposeInMainWorld('electron', {

    start: (task , td2 , callback) => {
        interval = setInterval(()=>{
            ipcRenderer.send(":give-active-window" )
     
        } , 1000);
        ipcRenderer.on(":get-active-window" , callback )

        return () => {
            ipcRenderer.removeListener(":get-active-window" , callback);
        };
     },
     stop: (task  , callback) => {
       
       clearInterval(interval);
       return () => {
        ipcRenderer.removeListener(":get-active-window" , callback);
    };
     },
     startRecordingMouse : (callback)=>{
        ipcRenderer.send(":start-recording-mouse" )
        ipcRenderer.on(":mouse-click" , callback )
        return () => {
            ipcRenderer.removeListener(":mouse-click" , callback);
        };
     }
     ,
     startRecordingKeyboard : (callback)=>{
       
        ipcRenderer.send(":start-recording-keyboard" )
        ipcRenderer.on(":keyboard-press" , callback )
        return () => {
            ipcRenderer.removeListener(":keyboard-press" , callback);
        };
     }

})
    