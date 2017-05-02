import Config from "../Config"
import App from "./App"

export class Router {
  constructor(actions) {
    Logger.debug("Router.intialize");
    this.actions = actions
    this.commonAction = null
    this.place = 0
  }

  action(){
    App.setCurrentPath()
    let currentKey = Object.keys(this.actions).filter((k)=> {
      Logger.debug("k:",k)
      Logger.debug("App.currentPath:",App.currentPath)
      if(App.currentPath == k) return true}
    )[0]

    Logger.debug("Current Action Key is : ",currentKey)
    if(currentKey){
      this.actions[currentKey]()
    }
  }
    
}