import { text} from "./methods.js"

function Emoji(img,x,y,size,type,value){
    this.x = x
    this.y = y
    this.img = img
    this.size = size
    this.speed = Math.floor((Math.random()*2)+3)
    this.type = type
    this.value = value
    this.radius = 25
    this.midPoint = null
}

Emoji.prototype.draw = function (ctx){
    text(ctx,this.x,this.y,this.size,this.img)
}

Emoji.prototype.update = function(){
    this.y += this.speed
    this.midPoint = {
        x:this.x + (this.size/2)+4,
        y:this.y - (this.size/2)+4
    }
}

Emoji.prototype.gTouch= function(h){
    if(this.y > h )
     return true
    return false
}

export {Emoji}