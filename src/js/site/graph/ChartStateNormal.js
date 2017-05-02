import ChartStateBase from './ChartStateBase'

export default class ChartStateNormal extends ChartStateBase {
  setup(){
    console.log('ChartStateNormal:: setup')


    this.controllerValidation()
  }

  controllerValidation(){
    // $('#searchBookBtn').show()
    // $('.params__unit__edit').hide()
    // $('.params__unit__next').show()

    // $('#searchController').show()
    // $('#editController').hide()
  }



  end(){
    // console.log('ChartStateNormal:: end')
  }
}