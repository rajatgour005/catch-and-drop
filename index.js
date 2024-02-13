import { handleStart } from "./scripts/main.js"

const players = document.getElementsByClassName("player")
const startBtn = document.getElementById("start-btn")
const rules = document.getElementById("rules-btn")
const popup = document.getElementById("rules-popup")
const closePopup = document.getElementById("close-rules")
let hero = "🦸"

for(let i=0;i<players.length;i++){
    players[i].onclick = ()=>{
        hero = players[i].innerText
        splayer(i)
    }
}

function splayer(index){
     for(let i=0;i<players.length;i++){
         if(i!==index){
            players[i].style.border = "none"
         }
         else{
            players[i].style.border = "2px solid black"
         }
    }       
}

startBtn.addEventListener("click",()=>{
    handleStart(hero)   
})

rules.addEventListener("click",()=>{
   popup.style.display = "flex"
})

closePopup.addEventListener("click",()=>{
    popup.style.display = "none"
})