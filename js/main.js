const TILE_X_SIZE = 5;
const TILE_Y_SIZE = 5;
const NUM_OF_BOMB = 5;
const TILE_WIDTH = 40;
const TILE_HEIGHT = 40;



/////Tileクラス
var Tile = (function() {
  // constructor
  var Tile = function(x, y, elem,isBomb) {
    this.x = x;
    this.y = y;
    this.tile = elem;
    this.checked = false;
    this.opened = false;
    this.isBomb = isBomb;
  };

  var p = Tile.prototype;

  p.check = function(){
  	this.checked = !this.checked;
  	console.log(this.checked);
  	if(this.checked){
  		this.tile.style.backgroundColor = 'rgb(255, 241, 15)';
  	}else{
  		this.tile.style.backgroundColor = 'rgb(238, 238, 238)';
  	}
  }

  p.open = function(){
  	if(this.checked)return;
  	this.opened = true;
  	if(this.isBomb){
  		this.tile.style.backgroundColor = 'red';
  		console.log("out");
  	}else{
  		this.tile.style.backgroundColor = 'rgb(160, 160, 160)';
  		console.log("safe");
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

  p.getTile = function(index){
  	return this.tiles[Number(index)];
  }

  p.open = function(index){
  	this.getTile(Number(index)).open();
  }

  p.check = function(index){
  	this.getTile(Number(index)).check();
  }

  p.countOpenedTIles = function(){
  	var count = 0;
  	this.tiles.forEach(function(tile, index, array){
  		if(tile.opened) count ++;
  	});
  	return count;
  }

  return TileManager;
})();
/////	


/////GameManager　クラス
var GameManager = (function() {

  // constructor
  var GameManager = function(tileManager_arg,bombArray_arg) {
  	this.tileManager = tileManager_arg;
  	this.bombArray = bombArray_arg;
  };

  var p = GameManager.prototype;

  p.checkClear = function(){
  	var numOfSafeTiles = TILE_X_SIZE * TILE_Y_SIZE - NUM_OF_BOMB;
  	var opened = this.tileManager.countOpenedTIles();
  	return opened >= numOfSafeTiles;
  }

  return GameManager;
})();
/////	



var tileManager = new TileManager();
//爆弾の場所を格納する配列
var bombArray = new Array();

var gameManager = new GameManager(tileManager,bombArray);

window.onload = function(){
	init();
}

function init(){
	//右クリックのデフォルトの挙動のキャンセル
	document.addEventListener("contextmenu", function(e){
		e.preventDefault();
	}, false);

	var numOfTile  = TILE_X_SIZE * TILE_Y_SIZE;
	//はじめのNUM_OF_BOMB個に爆弾を入れる
	for(var i=0;i<numOfTile;i++){
		if(i<NUM_OF_BOMB){
			bombArray.push(true);
		}else{
			bombArray.push(false);
		}
	}

	//上で作った配列の中身をランダムに並び替える
	//並び替えなので、数字は重複しません
	for(var j = numOfTile - 1; j >= 0; j--) {
		var r = Math.floor(Math.random() * numOfTile);
		var tmp = bombArray[j];
		bombArray[j] = bombArray[r];
		bombArray[r] = tmp;
	}
	console.log(bombArray);

	
	//タイルの生成、初期化
	var index = 0;

	for(var i=0;i<TILE_Y_SIZE;i++){
		for(var j=0;j<TILE_X_SIZE;j++){
			var tile = document.createElement("div");
			var tileText = "0";
			tile.className = "tile";
			tile.style.top = TILE_HEIGHT * i +"px";
			tile.style.left = TILE_WIDTH * j + "px";
			tile.style.width = TILE_WIDTH;
			tile.style.height = TILE_HEIGHT;
			tile.id = index;
			tile.innerText = "";
			tile.addEventListener('mousedown', clickEvent , false);
			document.body.appendChild(tile);

			var tmptile = new Tile(j,i,tile,bombArray[index]);
			tileManager.addTile(tmptile);
			index ++;
		}
	}
}

function clickEvent(e){
	var str = "";

	switch (e.button) {
		case 0 :
			tileManager.open(this.id);
			console.log(gameManager.checkClear());
		    str = "left click";
		    break;
		case 1 :

		    str = "middle click";
		    break;
		case 2 :
			tileManager.check(this.id);
			tileManager.countOpenedTIles();
		    str = "right click";
   		break;
    }
}

