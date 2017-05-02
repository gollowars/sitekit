import 'babel-polyfill'
import Normal from './ChartStateNormal'
import Edit from './ChartStateEdit'
import ChartData from '../../site/ChartData'

const STATE_NORMAL = 'normal'
const STATE_EDIT = 'edit'
const CHANGE_AMOUNT = 0.1
const MAX_VALUE = 1.0
const MIN_VALUE = 0.0

function ChartManager(){

  let currentState = ''
  let params = null
  let editScores = null
  let chart = null
  let chartType = 0

  function ChartManagerObj(_params,_chart){
    params = _params
    chart = _chart

    init()
  }

  ////////////////////////////
  // Private 
  function init(){
    Logger.debug('ChartManager:: init')
  }

  //////////////////////////////
  // views
  function componentValidation(){
    // graphHead
    if(currentState == STATE_NORMAL){
      $('#graphHead').show()
    }else{
      $('#graphHead').hide()
    }

    if(currentState == STATE_EDIT){
      $('#graphHeadEdit').show()
    }else{
      $('#graphHeadEdit').hide()
    }

    // graphBackBtn
    if(chartType == 0 || currentState == STATE_EDIT){
      $('#graphBackBtn').hide()
    }else{
      $('#graphBackBtn').show()
    }

    //params__unit__next
    if(chartType != 0 || currentState == STATE_EDIT){
      $('.params__unit__next').hide()
    }else{
      $('.params__unit__next').show()
    }

    // params__unit__edit
    if(currentState != STATE_EDIT){
      $('.params__unit__edit').hide()
    }else{
      $('.params__unit__edit').show()
    }

    // search button
    if(currentState == STATE_NORMAL){
      $('#searchBookBtn').show()
    }else{
      $('#searchBookBtn').hide()
    }

    // search button
    if(currentState == STATE_NORMAL){
      $('#searchBookBtn').show()
    }else{
      $('#searchBookBtn').hide()
    }

    // searchController
    if(currentState == STATE_NORMAL){
      $('#searchController').show()
    }else{
      $('#searchController').hide()
    }

    // editController
    if(currentState == STATE_EDIT){
      $('#editController').show()
    }else{
      $('#editController').hide()
    }
  }

  ////////////////////////////////
  // data
  function changeHead(title){
    $('#graphHead').html(title)
  }

  function changeScores(array){
    $('.params__unit__value').each(function(index, target){
      let value = array[index]
      changeDomScore(target, value)
    })
  }

  function changeDomScore(ele, value){
    if(value == 1){
      value = "1.0"
    }else if(value == 0){
      value = "0.0"
    }
    $(ele).text(value)
  }

  function changeOthers(list){
    for (var i = 0; i < list.length; i++) {
      let title = list[i].title
      let desc = list[i].desc
      let underid = list[i].underid
      $('.params__unit').eq(i).find('.params__unit__title').text(title)
      $('.params__unit').eq(i).attr('data-desc',desc)
      if(underid){
        $('.params__unit').eq(i).find('.params__unit__next').attr('data-next-id',underid)
      }else{
        $('.params__unit').eq(i).find('.params__unit__next').attr('data-next-id','')
      }
    }
  }


  function changeChart(type){
    let currentData = ChartData.data[type]
    let head = currentData.head
    let scores = params[type].scores
    let list = currentData.unit

    changeHead(head)
    changeScores(scores)
    changeOthers(list)
  }


  function setScore(score, index){
    if(score >= MAX_VALUE){
      score = MAX_VALUE
    }else if(score <= MIN_VALUE){
      score = MIN_VALUE
    }
    editScores[index] = Math.round(score*10)/10

    changeDomScore($('.params__unit__value').eq(index), editScores[index])
    chart.animTo(editScores)
  }

  ////////////////////////////
  // Public
  
  ChartManagerObj.prototype.getCurrentType = function(){
    Logger.debug('chartManagerObj:: getCurrentType')
    return chartType
  }

  ChartManagerObj.prototype.getCurrentScore = function(){
    Logger.debug('chartManagerObj:: getCurrentScore')
    return params[chartType].scores
  }

  ChartManagerObj.prototype.changeState = async function(statename){
    Logger.debug('chartManagerObj:: changeState')
    currentState = statename
    componentValidation()
  }

  ChartManagerObj.prototype.changeChart = async function(chartTypeID){
    Logger.debug('chartManagerObj:: changeChart')
    chartType = chartTypeID
    changeChart(chartType)
    componentValidation()
  }

  ChartManagerObj.prototype.animStart = async function(){
    Logger.debug('chartManagerObj:: animStart')
    let scores = params[chartType].scores
    editScores = scores.concat([])
    chart.animTo(scores)
  }

  ChartManagerObj.prototype.setParams = async function(_params){
    Logger.debug('chartManagerObj:: setParams')
    params = _params
  }

  ChartManagerObj.prototype.setChart = async function(_chart){
    Logger.debug('chartManagerObj:: setChart')
    chart = _chart
  }

  ChartManagerObj.prototype.reset = async function(){
    Logger.debug('chartManagerObj:: reset')
    let scores = params[chartType].scores
    editScores = scores.concat([])
    chart.animTo(editScores)
  }

  ChartManagerObj.prototype.editScore = async function(){
    Logger.debug('chartManagerObj:: editScore')
    params[chartType].scores = editScores
  }

  ChartManagerObj.prototype.increment = async function(index){
    Logger.debug('chartManagerObj:: increment')
    let nextScore = editScores[index]
    nextScore += CHANGE_AMOUNT
    setScore(nextScore, index)
  }

  ChartManagerObj.prototype.decrement = async function(index){
    Logger.debug('chartManagerObj:: decrement')
    let nextScore = editScores[index]
    nextScore -= CHANGE_AMOUNT
    setScore(nextScore, index)
  }

  ChartManagerObj.prototype.destroy = async function(){
    Logger.debug('chartManagerObj:: destroy')
    if(chart){
      chart.clear()
      chart = null
    }
  }

  return ChartManagerObj
}

export default ChartManager()