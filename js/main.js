const TILE_X_SIZE = 5;
const TILE_Y_SIZE = 5;
const NUM_OF_BOMB = 5;
const TILE_WIDTH = 40;
const TILE_HEIGHT = 40;

window.onload = function(){
	for(var i=0;i<TILE_X_SIZE;i++){
		for(var j=0;j<TILE_Y_SIZE;j++){
			var tile = document.createElement("div");
			tile.className = "tile";
			tile.style.left = TILE_WIDTH * i + "px";
			tile.style.top = TILE_HEIGHT * j +"px";
			tile.style.width = TILE_WIDTH;
			tile.style.height = TILE_HEIGHT;
			tile.innerText = "";
			document.body.appendChild(tile);
		}
	}
}

function init(){

}

