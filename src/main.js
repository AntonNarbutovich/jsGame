import Player from "./components/player.js"
import Wall from "./components/wall.js"
import Door from "./components/door.js"
import Window from "./components/window.js"
import WeaponGenerator from "./components/weaponGenerator.js"
import {gravity, bulletSpeed} from "./values.js"

let pressedKeys = []
let obstacles = []
let bullets = []
let doors = []
let weaponGenerators = []
let windows = []

const cvs = document.getElementById("game")
const ctx = cvs.getContext("2d")

let player = new Player(450, 450, ctx)
let player2 = new Player(900, 350, ctx)

obstacles.push(new Wall(100, 600, 1400, 30, ctx))
obstacles.push(new Wall(1000, 550, 200, 30, ctx))
obstacles.push(new Wall(1050, 500, 100, 30, ctx))
obstacles.push(new Wall(1300, 550, 100, 50, ctx))
obstacles.push(new Wall(1300, 420, 100, 50, ctx))
obstacles.push(new Wall(1470, 480, 40, 30, ctx))

obstacles.push(new Wall(100, 400, 30, 200, ctx))
obstacles.push(new Wall(100, 535, 80, 10, ctx))
obstacles.push(new Wall(250, 500, 50, 10, ctx))
obstacles.push(new Wall(280, 450, 50, 10, ctx))
obstacles.push(new Wall(100, 400, 30, 200, ctx))

//obstacles.push(new Wall(100, 400, 220, 30, ctx))
obstacles.push(new Wall(300, 400, 30, 145, ctx))
obstacles.push(new Wall(400, 450, 230, 30, ctx))
obstacles.push(new Wall(700, 450, 270, 30, ctx))

obstacles.push(new Wall(300, 390, 70, 30, ctx))
obstacles.push(new Wall(400, 325, 500, 10, ctx))
obstacles.push(new Wall(500, 200, 320, 10, ctx))
obstacles.push(new Wall(500, 200, 30, 70, ctx))
obstacles.push(new Wall(790, 200, 30, 70, ctx))
obstacles.push(new Wall(630, 300, 60, 30, ctx))

obstacles.push(new Wall(300, 200, 30, 150, ctx))


doors.push(new Door(310, 545, ctx))

doors.push(new Door(510, 270, ctx))
doors.push(new Door(800, 270, ctx))

windows.push(new Window(1300, 510, ctx))
windows.push(new Window(1300, 470, ctx))
windows.push(new Window(300, 350, ctx))



weaponGenerators.push(new WeaponGenerator(800, 590, ctx))
weaponGenerators.push(new WeaponGenerator(500, 440, ctx))
weaponGenerators.push(new WeaponGenerator(640, 290, ctx))


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

  if(pressedKeys[83]){
    player.layDown()
  } else if(player.isDown){
    player.stayUp()
    for(let obstacle of obstacles.concat(weaponGenerators).concat(windows)){
      if(player.intersects(obstacle)){
        player.y += 20
        player.layDown()
      }
    }
  }

  for(let obstacle of obstacles.concat(weaponGenerators).concat(windows)){
    if(player.intersects(obstacle)){
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

  for(let obstacle of obstacles.concat(weaponGenerators).concat(windows)){
    if(player.intersects(obstacle)){
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
}

function movePlayer2(){
  if(pressedKeys[37]){
    player2.moveLeft()
  }
  if(pressedKeys[39]){
    player2.moveRight()
  }
  if(pressedKeys[40]){
    player2.layDown()
  } else if(player2.isDown){
    player2.stayUp()
    for(let obstacle of obstacles.concat(weaponGenerators).concat(windows)){
      if(player2.intersects(obstacle)){
        player2.y += 20
        player2.layDown()
      }
    }
  }

  for(let obstacle of obstacles.concat(weaponGenerators).concat(windows)){
    if(player2.intersects(obstacle)){
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

  for(let obstacle of obstacles.concat(weaponGenerators).concat(windows)){
    if(player2.intersects(obstacle)){
      if(player2.verticalDirection == 'Up'){
        console.log("up")
        player2.y = obstacle.y + obstacle.height
        player2.speedY = 0
      } else {
        player2.y = obstacle.y - player2.height
        player2.speedY = 0
        player2.jumpAllowed = true
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
      player.health -= bullet.damage;
      bullets.splice(i, 1)
      if(player.health <= 0){
        stop(2)
      }
    }
    if(bullet.intersects(player2)){
      player2.health -= bullet.damage;
      bullets.splice(i, 1)
      if(player2.health <= 0){
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

function stop(num) {
  ctx.fillStyle = "black";
  ctx.font = "50px Arial";
  ctx.fillText("Game Over Player " + num + " Wins", 500, 300);
  clearInterval(interval);
}

function updateGameArea() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);

  movePlayer()

  movePlayer2()

  if(pressedKeys[32]){
    let bullet = player.fire()
    if(bullet){
      bullets.push(bullet)
    }
  }

  if(pressedKeys[16]){
    let bullet = player2.fire()
    if(bullet){
      bullets.push(bullet)
    }
  }

  checkBulletCollisions()
  checkDoorColissions()
  checkWeaponGeneratorCollisions()
  if(player.x + player.width < 0 || player.x > cvs.width || player.y + player.height < 0 || player.y > cvs.height){
    stop(2)
  }

  if(player2.x + player2.width < 0 || player2.x > cvs.width || player2.y + player2.height < 0 || player2.y > cvs.height){
    stop(1)
  }

  obstacles.forEach(o => o.update());
  doors.forEach(d => d.update());
  windows.forEach(w => w.update());
  weaponGenerators.forEach(w => w.update());
  player.update()
  player2.update()

  for(let i = 0; i < Math.abs(bulletSpeed/5); i++){
    bullets.forEach(b => b.update(Math.sign(b.speedX)*5));
    checkBulletCollisions()
  }

}

let interval = setInterval(updateGameArea, 20);
