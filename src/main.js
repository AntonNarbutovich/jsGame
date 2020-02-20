import Grenade from "./weapons/grenade.js"
import buildLevel from "./levels/levels.js"
import {gravity, bulletSpeed, grenadeImage, strengthImage} from "./values.js"

let interval = null

let player1Wins = 0
let player2Wins = 0

let pressedKeys = []
let bullets = []
let grenades = []
let win = null

let player = []
let player2 = []

let obstacles = []
let frontWalls = []
let doors = []
let steelDoors = []
let weaponGenerators = []
let windows = []
let bonusGenerators = []
let trampolins = []
let tables = []
let backgroundImage = []

const cvs = document.getElementById("game")
const ctx = cvs.getContext("2d")


document.addEventListener('keydown', function (e) {
  pressedKeys[e.keyCode] = true;
})
document.addEventListener('keyup', function (e) {
  pressedKeys[e.keyCode] = false;
})

function newGame(level){
  pressedKeys = []
  bullets = []
  grenades = []
  win = null

  let objects = buildLevel(level, ctx)

  player = objects[0]
  player2 = objects[1]

  obstacles = objects[2]
  frontWalls = objects[3]
  doors = objects[4]
  steelDoors = objects[5]
  weaponGenerators = objects[6]
  windows = objects[7]
  bonusGenerators = objects[8]
  trampolins = objects[9]
  tables = objects[10]
  backgroundImage = objects[11]


  let music = new Audio("audio/backgroundMusic.mp3")
  music.volume = 0.2
  music.loop = true
  //music.play()

  clearInterval(interval);
  interval = setInterval(updateGameArea, 20);
}

function movePlayer(){
  if(pressedKeys[65]){
    player.moveLeft()
  }
  if(pressedKeys[68]){
    player.moveRight()
  }

  if(pressedKeys[70]){
    for(let table of tables.concat(steelDoors)){
      if(table.closeTo(player) && table.curDelay == 0){
        table.changeState()
      }
    }
  }

  if(pressedKeys[32]){
    let bullet = player.fire()
    if(bullet){
      bullets = bullets.concat(bullet)
    }
  }

  if(pressedKeys[71]){
    let grenade = player.throwGrenade()
    if(grenade){
      grenades.push(grenade)
    }
  }

  for(let obstacle of obstacles.concat(weaponGenerators).concat(bonusGenerators).concat(windows).concat(trampolins).concat(tables).concat(steelDoors)){
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

  for(let obstacle of obstacles.concat(weaponGenerators).concat(bonusGenerators).concat(windows).concat(trampolins).concat(tables).concat(steelDoors)){
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
    for(let obstacle of obstacles.concat(weaponGenerators).concat(bonusGenerators).concat(windows).concat(trampolins).concat(tables).concat(steelDoors)){
      if(obstacle.intersects(player)){
        player.x -= 20
        //player.layDown()
      }
    }

  } else if(player.isDown){
    player.stayUp()
    for(let obstacle of obstacles.concat(weaponGenerators).concat(bonusGenerators).concat(windows).concat(trampolins).concat(tables).concat(steelDoors)){
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

 if(pressedKeys[16]){
    let bullet = player2.fire()
    if(bullet){
      bullets.push(bullet)
    }
  }

  if(pressedKeys[191]){
     let grenade = player2.throwGrenade()
     if(grenade){
       grenades.push(grenade)
     }
   }

  for(let obstacle of obstacles.concat(weaponGenerators).concat(bonusGenerators).concat(windows).concat(trampolins).concat(tables).concat(steelDoors)){
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

  for(let obstacle of obstacles.concat(weaponGenerators).concat(bonusGenerators).concat(windows).concat(trampolins).concat(tables).concat(steelDoors)){
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
    for(let obstacle of obstacles.concat(weaponGenerators).concat(bonusGenerators).concat(windows).concat(trampolins).concat(tables).concat(steelDoors)){
      if(obstacle.intersects(player2)){
        player2.x -= 20
        player2.layDown()
      }
    }
  } else if(player2.isDown){
    player2.stayUp()
    for(let obstacle of obstacles.concat(weaponGenerators).concat(bonusGenerators).concat(windows).concat(trampolins).concat(tables).concat(steelDoors)){
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
    for(let obstacle of obstacles.concat(tables).concat(doors).concat(steelDoors)){
      if(obstacle.intersects(bullet)){
        bullets.splice(i, 1)
        break
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

    for(let obstacle of obstacles.concat(weaponGenerators).concat(bonusGenerators).concat(tables).concat(doors).concat(steelDoors)){
      if(obstacle.intersects(grenades[i])){
        grenades[i].hitSound.play()
        grenades[i].x -= grenades[i].speedX
        grenades[i].speedX = -grenades[i].speedX/2
        break;
      }
    }

    grenades[i].y += grenades[i].speedY

    for(let obstacle of obstacles.concat(weaponGenerators).concat(bonusGenerators).concat(tables).concat(doors).concat(steelDoors)){
      if(obstacle.intersects(grenades[i])){
        grenades[i].hitSound.play()
        grenades[i].y -= grenades[i].speedY
        grenades[i].speedY = -grenades[i].speedY/2
        break;
      }
    }

    for(let j = 0; j < windows.length; j++){
      if(grenades[i].intersects(windows[j])){
        windows[j].break()
        windows.splice(j, 1)
      }
    }
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
}

function checkTableCollisions(){
  for(let table of tables.concat(steelDoors)){
    if(table.curDelay > 0){
      table.curDelay += 1
      if(table.curDelay >= table.delay){
        table.curDelay = 0
      }
    }
  }
}

function drawPlayerInterface(){
  ctx.fillStyle = 'black'
  ctx.fillRect(0, cvs.height - 60, 300, 60)

  ctx.fillStyle = 'white'
  ctx.fillRect(5, cvs.height - 55, 290, 50)

  ctx.fillStyle = 'black'
  ctx.fillRect(100, cvs.height - 60, 5, 60)
  ctx.fillRect(200, cvs.height - 60, 5, 60)

  ctx.font = "20px Arial";
  if(player.weapon){
    ctx.drawImage(player.weapon.image, 10, cvs.height - 50, 50, 40);
    ctx.fillText(player.weapon.ammo, 70, cvs.height - 25);
  }

  ctx.drawImage(grenadeImage, 110, cvs.height - 50, 40, 40);
  ctx.fillText(player.grenades, 160, cvs.height - 25);

  ctx.drawImage(strengthImage, 210, cvs.height - 50, 40, 40);
  ctx.fillText(player.additionalDamage, 260, cvs.height - 25);

  ctx.font = "50px Arial";
  ctx.fillText(player1Wins, 310, cvs.height - 15);


/////////

  ctx.fillStyle = 'black'
  ctx.fillRect(cvs.width - 300, cvs.height - 60, 300, 60)

  ctx.fillStyle = 'white'
  ctx.fillRect(cvs.width - 295, cvs.height - 55, 290, 50)

  ctx.fillStyle = 'black'
  ctx.fillRect(cvs.width - 100, cvs.height - 60, 5, 60)
  ctx.fillRect(cvs.width - 200, cvs.height - 60, 5, 60)

  ctx.font = "20px Arial";
  if(player2.weapon){
    ctx.drawImage(player2.weapon.image, cvs.width - 290, cvs.height - 50, 50, 40);
    ctx.fillText(player2.weapon.ammo, cvs.width - 230, cvs.height - 25);
  }

  ctx.drawImage(grenadeImage, cvs.width - 190, cvs.height - 50, 40, 40);
  ctx.fillText(player2.grenades, cvs.width - 140, cvs.height - 25);

  ctx.drawImage(strengthImage, cvs.width - 90, cvs.height - 50, 40, 40);
  ctx.fillText(player2.additionalDamage, cvs.width - 40, cvs.height - 25);

  ctx.font = "50px Arial";
  ctx.fillText(player2Wins, cvs.width - 340, cvs.height - 15);
}

function stop(num) {
  win = num
  switch (num) {
    case 1:
      player1Wins++
      break;
    case 2:
      player2Wins++
      break;

  }
  setTimeout(clear, 100)
}

function clear(){
  ctx.fillStyle = "red";
  ctx.font = "100px Arial";
  ctx.fillText("Game Over Player " + win + " Wins", 200, 300);
  clearInterval(interval);
  interval = setInterval(restart, 20);
}

function restart(){
  if(pressedKeys[82]){
    newGame(1)
  }
}

function updateGameArea() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  ctx.drawImage(backgroundImage, 0, 0, cvs.width, cvs.height)

  movePlayer()
  movePlayer2()

  checkBulletCollisions()
  checkDoorColissions()
  checkWeaponGeneratorCollisions()
  checkBonusesCollisions()
  checkGrenadesCollisions()
  checkTrampolineCollisions()
  checkTableCollisions()

  if(player.x + player.width < 0 || player.x > cvs.width || player.y + player.height < 0 || player.y > cvs.height){
    stop(2)
  }

  if(player2.x + player2.width < 0 || player2.x > cvs.width || player2.y + player2.height < 0 || player2.y > cvs.height){
    stop(1)
  }

  obstacles.forEach(o => o.update());
  doors.forEach(d => d.update());
  steelDoors.forEach(d => d.update());
  windows.forEach(w => w.update());
  grenades.forEach(g => g.update());
  weaponGenerators.forEach(w => w.update());
  bonusGenerators.forEach(b => b.update());
  trampolins.forEach(t => t.update());
  tables.forEach(t => t.update());

  player.update()
  player2.update()

  frontWalls.forEach(w => w.update())

  for(let i = 0; i < Math.abs(bulletSpeed/5); i++){
    bullets.forEach(b => b.update(Math.sign(b.speedX)*5));
    checkBulletCollisions()
  }

  drawPlayerInterface()
}

newGame(1)
