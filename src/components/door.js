export default function Door(x, y, ctx) {
  this.width = 10;
  this.height = 55;
  this.color = 'grey';
  this.mode = 'closed';
  this.openSound = new Audio("audio/doorOpen.mp3")
  this.closeSound = new Audio("audio/doorClose.mp3")
  this.x = x;
  this.y = y;

  this.open = function(obj){
    this.mode = 'opened'
    this.openSound.play()
  }

  this.close = function(obj){
    this.mode = 'closed'
    this.closeSound.play()
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

    if((this.mode == 'opened') || (bottomSide <= objTopSide) || (topSide >= objBottomSide) || (rightSide <= objLeftSide) || (leftSide >= objRightSide)){
      return false
    }
    return true
  }

  this.update = function(){
    this.width = this.mode == 'opened' ? 30: 10
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
