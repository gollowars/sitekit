import ChartStateBase from './ChartStateBase'

export default class ChartStateEdit extends ChartStateBase {
  setup(){
    console.log('ChartStateEdit:: setup')

    this.originalHead = null

    this.controllerValidation()
  }

  controllerValidation(){
    // $('#searchBookBtn').hide()
    // $('#graphBackBtn').hide()
    // $('.params__unit__edit').show()
    // $('.params__unit__next').hide()

    // $('#searchController').hide()
    // $('#editController').show()

    // this.originalHead = $('#graphHead').text()
    // console.log(this.originalHead)
    // $('#graphHead').text("チャートを編集する")
  }



  end(){
    console.log('ChartStateEdit:: end')
    // $('#graphHead').text(this.originalHead)
    // $('#graphBackBtn').show()
  }
}