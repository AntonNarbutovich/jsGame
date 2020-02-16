export default function Gun() {
  this.ammo = 8;
  this.damage = 1;
  this.fireDelay = 35;
  this.curDelay = 0;
  this.fireSound = new Audio("audio/gunFire.mp3")
  this.takeSound = new Audio("audio/gunTake.mp3")
  this.image = new Image()
  this.image.src = "img/gun.png"
}
