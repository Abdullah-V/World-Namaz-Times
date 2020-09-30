var electron = require("electron")
var url = require("url")
var path = require("path")
const { type } = require("os")

var { app, BrowserWindow, Menu, ipcMain, globalShortcut,webContents,dialog } = electron



var mainWindow


app.on("ready",() => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        hasShadow:true,
        title:"World Namaz Times",
    }),

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname,"main.html"),
            protocol:"file",
            slashes:true,
            
        })
    )

var mainMenu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(mainMenu)




// Handlers

ipcMain.on("UlkeID",(err,data) => {
    console.log("backendde datani tuttum: ",data);
    mainWindow.loadURL(`file://${__dirname}/seherler.html`).then(() => {
    mainWindow.webContents.send("olkekodugelir",data)
})
})


ipcMain.on("SehirID",(err,data) => {
    mainWindow.loadURL(`file://${__dirname}/ilceler.html`).then(() => {
    mainWindow.webContents.send("seherkodugelir",data)
})
})



ipcMain.on("routeToHome",(err,data) => {
    mainWindow.loadURL(`file://${__dirname}/main.html`)
})


ipcMain.on("IlceID",(err,data) => {
    mainWindow.loadURL(`file://${__dirname}/vaxtlar.html`).then(() => {
    mainWindow.webContents.send("ilcekodugelir",data)
    })
})








// var menuTemplate = [
//     {
//         label:"Menu",
//         submenu:[
//             {
//                 label:"Toggle Console",
//                 accelerator:"Ctrl + O",
//                 click(item,focusedWin){
//                     focusedWin.toggleDevTools()
//                 }
//             },
//             {
//                 label:"Reload",
//                 accelerator:"Ctrl + R",
//                 role:"reload"
//             },
//             {
//                 type:"separator"
//             },
//             {
//                 label:"Quit",
//                 accelerator:"Ctrl + Q",
//                 role:"quit"
//             }
//         ]
//     }
// ]



})



var menuTemplate = [
    {
        label:"Menu",
        submenu:[
            {
                type:"separator"
            },
            {
                label:"Quit",
                role:"quit"
            },
            {
                type:"separator"
            }
        ]
    }
]


