export default function Table(x, y, ctx) {
  this.width = 60;
  this.height = 25;
  this.mode = "Down";
  this.image = new Image()
  this.image.src = "img/table" + this.mode + ".png"
  this.delay = 50
  this.curDelay = 0
  this.sound = new Audio("audio/table.mp3")
  this.x = x;
  this.y = y;

  this.changeState = function(){
    if(this.mode == "Up"){
      this.mode = "Down"
      this.width = 60;
      this.height = 25;
      this.y += 35
    } else {
      this.mode = "Up"
      this.width = 25
      this.height = 60
      this.y -= 35
    }
    this.image.src = "img/table" + this.mode + ".png"
    this.curDelay = 1
    this.sound.play()
  }

  this.closeTo = function(obj){
    let leftSide = this.x - 20
    let rightSide = this.x + this.width + 20
    let topSide = this.y - 20
    let bottomSide = this.y + this.height

    let objLeftSide = obj.x
    let objRightSide = obj.x + obj.width
    let objTopSide = obj.y
    let objBottomSide = obj.y + obj.height

    if((bottomSide <= objTopSide) || (topSide >= objBottomSide) || (rightSide <= objLeftSide) || (leftSide >= objRightSide)){
      return false
    }
    return true
  }

  this.intersects = function(obj){
    let leftSide = this.x
    let rightSide = this.x + this.width
    let topSide = this.y
    let bottomSide = this.y + this.height

    let objLeftSide = obj.x
    let objRightSide = obj.x + obj.width
    let objTopSide = obj.y
    let objBottomSide = obj.y + obj.height

    if((this.mode == "Down") || (bottomSide <= objTopSide) || (topSide >= objBottomSide) || (rightSide <= objLeftSide) || (leftSide >= objRightSide)){
      return false
    }
    return true
  }

  this.update = function(){
    ctx.fillStyle = this.color;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
