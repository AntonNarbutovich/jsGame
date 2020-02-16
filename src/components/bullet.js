import {gravity, bulletSpeed} from "../values.js"

export default function Bullet(x, y, speed, damage, ctx) {
  this.width = 2;
  this.height = 2;
  this.color = "black";
  this.damage = damage;
  this.x = x;
  this.y = y;
  this.speedX = speed;

  this.intersects = function(obj){
    let leftSide = this.x
    let rightSide = this.x + this.width
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

  this.update = function(){
    this.x += this.speedX
    this.y += gravity/2
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  this.update = function(speed){
    this.x += speed
    this.y += gravity/(2*this.speedX/speed)
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
