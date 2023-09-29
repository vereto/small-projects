const tilesContainer = document.querySelector(".tiles")
const colors = ["aqua","aquamarine", "crimson", "blue", "dodgerblue", "gold", "greenyellow", "teal"]
const colorsPichList = [...colors, ...colors];
const tileCount = colorsPichList.length;

//Game state
let revealedCount = 0;
let activeTile = null;
let awaitingEndOfMOve = false;

function buildTile(color) {
    const element = document.createElement("div");
    element.classList.add("tile");
    element.setAttribute("data-color", color);
    element.setAttribute("data-revealed", "false");

    element.addEventListener("click", () => {
        const revealed =element.getAttribute("data-revealed")

        if(awaitingEndOfMOve || revealed === "true" || element === activeTile){
            return;
        }

        element.style.backgroundColor = color;

        if(!activeTile){
            activeTile = element
            return; 
        }
        const colorToMatch = activeTile.getAttribute("data-color");

        if(colorToMatch === color){
            activeTile.setAttribute("data-revealed", "true");
            element.setAttribute("data-revealed", "true");
            awaitingEndOfMOve = false;
            activeTile = null;
            revealedCount += 2;

            if(revealedCount === tileCount){
                alert ("You winn. Please restart to play again")
            }return;

        }
        awaitingEndOfMOve = true;

        
        setTimeout(()=> {
            element.style.backgroundColor = null;
        activeTile.style.backgroundColor = null;

        awaitingEndOfMOve = false;
        activeTile = null;
        }, 1000);
    })

    return element;
}

//Build up Tiles
for(let i = 0; i < tileCount; i++){
    const randomIndex = Math.floor(Math.random() * colorsPichList.length);
    const color = colorsPichList[randomIndex];
    const tile = buildTile(color);

    colorsPichList.splice(randomIndex,1);
   tilesContainer.appendChild(tile);
    
}