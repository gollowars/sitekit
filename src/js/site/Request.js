import 'babel-polyfill'

function Request() {

  function RequestObj(){
    init()
  }

  function init(){
    Logger.debug('Request::initialize')

  }

  function get(url){
    return new Promise(function(resolve,reject){
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
      })
      .done(function(data) {
        if(typeof data == 'string'){
          data = JSON.parse(data)
        }
        resolve(data)
      })
      .fail(function() {
        reject()
      })
      .always(function() {
        Logger.debug("Request::complete");
      });
      
    })
  }

  function post(url,data){
    return new Promise(function(resolve,reject){
      $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(data),
        dataType: 'json',
      })
      .done(function(data) {
        if(typeof data == 'string'){
          data = JSON.parse(data)
        }
        resolve(data)
      })
      .fail(function() {
        reject()
      })
      .always(function() {
        Logger.debug("Request::complete");
      });
      
    })
  }

  RequestObj.prototype.get = async function(url){
    return await get(url)
  }

  RequestObj.prototype.post = async function(url,data){
    return await post(url,data)
  }

  return RequestObj
}

let request = Request()
export default new request