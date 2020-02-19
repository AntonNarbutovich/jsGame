export default function SteelDoor(x, y, ctx) {
  this.width = 10;
  this.height = 55;
  this.color = 'grey';
  this.mode = 'closed';
  this.delay = 50
  this.curDelay = 0
  //this.sound = new Audio("audio/steelDoorOpen.mp3")
  this.x = x;
  this.y = y;

  this.changeState = function(){
    if(this.mode == "closed"){
      this.mode = "opened"
      this.height = 10;
    } else {
      this.mode = "closed"
      this.height = 55
    }
    this.curDelay = 1
    //this.sound.play()
  }

  this.closeTo = function(obj){
    let leftSide = this.x - 20
    let rightSide = this.x + this.width + 20
    let topSide = this.y
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

    if((this.mode == 'opened')  || (bottomSide <= objTopSide) || (topSide >= objBottomSide) || (rightSide <= objLeftSide) || (leftSide >= objRightSide)){
      return false
    }
    return true
  }

  this.update = function(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
