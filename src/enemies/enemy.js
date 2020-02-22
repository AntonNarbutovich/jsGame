import {gravity, bulletSpeed, grenadeSpeed} from "../values.js"
import Bullet from "../components/bullet.js"
import Grenade from "../weapons/grenade.js"
import Gun from "../weapons/Gun.js"

export default function Enemy(x, y, ctx) {
  this.num = 2
  this.width = 30
  this.height = 50
  this.speedX = 5
  this.speedY = 0
  this.color = 'red'
  this.health = 5
  this.shield = 0
  this.jumpAllowed = true;
  this.horizontalDirection = 'Right'
  this.hitSound = new Audio("audio/hit.mp3")
  this.hitSound.volume = 0.2
  this.weapon = new Gun()
  this.grenades = 0
  this.grenadesDelay = 50
  this.grenadesCurDelay = 0
  this.isDown = false
  this.additionalDamage = 0
  this.x = x;
  this.y = y;

  this.imageNum = 0;
  this.image = new Image()
  this.image.src = "img/player" + this.num + "Right0.png"

  this.takeWeapon = function(generator){
    if(generator.weapon){
      generator.weapon.takeSound.play()
      if(generator.weapon.grenade){
        this.grenades += generator.weapon.ammo
      } else {
        this.weapon = {...generator.weapon}
      }
      generator.weapon = null
    }
  }

  this.takeBonus = function(generator){
    if(generator.bonus){
      generator.bonus.takeSound.play()
      generator.bonus.activate(this)
      generator.bonus = null
    }
  }

  this.fire = function(){
    if(this.weapon){
      if(!this.isDown){
        this.image.src = "img/player" + this.num + this.horizontalDirection + "Gun" + Math.floor(this.imageNum) +".png"
      }
      if(this.weapon.curDelay == 0){
        this.weapon.curDelay = 1
        this.weapon.fireSound.pause();
        this.weapon.fireSound.currentTime = 0;
        this.weapon.fireSound.play()
        this.weapon.ammo--
        let damage = this.weapon.damage + this.additionalDamage
        let shotgun = this.weapon.shotgun
        if(this.weapon.ammo == 0){
          this.weapon = null
        }
        if(this.horizontalDirection == 'Right'){
          if(shotgun){
            let bul1 = new Bullet(this.x + this.width + 2, this.y + this.height/2, bulletSpeed, 15 , damage, ctx)
            let bul2 = new Bullet(this.x + this.width + 2, this.y + this.height/2, bulletSpeed, 0 , damage, ctx)
            let bul3 = new Bullet(this.x + this.width + 2, this.y + this.height/2, bulletSpeed, -15 , damage, ctx)
            return [bul1, bul2, bul3]
          }
          return [new Bullet(this.x + this.width + 2, this.y + this.height/2, bulletSpeed, 0 , damage, ctx)]
        } else {
          if(shotgun){
            let bul1 = new Bullet(this.x - 2, this.y + this.height/2, -bulletSpeed, 15 , damage, ctx)
            let bul2 = new Bullet(this.x - 2, this.y + this.height/2, -bulletSpeed, 0 , damage, ctx)
            let bul3 = new Bullet(this.x - 2, this.y + this.height/2, -bulletSpeed, -15 , damage, ctx)
            return [bul1, bul2, bul3]
          }
          return [new Bullet(this.x - 2, this.y + this.height/2, -bulletSpeed, 0, damage, ctx)]
        }
      }
    }
  }

  this.throwGrenade = function(){
    if(this.grenades > 0 && this.grenadesCurDelay == 0){
      this.grenadesCurDelay = 1
      let g = new Grenade(ctx)
      g.x = this.x
      g.y = this.y
      g.fireSound.pause();
      g.fireSound.currentTime = 0;
      g.fireSound.play()
      let damage = g.damage + this.additionalDamage
      this.grenades--
      if(this.horizontalDirection == 'Right'){
          g.speedX = grenadeSpeed
          return g
      } else {
          g.speedX = -grenadeSpeed
          return g
      }
    }
  }

  this.moveLeft = function(){
    this.horizontalDirection = 'Left'
    this.x -= this.speedX;
    this.image.src = "img/player" + this.num + "Left" + Math.floor(this.imageNum) +".png"
    this.imageNum += 0.17
    if(this.imageNum >= 2){
      this.imageNum = 0
    }
  }

  this.moveRight = function(){
    this.horizontalDirection = 'Right'
    this.x += this.speedX;
    this.image.src = "img/player" + this.num + "Right" + Math.floor(this.imageNum) +".png"
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
      this.image.src = "img/player" + this.num + "RightDown.png"
    } else{
      this.image.src = "img/player" + this.num + "LeftDown.png"
    }
  }

  this.stayUp = function(){
    this.isDown = false
    this.y -=20
    this.width = 30
    this.height = 50;
    if(this.horizontalDirection == 'Right'){
      this.image.src = "img/player" + this.num + "Right0.png"
    } else{
      this.image.src = "img/player" + this.num + "Left0.png"
    }
  }

    this.takeDamage = function(damage){
      if(this.shield > 0){
        this.shield -= damage
        this.hitSound.play()
        if(this.shield < 0){
          this.health += this.shield
          this.shield = 0
        }
      } else{
        this.health -= damage;
        this.hitSound.play()
      }

    }

  this.die = function(){
    this.width = 50
    this.height = 30;
    this.image.src = "img/player" + this.num + "Dead.png"
    console.log("a")
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  this.canSee = function(player, objects){
    let closestLeft = 3000
    let closestRight = 3000

    let vision = {
      x: this.x - 500,
      y: this.y,
      width: 1000,
      height: this.height,
      leftSide: this.x - 500,
      rightSide: this.x + this.width + 500,
      topSide: this.y,
      bottomSide: this.y + this.height
    }

    let leftSide = this.x
    let rightSide = this.x + this.width
    let topSide = this.y
    let bottomSide = this.y + this.height

    let playerLeftSide = player.x
    let playerRightSide = player.x + player.width
    let playerTopSide = player.y
    let playerBottomSide = player.y + player.height

    for(let obj of objects.concat(player)){
      let objLeftSide = obj.x
      let objRightSide = obj.x + obj.width
      let objTopSide = obj.y
      let objBottomSide = obj.y + obj.height

      if(obj.intersects(vision)){
        if(objLeftSide - rightSide > 0 && objLeftSide - rightSide < closestRight){
          closestRight = objLeftSide - rightSide
        } else if(leftSide - objRightSide > 0 && leftSide - objRightSide < closestLeft){
          closestLeft = leftSide - objRightSide
        }
      }
    }


    if(leftSide - closestLeft === playerRightSide && player.intersects(vision)){
      if(closestLeft < 20){
        return -2
      }
      return -1
    } else if(rightSide + closestRight === playerLeftSide && player.intersects(vision)){
      if(closestRight < 20){
        return 2
      }
      return 1
    }

    return 0
  }

  this.findAndAttackPlayer = function(player, objects){
    let canSee = this.canSee(player, objects)
    let bullet = null
    switch (canSee) {
      case 1:
        this.moveRight()
        bullet = this.fire()
        break;
      case 2:
        bullet = this.fire()
        break;
      case -1:
        this.moveLeft()
        bullet = this.fire()
        break;
      case -2:
        bullet = this.fire()
        break;
    }

    return bullet
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
      //ctx.fillStyle = "black";
      //ctx.fillText(this.weapon.ammo, this.x + 40, this.y - 10);
    }
    if(this.grenadesCurDelay > 0){
      this.grenadesCurDelay++
      if(this.grenadesCurDelay == this.grenadesDelay){
        this.grenadesCurDelay = 0
      }
    }

    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y - 10, 6*this.health, 5);
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y - 17, 6*this.shield, 5);

    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
