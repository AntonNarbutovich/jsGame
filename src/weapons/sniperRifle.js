export default function SniperRifle() {
  this.damage = 3;
  this.ammo = 3
  this.fireDelay = 100;
  this.curDelay = 0;
  this.fireSound = new Audio("audio/sniperFire.mp3")
  this.takeSound = new Audio("audio/sniperTake.mp3")
  this.image = new Image()
  this.image.src = "img/sniper.png"
}
