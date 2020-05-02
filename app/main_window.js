const electron = require('electron') ; 

const { BrowserWindow }  = electron ;

class MainWindow extends BrowserWindow { 
    constructor( options , url ) {
        super(options); 
        // this.on('blur' , this.onBlur.bind(this)) ; 
        this.loadURL(url) ; 
    }
   
}

module.exports = MainWindow ; 