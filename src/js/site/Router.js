import Config from "../Config"
import App from "./App"
const Logger = require('debug')
const debug = Logger('Router')

export class Router {
  constructor(actions) {
    debug("Router.intialize");
    this.actions = actions
    this.commonAction = null
    this.place = 0
  }

  action(){
    App.setCurrentPath()
    let currentKey = Object.keys(this.actions).filter((k)=> {
      debug("k:",k)
      debug("App.currentPath:",App.currentPath)
      if(App.currentPath == k) return true}
    )[0]

    debug("Current Action Key is : ",currentKey)
    if(currentKey){
      this.actions[currentKey]()
    }
  }
    
}