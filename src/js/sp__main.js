import Config from './Config'
import { Router } from './site/Router'
import { PageMachine } from './site/PageMachine'
import App from './site/App'

// page
import { Common } from './page/Common'
import { Top } from './page/top/Top'

let nextPageLink = ''
class SiteManager {
  constructor(){
    this.init()
    this.addEvent()
  }
  init(){
    // Logger
    Logger.useDefaults()

    if(!Config.logOn) {
      Logger.setLevel(Logger.WARN)
      Logger.setLevel(Logger.OFF)
    }

    this.commonAction = new Common()
    this.pageMachine = new PageMachine({
      'top': new Top()
      // 'graph': new Graph(),
    })

    this.router = new Router({
      "/sp/":()=>{
        this.pageMachine.changePage('top')
      }
      // "/sp/graph/":()=>{
      //   this.pageMachine.changePage('graph')
      // }
    })
  }

  addEvent(){
    $(window).on('pageshow',()=>{
      Logger.debug('pageshow')
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