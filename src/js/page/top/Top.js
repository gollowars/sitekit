import { Page } from '../../site/Page'
import App from '../../site/App'

const Logger = require('debug')
const debug = Logger('Top')

export class Top extends Page {
  enter(){
    debug('Top:Enter!!')
    this.addEvent()

    $(document).trigger(App.event.pageTranslateEnd)
  }

  addEvent(){
  }



  exit(){
    debug('Top:Exit!!')
  }

}