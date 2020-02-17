export default function DamageBonus() {
  this.takeSound = new Audio("audio/damageBonusTake.mp3")
  this.image = new Image()
  this.image.src = "img/damageBonus.png"

  this.activate = function(player){
    player.additionalDamage += 1
  }
}
