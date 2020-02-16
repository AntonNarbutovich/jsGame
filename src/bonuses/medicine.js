export default function Medicine() {
  this.takeSound = new Audio("audio/medicineTake.mp3")
  this.image = new Image()
  this.image.src = "img/medicine.png"

  this.activate = function(player){
    player.health += 3
    if(player.health > 5){
      player.health = 5
    }
  }
}
