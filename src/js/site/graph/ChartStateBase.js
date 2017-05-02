import 'babel-polyfill'


export default class ChartStateBase {
  constructor(params, chart){
    this.params = params
    this.chart = chart

    this.init()
  }
  init(){

  }

  async enter(){
    return new Promise(async (resolve, reject) => {
      await this.setup()
      resolve()
    })
  }

  async exit(){
    return new Promise(async (resolve, reject) => {
      await this.end()
      resolve()
    })
  }


  animStart(type){
    let scores = this.params[type].scores
    this.chart.animTo(scores)
  }

  setup(){

  }

  end(){

  }
}