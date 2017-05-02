class Config {
  constructor(){
    this.ALLOCATION_DEBUG = true
    this.devPath = "/dev/demo"
    this.logOn = true
    this.apihost = location.protocol + "//" + location.hostname + ':5101'
    this.pramsHost = this.apihost + '/api/params'
    this.bookHost = this.apihost + '/api/book'
  }
}



export default new Config()