export default function Shield() {
  this.takeSound = new Audio("audio/shieldTake.mp3")
  this.image = new Image()
  this.image.src = "img/shield.png"

  this.activate = function(player){
    player.shield += 1
    if(player.shield > 5){
      player.shield = 5
    }
  }
}
