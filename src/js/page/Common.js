import App from '../site/App'
import { Loading } from '../site/loading/Loading'
import SlideMenu from '../site/slidemenu/SlideMenu'
const Logger = require('debug')
const debug = Logger('Common')

export class Common {
  constructor() {
    debug("Common.intialize");

    this.addEvent()
  }

  run() {
    debug("Common.run");

    this.menu = new SlideMenu('#gnav')
    this.loading = new Loading()

  }

  addEvent(){
    $('#navToggle').on('click',(e)=>{this.navClickHandler(e)})
    $(document).on(App.event.pageTranslateEnd,()=>{this.pageTranslateEnd()})
    $(document).on(App.event.pageTranslateStart,()=>{this.navClose()})
    
  }

  // nav
  navClickHandler(){
    if($('#navToggle').hasClass('is-active')){
      this.navClose()
    }else{
      this.navOpen()
    }
  }

  navClose(){
    this.menu.close()
    $('#navToggle').removeClass('is-active')
  }
  navOpen(){
    this.menu.open()
    $('#navToggle').addClass('is-active')
  }

  pageTranslateStart(){
    debug("Common.pageTranslateStart");
    let d = $.Deferred()

    this.loading.showStart()
    .done(()=>{
      d.resolve()
    })

    return d.promise()
  }

  pageTranslateEnd(){
    debug("Common.pageTranslateEnd");
    let d = $.Deferred()

    this.loading.showEnd()
    .done(()=>{
      d.resolve()
    })

    return d.promise()
  }
  
}
