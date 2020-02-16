export default function AssaultRifle() {
  this.damage = 1;
  this.ammo = 20
  this.fireDelay = 10;
  this.curDelay = 0;
  this.fireSound = new Audio("audio/ARFire.mp3")
  this.takeSound = new Audio("audio/ARTake.mp3")
  this.image = new Image()
  this.image.src = "img/ar.png"
}
