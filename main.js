const debug = true

const electron = require('electron')
const fs = require('fs')

const app = electron.app
const Menu = electron.Menu
const BrowserWindow = electron.BrowserWindow
const dialog = electron.dialog
const ipcMain = electron.ipcMain
const shell = electron.shell

const path = require('path')
const url = require('url')

let mainWindow, menu, currentFile

function changeCodeFlavour (item) {
  mainWindow.webContents.send('changeCodeFlavour', item.href)
}

function changeDocumentFlavour (item) {
  mainWindow.webContents.send('changeDocumentFlavour', item.href)
}

function changePaperSize (item) {
  mainWindow.webContents.send('changePaperSize', item.href)
}

let template = [
{
  label: '&File',
  submenu: [ {
    label: '&New',
    accelerator: 'CmdOrCtrl+N',
    click: function (item, focusedWindow) {
      mainWindow.webContents.send('checkFileState', 'new')
    }
  }, {
    label: '&Open',
    accelerator: 'CmdOrCtrl+O',
    click: function (item, focusedWindow) {
      mainWindow.webContents.send('checkFileState', 'open')
    }
  }, {
    label: '&Close',
    accelerator: 'CmdOrCtrl+W',
    click: function (item, focusedWindow) {
      mainWindow.webContents.send('checkFileState', 'close')
    }
  }, {
    label: '&Save',
    accelerator: 'CmdOrCtrl+S',
    click: function (item, focusedWindow) {
      toggleSave()
    }
  }, {
    label: 'Save &As',
    accelerator: 'CmdOrCtrl+Shift+S',
    click: function (item, focusedWindow) {
      dialog.showSaveDialog({
        properties: ['Save QMarkdown File'],
        filters: [{
          name: 'QMarkdown File', extensions: ['md']
        }]
      }, function (files) {
        if (files) {
          mainWindow.webContents.send('save', files)
          currentFile = files
          mainWindow.webContents.send('setTitle', currentFile)
        }
      })
    }
  }, {
    type: "separator"
  }, {
    label: 'Export as &PDF',
    accelerator: 'CmdOrCtrl+P',
    click: function (item, focusedWindow) {
      dialog.showSaveDialog({
        properties: ['Export as PDF'],
        filters: [{
          name: "PDF Document", extensions: ['pdf']
        }]
      }, function (files) {
        if (files) {
          mainWindow.webContents.send('exportPDF', files)
        }
      })
    }
  }, {
    label: 'Export as HTML',
    accelerator: 'CmdOrCtrl+H',
    click: function (item, focusedWindow) {
      dialog.showSaveDialog({
        properties: ['Export as HTML'],
        filters: [{
          name: "HTML Document", extensions: ['html']
        }]
      }, function (files) {
        if (files) {
          mainWindow.webContents.send('exportHTML', files)
        }
      })
    }
  }]
}, {
  label: '&Edit',
  submenu: [{
    label: '&Undo',
    accelerator: 'CmdOrCtrl+Z',
    role: 'undo'
  }, {
    label: '&Redo',
    accelerator: 'Shift+CmdOrCtrl+Z',
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    label: '&Cut',
    accelerator: 'CmdOrCtrl+X',
    role: 'cut'
  }, {
    label: '&Copy',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  }, {
    label: '&Paste',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  }, {
    label: 'Select &All',
    accelerator: 'CmdOrCtrl+A',
    role: 'selectall'
  }]
}, {
  label: '&Flavour',
  submenu: [{
    label: '&Document',
    submenu: []
  }, {
    label: '&Code',
    submenu: []
  }]
}, {
  label: '&Paper',
  submenu: [{
    label: '&Auto Height',
    type: "checkbox",
    checked: true,
    click: function (item) {
      mainWindow.webContents.send("setAutoHeight", item.checked ? "./src/css/autoheight.css" : "");
    }
  }, {
    label: 'Page &Options',
    click: function (item) {
      mainWindow.webContents.send('toggleSideBar')
    }
  }, {
    type: "separator"
  }]
}, {
  label: '&Element',
  submenu: [{
    label: '&Image',
    accelerator: 'CmdOrCtrl+I',
    click: function (item) {
      dialog.showOpenDialog({
        properties: ['Insert image'],
        filters: [{
          name: 'Image', extensions: ['jpg', 'jpeg', 'gif', 'png', 'svg', 'bmp', 'ico']
        }]
      }, function (files) {
        if (files && files.length > 0) {
          files = files[0]
          if (files) {
            mainWindow.webContents.send('insertImage', files);
          }
        }
      })
    }
  }]
}, {
  label: '&View',
  submenu: [{
    label: 'Toggle &Fullscreen',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Ctrl+Command+F'
      } else {
        return 'F11'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
      }
    }
  }, {
    type: 'checkbox',
    label: 'Show &Preview',
    accelerator: 'CmdOrCtrl+F10',
    checked: true,
    click: function (item) {
      mainWindow.webContents.send('showPreview', item.checked)
    }
  }, {
    type: 'checkbox',
    label: '&Immersion',
    accelerator: 'CmdOrCtrl+F9',
    checked: false,
    click: function (item) {
      mainWindow.webContents.send('immersion', item.checked)
    }
  }]
}, {
  label: '&About',
  role: 'about',
  submenu: [{
    label: 'About &Author',
    click: function () {
      shell.openExternal('http://koishi.top')
    }
  }, {
    label: 'About &QMarkdown',
    click: function () {
      shell.openExternal('https://github.com/xlnx/QMarkdown')
    }
  }]
}]

if (debug) {
  template[5].submenu.push({
    label: '&Reload',
    accelerator: 'CmdOrCtrl+R',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        if (focusedWindow.id === 1) {
          BrowserWindow.getAllWindows().forEach(function (win) {
            if (win.id > 1) {
              win.close()
            }
          })
        }
        focusedWindow.reload()
      }
    }
  }, {
    label: 'Toggle &Devpanel',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Alt+Command+I'
      } else {
        return 'Ctrl+Shift+I'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.toggleDevTools()
      }
    }
  })
}

function initMenu () {
  initCodeFlavour()
}

function getShortName(file) {
  return /^[^\.]+/g.exec(file)[0]
}

function initCodeFlavour() {
  fs.readdir("./flavour/code/", function (err, files) {
    if (err) {
      throw err
    } else {
      !function iter(i) {
        if (i == files.length) {
          initDocumentFlavour()
        } else {
          let filedir = path.join("./flavour/code/", files[i])
          fs.stat(filedir, function (err, stats) {
            if (err) {
              throw err
            } else {
              if (stats.isFile()) {
                template[2].submenu[1].submenu.push({
                  label: getShortName(files[i]),
                  href: filedir,
                  click: changeCodeFlavour
                })
              }
              iter(i + 1)
            }
          })
        }
      } (0)
    }
  })
}

function initDocumentFlavour () {
  fs.readdir("./flavour/", function (err, files) {
    if (err) {
      throw err
    } else {
      !function iter(i) {
        if (i == files.length) {
          initPaper()
        } else {
          let filedir = path.join("./flavour/", files[i])
          fs.stat(filedir, function (err, stats) {
            if (err) {
              throw err
            } else {
              if (stats.isFile()) {
                template[2].submenu[0].submenu.push({
                  label: getShortName(files[i]),
                  href: filedir,
                  click: changeDocumentFlavour
                })
              }
              iter(i + 1)
            }
          })
        }
      } (0)
    }
  })
}

function initPaper () {
  fs.readdir("./paper/", function (err, files) {
    if (err) {
      throw err
    } else {
      !function iter(i) {
        if (i == files.length) {
          doInitMenu()
        } else {
          let filedir = path.join("./paper/", files[i])
          fs.stat(filedir, function (err, stats) {
            if (err) {
              throw err
            } else {
              if (stats.isFile()) {
                template[3].submenu.push({
                  label: getShortName(files[i]),
                  href: filedir,
                  click: changePaperSize
                })
              }
              iter(i + 1)
            }
          })
        }
      } (0)
    }
  })
}

function doInitMenu () {
  menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

function saveFile (event, file, dir, after) {
  fs.writeFile(dir, file, function (err) {
    if (err) {
      throw err
    } else {
      if (after) {
        switch (after) {
          case "close": closeFile(); break
          case "open": openFile(); break
          default: {
            throw "invalid operation"
          }
        }
      }
    }
  })
}

function openFile () {
  dialog.showOpenDialog({
    properties: ['Open Markdown File'],
    filters: [{
      name: 'Markdown File', extensions: ['md']
    }]
  }, function (files) {
    if (files && files.length > 0) {
      files = files[0]
      if (files) {
        mainWindow.webContents.send('open', files)
        currentFile = files
        mainWindow.webContents.send('setTitle', currentFile)
      }
    }
  })
}

function closeFile () {
  mainWindow.webContents.send('open', null)
  currentFile = null
  mainWindow.webContents.send('setTitle', currentFile)
}

function toggleSave(after) {
  if (currentFile) {
    mainWindow.webContents.send('save', currentFile, after)
  } else {
    dialog.showSaveDialog({
      properties: ['Save QMarkdown File'],
      filters: [{
        name: 'QMarkdown File', extensions: ['md']
      }]
    }, function (files) {
      if (files) {
        mainWindow.webContents.send('save', files, after)
        currentFile = files
        mainWindow.webContents.send('setTitle', currentFile)
      }
    })
  }
}

ipcMain.on('checkFileState', function (event, channel, state) {
  switch (channel) {
    case 'open': {
      if (!state[0] || !state[1]) {
        dialog.showMessageBox({
          type: 'info',
          title: 'Confirm',
          message: !state[0] ? "Save current file before close?" : "Update current file to QMarkdown style before close?",
          buttons: ['Yes', 'No', 'Cancel']
        }, function (index) {
          switch (index) {
            case 0: {
              toggleSave('open')
            } break;
            case 1: {
              openFile()
            }
          }
        })
      } else {
        openFile()
      }
    } break;
    case 'close': case 'new': {
      if (!state[0] || !state[1]) {
        dialog.showMessageBox({
          type: 'info',
          title: 'Confirm',
          message: !state[0] ? "Save current file before close?" : "Update current file to QMarkdown style before close?",
          buttons: ['Yes', 'No', 'Cancel']
        }, function (index) {
          switch (index) {
            case 0: {
              toggleSave('close')
            } break;
            case 1: {
              closeFile()
            }
          }
        })
      } else {
        closeFile()
      }
    } break;
    default: {
      throw "unknown command";
    }
  }
})

ipcMain.on('save', saveFile)

ipcMain.on('exportHTML', saveFile)

ipcMain.on('exportPDF', function (event, options, dir) {
  mainWindow.webContents.printToPDF(options, function (error, data) {
    if (error) {
      throw error
    }
    fs.writeFile(dir, data, function (error) {
      if (error) {
        throw error
      }
      shell.openExternal('file://' + dir)
    })
  })
})

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  initMenu();

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () {
    // mainWindow.webContents.send('checkFileState', 'close')
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
