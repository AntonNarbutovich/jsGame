export default function Window(x, y, ctx) {
  this.width = 10;
  this.height = 40;
  this.color = 'rgb(56, 212, 255, 0.3)';
  this.sound = new Audio("audio/window.mp3")
  this.image = new Image()
  this.image.src = ""
  this.frame = 0;
  this.x = x;
  this.y = y;

  this.break = function(){
    this.sound.play()
    let wind = this
    requestAnimationFrame(function draw(){
      wind.image.src = "img/window" + Math.floor(wind.frame) + ".png"
      ctx.drawImage(wind.image, wind.x, wind.y, wind.width + 10, wind.height);
      wind.frame+=0.2
      if(wind.frame < 4){
        requestAnimationFrame(draw)
      }
    } )
  }

  // this.draw = function(a){
  //   console.log(a)
  //   this.image.src = "img/window" + this.frame + ".png"
  //   ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  //   this.frame++
  //   if(this.frame <= 4){
  //     requestAnimationFrame(this.draw)
  //   }
  // }

  this.intersects = function(obj){
    let leftSide = this.x
    let rightSide = this.x + this.width
    let topSide = this.y
    let bottomSide = this.y + this.height

    let objLeftSide = obj.x
    let objRightSide = obj.x + obj.width
    let objTopSide = obj.y
    let objBottomSide = obj.y + obj.height

    if((bottomSide <= objTopSide) || (topSide >= objBottomSide) || (rightSide <= objLeftSide) || (leftSide >= objRightSide)){
      return false
    }
    return true
  }

  this.update = function(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
