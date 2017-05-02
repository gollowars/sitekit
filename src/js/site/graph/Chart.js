
export default class Chart {
  constructor(element){
    this.element = element
    let size = parseInt($(this.element).width())
    this.width = size
    this.height = size
    this.radius = size / 2
    this.negativeRad = 28
    this.minRad = 20
    this.overlapCnt = 3

    this.centerX = size / 2
    this.centerY = size / 2

    this.scores = [0.0, 0.0, 0.0, 0.0, 0.0]
    this.pointList = []

    this.initRotation = 90

    this.snapPolygons = []
    this.snapVertices = []

    ////////////////////
    // animation
    this.speed = 200
    this.ease = "easeInOutQuad"
    ////////////////////
    // style
    this.opacity = 0.5

    // polygon
    this.polygonColor = "#92b2c6"

    // vertices
    this.pointSize = 1.5
    this.pointColor = "#09517d"

    this.init()
  }

  init(){
    this.snap = Snap(this.element)

    this.calcPointList()
    this.draw()
  }


  animTo(scores){
    this.scores = scores
    this.calcPointList()
    this.anim()
  }

  anim(){

    for (var i = 0; i < this.snapPolygons.length; i++) {
      let p = this.snapPolygons[i]
      let points = this.pointList[i]
      p.animate({"points":points},this.speed,mina[this.ease])
    }

    let largePoints = this.pointList[0]
    for (var n = 0; n < this.snapVertices.length; n++) {
      let x = largePoints[n*2]
      let y = largePoints[n*2+1]
      let v = this.snapVertices[n]
      v.animate({"cx":x, "cy": y},this.speed,mina[this.ease])
    }
  }

  calcPointList(){
    this.pointList = []
    for (let i = 0; i < this.overlapCnt; i++) {
      let points = this.calcPolygonPoints(this.radius, this.negativeRad*i)
      this.pointList.push(points)
    }
  }

  draw(){
    for (let i = 0; i < this.pointList.length; i++) {
      let points = this.pointList[i]
      let p = this.snap.polygon(points).attr({"fill": this.polygonColor ,opacity: this.opacity})
      this.snapPolygons.push(p)
    }

    let largePoints = this.pointList[0]
    for (let i = 0; i < largePoints.length/2; i++) {
      let x = largePoints[i*2]
      let y = largePoints[i*2+1]
      let v = this.snap.circle(x,y,this.pointSize).attr({"fill":this.pointColor, opacity: this.opacity})
      this.snapVertices.push(v)
    }
  }

  removeAll(){
    for (let i = 0; i < this.snapPolygons.length; i++) {
      this.snapPolygons[i].remove()
    }

    for (let n = 0; n < this.snapVertices.length; n++) {
      this.snapVertices[n].remove()
    }
  }

  calcPolygonPoints(radius,negaRad){
    let points = []

    let addAngle = 360 / this.scores.length
    for (var i = 0; i < this.scores.length; i++) {
      let amount = this.scores[i]
      let angle = i*addAngle - this.initRotation

      let actRad = Math.max(radius * amount - negaRad, this.minRad)
      let pointX = Math.cos(Math.PI/180 * angle) * actRad + this.centerX
      let pointY = Math.sin(Math.PI/180 * angle) * actRad + this.centerY
      points.push(pointX)
      points.push(pointY)
    }

    return points
  }

  clear(){
    this.snap.clear()
  }
}