const electron = require('electron');
const { app } = electron;
const MainWindow = require('./app/main_window.js');

const options = {
    webPrefrences: {
        nodeIntegration: true,
        backgroundThorottling: false
    }
    ,
    width: 1350,
    height: 750,
    resizable: false
}


app.on('ready', () => {
    new MainWindow(options, `file://${__dirname}/src/index.html`);
})