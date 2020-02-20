export default function ShotGun() {
  this.damage = 1;
  this.ammo = 6
  this.fireDelay = 50;
  this.curDelay = 0;
  this.fireSound = new Audio("audio/shotgunFire.mp3")
  this.takeSound = new Audio("audio/shotgunTake.mp3")
  this.image = new Image()
  this.image.src = "img/shotgun.png"
  this.shotgun = true
}
