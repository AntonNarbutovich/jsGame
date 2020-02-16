import Gun from '/src/weapons/gun.js'
import AssaultRifle from '/src/weapons/assaultRifle.js'
import SniperRifle from '/src/weapons/sniperRifle.js'
import {weaponChance}  from "/src/values.js"

export default function WeaponGenerator(x, y, ctx) {
  this.width = 40;
  this.height = 10;
  this.color = 'grey';
  this.weapon = new Gun();
  this.x = x;
  this.y = y;

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

  this.stands = function(obj){
    let leftSide = this.x
    let rightSide = this.x + this.width
    let topSide = this.y
    let bottomSide = this.y + this.height

    let objLeftSide = obj.x
    let objRightSide = obj.x + obj.width
    let objTopSide = obj.y
    let objBottomSide = obj.y + obj.height

    if((topSide == objBottomSide) && (rightSide >= objRightSide) && (leftSide <= objLeftSide)){
      return true
    }
    return false
  }

  this.update = function(){
    let num = Math.floor(Math.random() * (weaponChance));
    if(num == 0){
      this.weapon = new Gun()
    } else if (num == 1){
      this.weapon = new AssaultRifle()
    }
    else if (num == 2){
     this.weapon = new SniperRifle()
   }
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    if(this.weapon){
      ctx.drawImage(this.weapon.image, this.x, this.y - 20, 30, 8);
    }
  }
}
