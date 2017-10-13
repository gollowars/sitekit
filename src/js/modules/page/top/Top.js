import { Page } from '../Page'
import App from '../../App'
import io from 'socket.io-client'

const Logger = require('debug')
const debug = Logger('Top')
const socket = io("http://192.168.4.63:5000")

export class Top extends Page {
  enter(){
    debug('Top:Enter!!')
    this.addEvent()


    socket.emit('fuck', 'fuck value!!')

    $(document).trigger(App.event.pageTranslateEnd)
  }

  addEvent(){
  }



  exit(){
    debug('Top:Exit!!')
  }

}