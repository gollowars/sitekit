import { Page } from '../Page'
import App from '../App'

export class Top extends Page {
  enter(){
    Logger.debug('Top:Enter!!')
    this.addEvent()

    $(document).trigger(App.event.pageTranslateEnd)

  }

  addEvent(){
  }



  exit(){
    Logger.debug('Top:Exit!!')
  }

}