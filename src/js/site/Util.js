export let transitionEnd = ['webkitTransitionEnd','oTransitionEnd','otransitionend','transitionend'].join(' ')

export function animationPromise($target){
  let promise = new Promise(function(resolve){
    $target.removeClass('prepare')
    $target.on(transitionEnd,function(){
      resolve()
    })
  })
  return promise
}

export function getUrlVars(url)
{
    let vars = [], max = 0, hash = "", array = "";

    if(url.indexOf("?") < 0){return false}

    hash  = url.split("?")[1].split('&')
    max = hash.length

    for (let i = 0; i < max; i++) {
        array = hash[i].split('=')
        vars[array[0]] = array[1]
    }
    return vars;
}

// load
export function preloadImg(url){

  return new Promise(function(resolve,reject){
    Logger.debug('=================')
    let img = document.createElement('img')
    Logger.debug('preload url:',url)
    if(url == ''){
      resolve(img)
      return
    }

    img.src = url

    Logger.debug('url :',url)
    Logger.debug('img.src :',img.src)

    $(img).on('load',function(){
      resolve(img)
    })
    $(img).on('error',function(){
      console.error('img load error')
      Logger.debug('img :',img)
      resolve(img)
    })
  })
}

export function preloadAllImg(imgArray = [],progressCallback = function(parcent){}){

  let d = $.Deferred()

  let images = $('img')
  let loadCnt = 0

  var array = null
  

  if(images.length > 0 ){
    let a = []
    images.each(function(index, el) {
      let src = $(el).attr('src')
      a.push(src)
    })

    array = a

  }else{
    array = []
  }


  let imageArray = array.concat(imgArray)
  let imagesLen = imageArray.length

  Logger.debug('⭐️ imagesLen :',imagesLen)

  for (var i = 0; i < imageArray.length; i++) {

    preloadImg(imageArray[i]).then(function(){
      loadCnt++
      progressCallback(loadCnt/imageArray.length)
      Logger.debug(`⭐️ image loadCnt ${loadCnt}/${imagesLen}`)
      if(loadCnt == imagesLen){
        d.resolve()
      }
    })
  }
  return d.promise()
}