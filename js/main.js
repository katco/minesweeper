const TILE_X_SIZE = 5;
const TILE_Y_SIZE = 5;
const NUM_OF_BOMB = 5;
const TILE_WIDTH = 40;
const TILE_HEIGHT = 40;



window.onload = function(){
	init();
}

function init(){
	//右クリックのデフォルトの挙動のキャンセル
	document.addEventListener("contextmenu", function(e){
		e.preventDefault();
	}, false);
	
	//タイルの生成、初期化
	var index = 0;
	for(var i=0;i<TILE_Y_SIZE;i++){
		for(var j=0;j<TILE_X_SIZE;j++){
			var tile = document.createElement("div");
			tile.className = "tile";
			tile.style.top = TILE_HEIGHT * i +"px";
			tile.style.left = TILE_WIDTH * j + "px";
			tile.style.width = TILE_WIDTH;
			tile.style.height = TILE_HEIGHT;
			tile.id = index;
			tile.innerText = "";
			tile.addEventListener('click', clickEvent , false);
			index ++;
			document.body.appendChild(tile);
		}
	}
}

function clickEvent(e){
	console.log(this);
}

