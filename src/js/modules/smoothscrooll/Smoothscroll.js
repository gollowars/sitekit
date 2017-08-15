let INDETIFY_NAME = ".SMOOTH_SCROLL"

export default class SmoothScroll {
  constructor(ele){
    this.ele = ele
    this.init()
  }

  init(){

    this.addEvent()
  }

  addEvent(){
    $(this.ele).on('click'+INDETIFY_NAME,(e)=>{this.clickSmoothScroll(e)})
  }

  clickSmoothScroll(e){
    e.preventDefault()
    this.smoothScroll($(e.currentTarget).attr("href"))
  }

  smoothScroll(url){
    let diff = 50
    let speed = 900
    if(url.indexOf("?id=") != -1){
        let id = url.split("?id=")
        let $target = $('#' + id[id.length - 1])
        if($target.length){
            let pos = $target.offset().top - diff
            $("html, body").animate({scrollTop:pos}, speed,'easeInOutQuint')
        }
    }
  }

  destroy(){
    $(this.ele).off('click'+INDETIFY_NAME)
  }
}