function SlideMenu() {

  // nav
  let navTargetClass = 'slidemenu-nav'
  let navActiveClass = 'slidemenu-nav--active'

  // container
  let containerClasss = 'body,html'
  let $targetContainer = null
  let containerFixedClass = 'slidemenu-fixed'
  let scrollValue = 0
  // animation

  function SlideMenuObj(targetElement = '.' + navTargetClass){
    this.$target = $(targetElement)
    $targetContainer = $(containerClasss)

    init()
  }

  function init(){
    console.log('SlideMenu::initialize')

  }

  SlideMenuObj.prototype.open = function(){

    scrollValue = $(window).scrollTop()

    if(!this.$target.hasClass(navActiveClass)){
      this.$target.addClass(navActiveClass)
    }

    if(!$targetContainer.hasClass(containerFixedClass)){
      $targetContainer.addClass(containerFixedClass).css({'top':-scrollValue})
    }
    
  }

  SlideMenuObj.prototype.close = function(){
    if(this.$target.hasClass(navActiveClass)){
      this.$target.removeClass(navActiveClass)
    }

    if($targetContainer.hasClass(containerFixedClass)){
      $targetContainer.removeClass(containerFixedClass).scrollTop(scrollValue)
    }

  }



  return SlideMenuObj
}


export default SlideMenu()