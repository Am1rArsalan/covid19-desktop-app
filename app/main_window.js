const electron = require('electron');

const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
    constructor(options, url) {
        super(options);
        this.loadURL(url);
    }

}

module.exports = MainWindow; 