import Medicine from '../bonuses/medicine.js'
import Shield from '../bonuses/shield.js'
import DamageBonus from '../bonuses/damageBonus.js'
import {bonusChance}  from "../values.js"

export default function BonusGenerator(x, y, ctx) {
  this.width = 40;
  this.height = 10;
  this.color = 'green';
  this.bonus = null;
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
    let num = Math.floor(Math.random() * (bonusChance));
    if(num == 0){
      this.bonus = new Medicine()
    } else
    if(num == 1){
      this.bonus = new DamageBonus()
    } else
    if(num == 2){
      this.bonus = new Shield()
    }
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    if(this.bonus){
      let height = 30 * this.bonus.image.height/this.bonus.image.width
      ctx.drawImage(this.bonus.image, this.x + 5, this.y - height, 30, height);
    }
  }
}
