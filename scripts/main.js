import { Game } from "./game.js"


const handleStart  = (hero)=>{
    // setup canvas
    const canvas = document.getElementById("canvas")
    const CTX = canvas.getContext("2d")
    const canvasWidth = canvas.width = window.innerWidth/2
    const canvasHeight = canvas.height = window.innerHeight
    canvas.style.backgroundColor = "black"     
    
    const gameContainer = document.getElementById("game-container")
    const canvasContainer = document.getElementById("canvas-container")
    const restartContainer = document.getElementById("restart-container")
    const game = new Game(canvasWidth,canvasHeight,CTX,hero)

    let animationId = null
    gameContainer.style.display = "none"
    canvasContainer.style.display = "grid"
    game.addEvent()
    
    const animate = ()=>{
        CTX.clearRect(0,0,canvasWidth,canvasHeight)
        game.animate()
        animationId = requestAnimationFrame(animate)
        if(game.isGameOver){
            const dscore = document.getElementById("dscore")
            const hscore = document.getElementById("hscore")
            const restartBtn = document.getElementById("restart")
            cancelAnimationFrame(animationId)
            canvasContainer.style.display = "none"
            restartContainer.style.display = "grid"
            dscore.innerText = `score:${game.score}`
            hscore.innerText = `highscore:${game.hScore}`
            restartBtn.onclick = ()=>{
                game.scoreDis.innerText = `score:0`
                game.restart()
                canvasContainer.style.display = "grid"
                restartContainer.style.display = "none"
                animate()
            }
        }
    }
    
    animate()
}


export {handleStart}