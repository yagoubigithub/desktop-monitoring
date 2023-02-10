const fileIcon = require("extract-file-icon");
const activeWindow = require("active-win");

const Jimp = require("jimp");

const fs = require("fs");
const path = require("path");


const  io  =  require('socket.io-client');
const { ipcMain } = require("electron");
 
const socket = io('http://localhost:3000');

const mainWindow = require("./mainWindow");



ipcMain.on(":give-active-window" , ()=>{
  
  let start = Date.now();
    
   

  (async () => {
      
      activeWindow().then(currentWin=>{
        if (!currentWin) return;
      
        
        const filename = currentWin.owner.name.split(".")[0];
       
        
     





          const icon = fileIcon(currentWin.owner.path, 32);
          const base64icon = new Buffer(icon).toString('base64');
         

       //   socket.emit ('currentWin', {icon: base64icon, filename , title : currentWin.title});


        
       mainWindow.webContents.send(":get-active-window"  , {icon: base64icon, filename , title : currentWin.title})





        ///calcul time spent
        let timeTaken = Date.now() - start;
       // console.log("Total time taken : " + timeTaken + " milliseconds");

      }).catch(err=>{
        console.log(err)
      })

    

     

      
   
    })();
})