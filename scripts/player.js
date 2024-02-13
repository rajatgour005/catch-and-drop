import {text} from "./methods.js"

function PLAYER(img,x,y,size,width,type="main"){
    this.img = img
    this.x = x
    this.y = y
    this.size = size
    this.mSpeed = 20
    this.colDis = 60
    this.width = width
    this.type = type
    this.move = "r"
    this.tCount = 0
    this.frameCount = 0
    this.setframe = 10
    this.message = null
}

PLAYER.prototype.draw = function (ctx){
    text(ctx,this.x,this.y,this.size,this.img)
}

PLAYER.prototype.moveRigth = function(){
    this.x += this.mSpeed
    if(this.x > this.width - this.size)
    this.x = -10
}

PLAYER.prototype.moveLeft = function(){
    this.x -= this.mSpeed
    if(this.x < -20)
    this.x = this.width-this.size
}

PLAYER.prototype.autoUpdate = function(){
  if(this.type === 'H'){
    if(this.move==='r'){
        this.x += 3
        if(this.x > this.width - this.size){
           this.move = 'l'
           this.tCount +=1
        }
    }
    else{
        this.x -= 3
        if(this.x < -20)
         this.move = 'r'
    }
  }
}

PLAYER.prototype.colision = function(x,y){
    const cornerP = {x:this.x+5,y:this.y-(this.size)}
    const midPoint = {
        x:cornerP.x+((this.size+10)/2),
        y:cornerP.y+((this.size+10)/2)
    }
    const distance = Math.sqrt(Math.pow(midPoint.x-x,2)+Math.pow(midPoint.y-y,2))
    if(distance <= this.colDis) return true
}

PLAYER.prototype.isDelet = function (){
    if(this.tCount > 2)
     return true
    return false
}

PLAYER.prototype.drawMsg = function (ctx){
      if(this.message){
        text(ctx,this.x+40,this.y-55,20,this.message,"white")
        this.frameCount +=1
        if(this.frameCount===this.setframe){
            this.message = null
            this.frameCount = 0
        }
      }          
}

PLAYER.prototype.setMsg = function (msg){
    this.message = msg
}


export {PLAYER}