import App from '../App'

let UNIQUE_ID = 0

export class Page {
  constructor(){
    this.exited = false
    this.id = UNIQUE_ID
    UNIQUE_ID++
  }

  enter(){
    this.exit = false
    this.prepare()
    .done(()=>{
      $(document).trigger(App.event.pageTranslateEnd)
    })
  }

  prepare(){
    let d = $.Deferred()
    d.resolve()
    return d.promise()
  }
  exit(){
    this.exit = true
  }

}

