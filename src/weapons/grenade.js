import {gravity} from "../values.js"

export default function Grenade(ctx) {
  this.damage = 4;
  this.ammo = 2
  this.fireDelay = 70;
  this.curDelay = 0;
  this.blowDelay = 100
  this.curBlowDelay = 0
  this.blowSound = new Audio("audio/grenade.mp3")
  this.fireSound = new Audio("audio/grenadeThrow.mp3")
  this.takeSound = new Audio("audio/grenadeTake.mp3")
  this.image = new Image()
  this.frame = 0;
  this.image.src = "img/grenade.png"
  this.grenade = true
  this.speedY = -5
  this.width = 15
  this.height = 15
  this.explosion = {
    x: null,
    y: null,
    width: 150,
    height: 150
  }

  this.blow = function(){
    this.blowSound.play()
    let gren = this
    requestAnimationFrame(function draw(){
      gren.image.src = "img/explosion" + Math.floor(gren.frame) + ".png"
      ctx.drawImage(gren.image, gren.x - gren.explosion.width/2, gren.y - gren.explosion.height/2, gren.explosion.width, gren.explosion.height);
      gren.frame+=0.2
      if(gren.frame < 6){
        requestAnimationFrame(draw)
      }
    } )
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

    if((bottomSide <= objTopSide) || (topSide >= objBottomSide) || (rightSide <= objLeftSide) || (leftSide >= objRightSide)){
      return false
    }
    return true
  }

  this.update = function(){
    this.explosion.x = this.x - this.explosion.width/2
    this.explosion.y = this.y - this.explosion.height/2
    this.curBlowDelay += 1
    this.speedX -= Math.sign(this.speedX)/20
    this.speedY += gravity/5
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
