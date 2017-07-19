import App from './App'
const Logger = require('debug')
const debug = Logger('PageMachine')

export class PageMachine {
  constructor(pages){
    debug('PageMachine.init')

    this.pages = pages
    this.currentPage = null
    this.init()
  }

  init(){
    debug('PageMachine.init')
  }

  changePage(pageName){
    if(this.currentPage != null && this.currentPage.exited == false){
      this.currentPage.exit()
      this.currentPage.exited = false
    }

    if(this.pages.hasOwnProperty(pageName)){
      this.currentPage = this.pages[pageName]
      this.currentPage.enter()
    }else{
      throw new Error('That page is not registered')
    }
  }

  exitPage(){
    if(this.currentPage != null && this.currentPage.exited == false){
      this.currentPage.exit()
      this.currentPage.exited == false
    }
  }

  enterPage(pageName){
    if(this.pages.hasOwnProperty(pageName)){
      this.currentPage = this.pages[pageName]
      this.currentPage.enter()
    }else{
      throw new Error('That page is not registered')
    }
  }

}

