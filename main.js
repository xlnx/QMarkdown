const electron = require('electron')
const fs = require('fs')

const app = electron.app
const Menu = electron.Menu
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

let mainWindow, menu

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
  label: 'Edit',
  submenu: [{
    label: 'Undo',
    accelerator: 'CmdOrCtrl+Z',
    role: 'undo'
  }, {
    label: 'Redo',
    accelerator: 'Shift+CmdOrCtrl+Z',
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    label: 'Cut',
    accelerator: 'CmdOrCtrl+X',
    role: 'cut'
  }, {
    label: 'Copy',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  }, {
    label: 'Paste',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  }, {
    label: 'Select All',
    accelerator: 'CmdOrCtrl+A',
    role: 'selectall'
  }]
}, {
  label: 'Flavour',
  submenu: [{
    label: 'Document',
    submenu: []
  }, {
    label: 'Code',
    submenu: []
  }]
}, {
  label: 'Paper',
  submenu: []
}, {
  label: 'View',
  submenu: [{
    label: 'Reload',
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
    label: 'Toggle Fullscreen',
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
    label: 'Toggle Devpanel',
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
  }]
}, {
  label: 'About',
  role: 'about',
  submenu: [{
    label: 'About Author',
    click: function () {
      electron.shell.openExternal('http://koishi.top')
    }
  }, {
    label: 'About QMarkdown',
    click: function () {
      electron.shell.openExternal('https://github.com/xlnx/QMarkdown')
    }
  }]
}]

function initMenu () {
  initCodeFlavour()
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
                template[1].submenu[1].submenu.push({
                  label: files[i],
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
                template[1].submenu[0].submenu.push({
                  label: files[i],
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
                template[2].submenu.push({
                  label: files[i],
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

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  initMenu();

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', function () {
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
