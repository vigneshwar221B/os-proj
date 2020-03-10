const { app, BrowserWindow, ipcMain } = require('electron')

let runPy = data =>
	new Promise(function(success, nosuccess) {
		const { spawn } = require('child_process')
		const pyprog = spawn('python', ['./script.py', data])

		pyprog.stdout.on('data', function(data) {
			success(data)
		})

		pyprog.stderr.on('data', data => {
			nosuccess(data)
		})
	})

let win

function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
	})

	// and load the index.html of the app.
	win.loadFile('index.html')
}

app.whenReady().then(createWindow)

ipcMain.on('download', (e, data) => {
	runPy(data)
		.then(res => {
			if (res.toString().trim() == 'done') {
				win.webContents.send('done', 'okk')
				console.log('finished downloading')
			}
		})
		.catch(err => {
			console.log(err)
		})
})
