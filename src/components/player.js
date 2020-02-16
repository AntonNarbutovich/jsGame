import {gravity, bulletSpeed} from "/src/values.js"
import Bullet from "/src/components/bullet.js"

export default function Player(x, y, ctx) {
  this.width = 30;
  this.height = 50;
  this.speedX = 4;
  this.speedY = 0;
  this.color = 'red';
  this.health = 5;
  this.jumpAllowed = true;
  this.horizontalDirection = 'Right'
  this.weapon = null;
  this.isDown = false
  this.x = x;
  this.y = y;

  this.imageNum = 0;
  this.image = new Image()
  this.image.src = "img/playerRight0.png"

  this.takeWeapon = function(generator){
    if(generator.weapon){
      generator.weapon.takeSound.play()
      this.weapon = {...generator.weapon}
      generator.weapon = null
    }
  }

  this.fire = function(){
    if(this.weapon){
      if(!this.isDown){
        this.image.src = "img/player" + this.horizontalDirection + "Gun" + Math.floor(this.imageNum) +".png"
      }
      if(this.weapon.curDelay == 0){
        this.weapon.curDelay = 1
        this.weapon.fireSound.pause();
        this.weapon.fireSound.currentTime = 0;
        this.weapon.fireSound.play()
        this.weapon.ammo--
        let damage = this.weapon.damage
        if(this.weapon.ammo == 0){
          this.weapon = null
        }
        if(this.horizontalDirection == 'Right'){
          return new Bullet(this.x + this.width + 5, this.y + this.height/2, bulletSpeed, damage, ctx)
        } else {
          return new Bullet(this.x - 5, this.y + this.height/2, -bulletSpeed, damage, ctx)
        }
      }
    }
  }

  this.moveLeft = function(){
    this.horizontalDirection = 'Left'
    this.x -= this.speedX;
    this.image.src = "img/playerLeft" + Math.floor(this.imageNum) +".png"
    this.imageNum += 0.17
    if(this.imageNum >= 2){
      this.imageNum = 0
    }
  }

  this.moveRight = function(){
    this.horizontalDirection = 'Right'
    this.x += this.speedX;
    this.image.src = "img/playerRight" + Math.floor(this.imageNum) +".png"
    this.imageNum += 0.17
    if(this.imageNum >= 2){
      this.imageNum = 0
    }
  }

  this.layDown = function(){
    this.isDown = true
    this.width = 50
    this.height = 30;
    if(this.horizontalDirection == 'Right'){
      this.image.src = "img/playerRightDown.png"
    } else{
      this.image.src = "img/playerLeftDown.png"
    }
  }

  this.stayUp = function(){
    this.isDown = false
    this.y -=20
    this.width = 30
    this.height = 50;
    if(this.horizontalDirection == 'Right'){
      this.image.src = "img/playerRight0.png"
    } else{
      this.image.src = "img/playerLeft0.png"
    }
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
    if(this.weapon){
      if(this.weapon.curDelay != 0){
        this.weapon.curDelay +=1
        if(this.weapon.curDelay == this.weapon.fireDelay){
          this.weapon.curDelay = 0
        }
      }
      ctx.fillStyle = "black";
      ctx.fillText(this.weapon.ammo, this.x + 40, this.y - 10);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y - 10, 6*this.health, 5);
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
