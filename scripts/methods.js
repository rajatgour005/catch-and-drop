
function text(ctx,x,y,size,str,color="white"){
    ctx.font = `${size}px arial`
    ctx.fillStyle = color
    ctx.fillText(str,x,y)
}

function handleLife(type){
    const parent = document.getElementById("life")
    switch(type){
        case "add":
                const span = document.createElement("span")
                span.innerText = "❤️"
                parent.append(span)
            break
        case "remove":
                parent.children[parent.children.length-1].remove()
             break        
    }
}










export {text,handleLife}