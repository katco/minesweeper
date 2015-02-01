const TILE_X_SIZE = 5;
const TILE_Y_SIZE = 5;
const NUM_OF_BOMB = 5;
const TILE_WIDTH = 40;
const TILE_HEIGHT = 40;



/////Tileクラス
var Tile = (function() {
  // constructor
  var Tile = function(x, y, elem) {
    this.x = x;
    this.y = y;
    this.elem = elem;
    this.checked = false;
  };

  var p = Tile.prototype;

  p.check = function(){
  	this.checked = !this.checked;
  	if(this.checked){

  	}else{

  	}
  }
  return Tile;
})();
/////

/////Tile manage　クラス
var TileManager = (function() {

  // constructor
  var TileManager = function() {
    this.tiles = new Array();
  };

  var p = TileManager.prototype;

  p.addTile = function(tile) {
  	this.tiles.push(tile);
  };

  p.get = function(index){
  	console.log(this.tiles[Number(index)]);
  	this.tiles[index];
  }

  return TileManager;
})();
/////	
var tileManager = new TileManager();


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
			tile.addEventListener('mousedown', clickEvent , false);
			index ++;
			document.body.appendChild(tile);

			var tmptile = new Tile(j,i,tile);
			tileManager.addTile(tmptile);
		}
	}
}

function clickEvent(e){
	var str = "";
	switch (e.button) {
		case 0 :
		    str = "left click";
		    break;
		case 1 :
		    str = "middle click";
		    break;
		case 2 :
		    str = "right click";
   		break;
    }
	console.log(tileManager.get(this.id));
}

