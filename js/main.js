const TILE_X_SIZE = 5;
const TILE_Y_SIZE = 5;
const NUM_OF_BOMB = 5;
const TILE_WIDTH = 40;
const TILE_HEIGHT = 40;

/////Tileクラス
function Tile(_x,_y,_elem)
{
    // プロパティ
    this.x = x;
    this.y = _y;
    this.elem = _elem;

}
var Tile = (function() {


  // constructor
  var Tile = function(x, y, elem) {
    this.x = x;
    this.y = y;
    this.elem = elem;
  };

  var p = Tile.prototype;

  // p.f1 = function() {
  //   return true;
  // };

  return Tile;
})();
/////

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
	console.log(str);
}

