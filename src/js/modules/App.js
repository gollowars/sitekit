import Config from "../Config"
const Logger = require('debug')
const debug = Logger('App')

class App {

  constructor(){
    this.setCurrentPath()
    this.devFlag = false
    this.event = {}
    this.event.pageTranslateStart = 'PAGE_TRANSLATE_START'
    this.event.pageTranslateReady = 'PAGE_TRANSLATE_READY'
    this.event.pageTranslateEnd = 'PAGE_TRANSLATE_END'
  }
  setCurrentPath(){
    this.currentPath = window.location.pathname.replace(new RegExp("(?:\\\/+[^\\\/]*){0," + ((this.place || 0) + 1) + "}$"), "/")
    if(this.currentPath.indexOf(Config.devPath) != -1){
      this.currentPath = this.currentPath.replace(Config.devPath,"").replace(" ")
      App.devFlag = true
    }
    debug("this.currentPath : ",this.currentPath)
  }
}

export default new App()