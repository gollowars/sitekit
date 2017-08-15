import { Router } from './modules/Router'
import { PageMachine } from './modules/page/PageMachine'
import App from './modules/App'

// page
import { Common } from './modules/page/Common'
import { Top } from './modules/page/top/Top'

// log
const Logger = require('debug')
const debug = Logger('main')

// log
if(WEBPACK_DEFINITION.log == false){
  Logger.enable("")
}else{
  Logger.enable("*,-engine.io-client:*,-socket.io-client:*,-socket.io-client,-socket.io-parser")
}

let nextPageLink = ''
class SiteManager {
  constructor(){
    this.init()
    this.addEvent()
  }
  init(){
    this.commonAction = new Common()
    this.pageMachine = new PageMachine({
      'top': new Top()
      // 'graph': new Graph(),
    })

    this.router = new Router({
      "/":()=>{
        this.pageMachine.changePage('top')
      }
      // "/sp/graph/":()=>{
      //   this.pageMachine.changePage('graph')
      // }
    })
  }

  addEvent(){
    $(window).on('pageshow',()=>{
      debug('pageshow')
      this.commonAction.run()
      this.router.action()

      this.addPjaxEvent()
    })
  }

  addPjaxEvent(){
    // pjax
    if($.support.pjax) {
      this.pjaxReset()

      $(document).on(App.event.pageTranslateStart,()=>{
        this.pageMachine.exitPage()
        this.commonAction.pageTranslateStart()
        .done(()=>{
          $(document).trigger(App.event.pageTranslateReady)
        })
      })

      $(document).on(App.event.pageTranslateReady,()=>{
        $.pjax({
          url: nextPageLink,
          container: '#pageContainer',
          fragment: '#pageContainer'
        })
      })

      $(document).on('pjax:end',()=>{
        this.router.action()
        this.pjaxReset()
      })

      $(document).on('pjax:timeout', function(e) {
        e.preventDefault()
      })

    }
  }

  pjaxReset(){
    $('a[data-pjax]').off('click')
    $('a[data-pjax]').on('click',(e)=>{
        e.preventDefault()
        nextPageLink = $(e.currentTarget).attr('href')
        $(document).trigger(App.event.pageTranslateStart)
      })
  }

}

new SiteManager()