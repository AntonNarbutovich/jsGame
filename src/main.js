import Player from "./components/player.js"
import Wall from "./components/wall.js"
import Door from "./components/door.js"
import Window from "./components/window.js"
import WeaponGenerator from "./components/weaponGenerator.js"
import BonusGenerator from "./components/bonusGenerator.js"
import Trampoline from "./components/trampoline.js"
import Table from "./components/table.js"
import Grenade from "./weapons/grenade.js"
import {gravity, bulletSpeed} from "./values.js"

let pressedKeys = []
let obstacles = []
let bullets = []
let grenades = []
let doors = []
let weaponGenerators = []
let windows = []
let bonusGenerators = []
let trampolins = []
let tables = []

let win = null

const cvs = document.getElementById("game")
const ctx = cvs.getContext("2d")

let player = new Player(1, 450, 450, ctx)
let player2 = new Player(2, 900, 350, ctx)

obstacles.push(new Wall(100, 600, 1400, 30, ctx))
obstacles.push(new Wall(1000, 550, 200, 30, ctx))
obstacles.push(new Wall(1050, 500, 100, 30, ctx))
obstacles.push(new Wall(1300, 550, 100, 50, ctx))
obstacles.push(new Wall(1300, 420, 100, 50, ctx))
obstacles.push(new Wall(1470, 480, 40, 30, ctx))

obstacles.push(new Wall(100, 100, 30, 60, ctx))
obstacles.push(new Wall(100, 200, 30, 400, ctx))
obstacles.push(new Wall(100, 535, 80, 10, ctx))
obstacles.push(new Wall(100, 410, 80, 10, ctx))
obstacles.push(new Wall(250, 500, 50, 10, ctx))
obstacles.push(new Wall(280, 450, 50, 10, ctx))
obstacles.push(new Wall(100, 400, 30, 200, ctx))

//obstacles.push(new Wall(100, 400, 220, 30, ctx))
obstacles.push(new Wall(300, 400, 30, 145, ctx))
obstacles.push(new Wall(400, 450, 230, 30, ctx))
obstacles.push(new Wall(700, 450, 270, 30, ctx))

obstacles.push(new Wall(300, 390, 70, 30, ctx))
obstacles.push(new Wall(400, 325, 650, 10, ctx))
obstacles.push(new Wall(1150, 325, 400, 10, ctx))
obstacles.push(new Wall(1400, 290, 150, 35, ctx))
obstacles.push(new Wall(1450, 255, 100, 35, ctx))
obstacles.push(new Wall(800, 200, 600, 10, ctx))
obstacles.push(new Wall(1250, 200, 10, 85, ctx))
obstacles.push(new Wall(470, 260, 30, 10, ctx))
obstacles.push(new Wall(200, 200, 230, 10, ctx))

obstacles.push(new Wall(500, 200, 320, 10, ctx))
obstacles.push(new Wall(500, 200, 30, 70, ctx))
obstacles.push(new Wall(790, 200, 30, 70, ctx))
obstacles.push(new Wall(630, 300, 60, 30, ctx))

obstacles.push(new Wall(300, 200, 30, 150, ctx))

obstacles.push(new Wall(500, 50, 300, 10, ctx))
obstacles.push(new Wall(500, 0, 10, 120, ctx))
obstacles.push(new Wall(600, 0, 10, 120, ctx))
obstacles.push(new Wall(700, 0, 10, 120, ctx))
obstacles.push(new Wall(800, 0, 10, 120, ctx))

obstacles.push(new Wall(1100, 0, 10, 150, ctx))



doors.push(new Door(310, 545, ctx))

doors.push(new Door(510, 270, ctx))
doors.push(new Door(800, 270, ctx))

doors.push(new Door(1100, 145, ctx))


windows.push(new Window(100, 160, ctx))
windows.push(new Window(1300, 470, ctx))
windows.push(new Window(1300, 510, ctx))
windows.push(new Window(300, 350, ctx))

windows.push(new Window(500, 160, ctx))
windows.push(new Window(600, 160, ctx))
windows.push(new Window(700, 160, ctx))
windows.push(new Window(800, 160, ctx))
windows.push(new Window(500, 120, ctx))
windows.push(new Window(600, 120, ctx))
windows.push(new Window(700, 120, ctx))
windows.push(new Window(800, 120, ctx))


weaponGenerators.push(new WeaponGenerator(800, 590, ctx))
weaponGenerators.push(new WeaponGenerator(500, 440, ctx))
weaponGenerators.push(new WeaponGenerator(640, 290, ctx))
weaponGenerators.push(new WeaponGenerator(1150, 190, ctx))


bonusGenerators.push(new BonusGenerator(640, 190, ctx))
bonusGenerators.push(new BonusGenerator(1400, 590, ctx))

trampolins.push(new Trampoline(1075, 490, ctx))
trampolins.push(new Trampoline(130, 400, ctx))

tables.push(new Table(630, 575, ctx))
tables.push(new Table(930, 175, ctx))

document.addEventListener('keydown', function (e) {
  pressedKeys[e.keyCode] = true;
})
document.addEventListener('keyup', function (e) {
  pressedKeys[e.keyCode] = false;
})

function movePlayer(){
  if(pressedKeys[65]){
    player.moveLeft()
  }
  if(pressedKeys[68]){
    player.moveRight()
  }
  if(pressedKeys[70]){
    for(let table of tables){
      if(table.closeTo(player) && table.curDelay == 0){
        table.changeState()
      }
    }
  }

  for(let obstacle of obstacles.concat(weaponGenerators).concat(bonusGenerators).concat(windows).concat(trampolins).concat(tables)){
    if(obstacle.intersects(player)){
      if(player.horizontalDirection == 'Left'){
        player.x = obstacle.x + obstacle.width
      } else{
        player.x = obstacle.x - player.width
      }
    }
  }

  if(pressedKeys[87] && player.jumpAllowed){
    player.verticalDirection = 'Up'
    player.speedY = 10
    player.y -= player.speedY;
    player.jumpAllowed = false
  } else {
    if(player.speedY > 0){
      player.verticalDirection = 'Up'
    } else{
      player.verticalDirection = 'Down'
    }
    player.speedY -= gravity
    player.y -= player.speedY;
  }

  for(let obstacle of obstacles.concat(weaponGenerators).concat(bonusGenerators).concat(windows).concat(trampolins).concat(tables)){
    if(obstacle.intersects(player)){
      if(player.verticalDirection == 'Up'){
        player.y = obstacle.y + obstacle.height
        player.speedY = 0
      } else {
        player.y = obstacle.y - player.height
        player.speedY = 0
        player.jumpAllowed = true
      }
    }
  }

  if(pressedKeys[83]){
    player.layDown()
    for(let obstacle of obstacles.concat(weaponGenerators).concat(bonusGenerators).concat(windows).concat(trampolins).concat(tables)){
      if(obstacle.intersects(player)){
        player.x -= 20
        //player.layDown()
      }
    }

  } else if(player.isDown){
    player.stayUp()
    for(let obstacle of obstacles.concat(weaponGenerators).concat(bonusGenerators).concat(windows).concat(trampolins).concat(tables)){
      if(obstacle.intersects(player)){
        player.y += 20
        player.layDown()
      }
    }
  }
}

function movePlayer2(){
  if(pressedKeys[37]){
    player2.moveLeft()
  }
  if(pressedKeys[39]){
    player2.moveRight()
  }
  if(pressedKeys[17]){
    for(let table of tables){
      if(table.closeTo(player2) && table.curDelay == 0){
        table.changeState()
      }
    }
  }


  for(let obstacle of obstacles.concat(weaponGenerators).concat(bonusGenerators).concat(windows).concat(trampolins).concat(tables)){
    if(obstacle.intersects(player2)){
      if(player2.horizontalDirection == 'Left'){
        player2.x = obstacle.x + obstacle.width
      } else{
        player2.x = obstacle.x - player2.width
      }
    }
  }

  if((pressedKeys[38]) && player2.jumpAllowed){
    player2.verticalDirection = 'Up'
    player2.speedY = 10
    player2.y -= player2.speedY;
    player2.jumpAllowed = false
  } else {
    if(player2.speedY > 0){
      player2.verticalDirection = 'Up'
    } else{
      player2.verticalDirection = 'Down'
    }
    player2.speedY -= gravity
    player2.y -= player2.speedY;
  }

  for(let obstacle of obstacles.concat(weaponGenerators).concat(bonusGenerators).concat(windows).concat(trampolins).concat(tables)){
    if(obstacle.intersects(player2)){
      if(player2.verticalDirection == 'Up'){
        player2.y = obstacle.y + obstacle.height
        player2.speedY = 0
      } else {
        player2.y = obstacle.y - player2.height
        player2.speedY = 0
        player2.jumpAllowed = true
      }
    }
  }

  if(pressedKeys[40]){
    player2.layDown()
    for(let obstacle of obstacles.concat(weaponGenerators).concat(bonusGenerators).concat(windows).concat(trampolins).concat(tables)){
      if(obstacle.intersects(player2)){
        player2.x -= 20
        player2.layDown()
      }
    }
  } else if(player2.isDown){
    player2.stayUp()
    for(let obstacle of obstacles.concat(weaponGenerators).concat(bonusGenerators).concat(windows).concat(trampolins).concat(tables)){
      if(obstacle.intersects(player2)){
        player2.y += 20
        player2.layDown()
      }
    }
  }
}

function checkBulletCollisions(){
  for(let i = 0; i < bullets.length; i++){
    let bullet = bullets[i]
    if(bullet.x + bullet.width < 0 || bullet.x > cvs.width || bullet.y + bullet.height < 0 || bullet.y > cvs.height){
      bullets.splice(i, 1)
      continue
    }
    for(let j = 0; j < obstacles.length; j++){
      if(bullet.intersects(obstacles[j])){
        bullets.splice(i, 1)
        break
      }
    }

    for(let j = 0; j < tables.length; j++){
      if(tables[j].intersects(bullet)){
        bullets.splice(i, 1)
        break
      }
    }

    for(let j = 0; j < doors.length; j++){
      if(bullet.intersects(doors[j]) && doors[j].mode == 'closed'){
        bullets.splice(i, 1)
      }
    }
    for(let j = 0; j < windows.length; j++){
      if(bullet.intersects(windows[j])){
        windows[j].break()
        windows.splice(j, 1)
      }
    }

    if(bullet.intersects(player)){
      player.takeDamage(bullet.damage)
      bullets.splice(i, 1)
      if(player.health <= 0){
        player.die()
        stop(2)
      }
    }
    if(bullet.intersects(player2)){
      player2.takeDamage(bullet.damage)
      bullets.splice(i, 1)
      if(player2.health <= 0){
        player2.die()
        stop(1)
      }
    }
  }
}

function checkDoorColissions(){
  for(let i = 0; i < doors.length; i++){
    if((player.intersects(doors[i]) || player2.intersects(doors[i]))&& doors[i].mode == 'closed'){
      doors[i].open()
    } else if((!player.intersects(doors[i]) && !player2.intersects(doors[i])) && doors[i].mode == 'opened') {
      doors[i].close()
    }
  }
}

function checkWeaponGeneratorCollisions(){
  for(let i = 0; i < weaponGenerators.length; i++){
    if(weaponGenerators[i].stands(player)){
      player.takeWeapon(weaponGenerators[i])
    }
    if(weaponGenerators[i].stands(player2)){
      player2.takeWeapon(weaponGenerators[i])
    }
  }
}

function checkBonusesCollisions(){
  for(let i = 0; i < bonusGenerators.length; i++){
    if(bonusGenerators[i].stands(player)){
      player.takeBonus(bonusGenerators[i])
    }
    if(bonusGenerators[i].stands(player2)){
      player2.takeBonus(bonusGenerators[i])
    }
  }
}

function checkTrampolineCollisions(){
  for(let i = 0; i < trampolins.length; i++){
    if(trampolins[i].stands(player)){
      trampolins[i].sound.play()
      player.speedY = trampolins[i].stregth
      player.y -= player.speedY
    }
    if(trampolins[i].stands(player2)){
      trampolins[i].sound.play()
      player2.speedY = trampolins[i].stregth
      player2.y -= player2.speedY
    }
  }
}

function checkGrenadesCollisions(){
  for(let i = 0; i < grenades.length; i++){
    grenades[i].x += grenades[i].speedX

    for(let obstacle of obstacles.concat(weaponGenerators).concat(bonusGenerators).concat(tables)){
      if(obstacle.intersects(grenades[i])){
        grenades[i].hitSound.play()
        grenades[i].x -= grenades[i].speedX
        grenades[i].speedX = -grenades[i].speedX/2
        break;
      }
    }

    grenades[i].y += grenades[i].speedY

    for(let obstacle of obstacles.concat(weaponGenerators).concat(bonusGenerators).concat(tables)){
      if(obstacle.intersects(grenades[i])){
        grenades[i].hitSound.play()
        grenades[i].y -= grenades[i].speedY
        grenades[i].speedY = -grenades[i].speedY/2
        break;
      }
    }

    for(let door of doors){
      if(grenades[i].intersects(door) && door.mode == 'closed'){
        grenades[i].hitSound.play()
        grenades[i].speedX = -grenades[i].speedX/2
        grenades[i].x += grenades[i].speedX
      }
    }

    for(let j = 0; j < windows.length; j++){
      if(grenades[i].intersects(windows[j])){
        windows[j].break()
        windows.splice(j, 1)
      }
    }
  }
}

function stop(num) {
  win = num
  setTimeout(clear, 100)
}

function clear(){
  ctx.fillStyle = "red";
  ctx.font = "100px Arial";
  ctx.fillText("Game Over Player " + win + " Wins", 200, 300);
  clearInterval(interval);
}

function updateGameArea() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);

  movePlayer()

  movePlayer2()

  if(pressedKeys[32]){
    let bullet = player.fire()
    if(bullet){
      if(bullet.grenade){
        grenades.push(bullet)
      } else{
        bullets.push(bullet)
      }
    }
  }

  if(pressedKeys[16]){
    let bullet = player2.fire()
    if(bullet){
      if(bullet.grenade){
        grenades.push(bullet)
      } else{
        bullets.push(bullet)
      }
    }
  }

  checkBulletCollisions()
  checkDoorColissions()
  checkWeaponGeneratorCollisions()
  checkBonusesCollisions()
  checkGrenadesCollisions()
  checkTrampolineCollisions()

  if(player.x + player.width < 0 || player.x > cvs.width || player.y + player.height < 0 || player.y > cvs.height){
    stop(2)
  }

  if(player2.x + player2.width < 0 || player2.x > cvs.width || player2.y + player2.height < 0 || player2.y > cvs.height){
    stop(1)
  }

  obstacles.forEach(o => o.update());
  doors.forEach(d => d.update());
  windows.forEach(w => w.update());
  grenades.forEach(g => g.update());
  weaponGenerators.forEach(w => w.update());
  bonusGenerators.forEach(b => b.update());
  trampolins.forEach(t => t.update());
  tables.forEach(t => t.update());

  player.update()
  player2.update()

  for(let i = 0; i < Math.abs(bulletSpeed/5); i++){
    bullets.forEach(b => b.update(Math.sign(b.speedX)*5));
    checkBulletCollisions()
  }

  for(let i = 0; i < grenades.length; i++){
    if(grenades[i].curBlowDelay >= grenades[i].blowDelay){
      grenades[i].blow()

      for(let j = 0; j < windows.length; j++){
        if(windows[j].intersects(grenades[i].explosion)){
          windows[j].break()
          windows.splice(j, 1)
        }
      }

      if(player.intersects(grenades[i].explosion)){
        player.health -= grenades[i].damage;
        player.hitSound.play()
        if(player.health <= 0){
          stop(2)
        }
      }
      if(player2.intersects(grenades[i].explosion)){
        player2.health -= grenades[i].damage;
        player2.hitSound.play()
        if(player2.health <= 0){
          stop(1)
        }
      }
      grenades.splice(i, 1)
    }
  }

  for(let table of tables){
    if(table.curDelay > 0){
      table.curDelay += 1
      if(table.curDelay >= table.delay){
        table.curDelay = 0
      }
    }
  }

}

let interval = setInterval(updateGameArea, 20);
