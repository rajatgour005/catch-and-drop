import { PLAYER } from "./player.js";
import { chars } from "./characters.js";
import { Emoji } from "./emj.js";
import { handleLife} from "./methods.js";


class Game{
    constructor(width,height,ctx,img){
        this.width = width
        this.height = height
        this.ctx = ctx
        this.scoreDis = document.getElementById("score")
        this.score = 0
        this.hScore = localStorage.getItem("hscore")||0
        this.frame = 0
        this.everyFrame = 100
        this.lscore = 10
        this.playerImg = img
        this.players = [new PLAYER(img,(width/2-60),height-10,60,width)]
        this.emoijis = [...chars,{img:img,type:"DP",value:4}]
        this.fallCharacter = []
        this.lifeCount = 3
        this.message = null
        this.mFram = 0
        this.isGameOver = false
    }

    animate(){
        this.ctx.clearRect(0,0,this.width,this.height)
        this.allPlayers()
        this.drawFallchars()
        this.frame +=1
        if(this.frame  === this.everyFrame ){
            this.addEmiji()
            this.frame = 0
        } 
        if(this.score >= this.lscore){
            this.everyFrame -= 5
            this.lscore *= 2
        }
        if(this.lifeCount===0){
            this.isGameOver =  true
            this.hLocal()
        }
    }

    addEmiji(){
        const emoji = this.emoijis[Math.floor(Math.random()*this.emoijis.length)]
        const positionX = Math.floor((Math.random()*((this.width-40)-10))+10)
        this.fallCharacter.push(
            new Emoji(emoji.img,positionX,-10,40,emoji.type,emoji.value)
        )
    }

    drawFallchars(){
        this.fallCharacter.forEach((char,index)=>{
            char.draw(this.ctx)
            char.update()

            this.players.forEach(player=>{
                if(player.colision(char.midPoint.x,char.midPoint.y)){
                    if(player.type === 'H'){
                        if(char.value > 0){
                            this.score += char.value
                            player.setMsg(char.value > 0 ? `+${char.value}` :`${char.value}`)
                        }
                    }
                    else{
                        this.score += char.value
                        player.setMsg(char.value > 0 ? `+${char.value}` :`${char.value}`)
                    }
                    this.scoreDis.innerText = `score:${this.score}`
                    switch(char.type){
                     case "E":
                         if(player.type!="H"){
                            this.lifeCount -= 1
                            handleLife("remove")
                            player.setMsg('-❤️')
                         }
                         break
                     case "L":
                         this.lifeCount +=1
                         handleLife("add")
                         player.setMsg('+❤️')
                         break
                     case "DP":
                        this.players.push(new PLAYER(this.playerImg,(this.width/2-60),this.height-10,60,this.width,"H"))
                         break
                    }
                    this.fallCharacter.splice(index,1)
                 }
            })
             
            if(char.gTouch(this.height))
             this.fallCharacter.splice(index,1)
        })
    }

    addEvent(){
        window.addEventListener("keydown",(e)=>{
            const {key} = e
            switch(key){
                case "ArrowRight":
                    this.players[0].moveRigth()
                    break
                case "ArrowLeft":
                    this.players[0].moveLeft()
                    break;
            }
        })
    }

    restart(){
        this.score = 0
        this.lifeCount = 3
        this.isGameOver = false
        this.fallCharacter = []
        this.everyFrame  = 100
        this.frame = 0
        handleLife("add")
        handleLife("add")
        handleLife("add")
    }

    allPlayers(){
        this.players.forEach((player,index)=>{
            player.draw(this.ctx)
            player.autoUpdate()
            player.drawMsg(this.ctx)
            if(player.isDelet())
            this.players.splice(index,1)
        })
    }

    hLocal(){
        if(this.score >= this.hScore){
            localStorage.setItem("hscore",this.score)
            this.hScore = this.score
        }
    }
}


export {Game}