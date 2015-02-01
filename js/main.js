var TILE_X_SIZE = 5;
var TILE_Y_SIZE = 5;
var NUM_OF_BOMB = 5;
const TILE_WIDTH = 40;
const TILE_HEIGHT = 40;



/////Tileクラス

/*

##プロパティ##
x:
y:
tile:
checked:
opened:
isBomb:
value:

##メソッド##
check:
open:

*/
var Tile = (function() {
  // constructor
  var Tile = function(x, y, elem,isBomb,value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.tile = elem;
    this.checked = false;
    this.opened = false;
    this.isBomb = isBomb;
  };

  var p = Tile.prototype;

  p.check = function(){
  	if(this.opened)return;
  	this.checked = !this.checked;
  	console.log(this.checked);
  	if(this.checked){
  		this.tile.style.backgroundColor = 'rgb(255, 241, 15)';
  	}else{
  		this.tile.style.backgroundColor = 'rgb(238, 238, 238)';
  	}
  }

  p.open = function(){
  	this.opened = true;
  	if(this.isBomb){
  		this.tile.style.backgroundColor = 'red';
  		console.log("out");
  	}else{
  		this.tile.innerText = this.value;
  		this.tile.style.backgroundColor = 'rgb(160, 160, 160)';
  		console.log("safe");
  	}


  }
  return Tile;
})();
/////


/////TileManager　クラス
/*

##プロパティ##
tiles: Array
finished: boolean

##メソッド##
addTile: 
getTile:
open:
check:
countOpenedTiles:

*/
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
  	var tile = this.getTile(Number(index));
  	if(tile.checked)return;
  	tile.open();
  	if(tile.isBomb || (tile.value != 0))return;
  	//タイルが0の時


  	var tilesToCheck = new Array();
  	var bombCount = 0;
  	tilesToCheck.push(this.getTile(Number(index) - TILE_X_SIZE -1));
  	tilesToCheck.push(this.getTile(Number(index) - TILE_X_SIZE));
  	tilesToCheck.push(this.getTile(Number(index) - TILE_X_SIZE + 1));
  	tilesToCheck.push(this.getTile(Number(index) - 1));
  	tilesToCheck.push(this.getTile(Number(index) + 1));
  	tilesToCheck.push(this.getTile(Number(index) + TILE_X_SIZE -1));
  	tilesToCheck.push(this.getTile(Number(index) + TILE_X_SIZE));
  	tilesToCheck.push(this.getTile(Number(index) + TILE_X_SIZE + 1));

  	if(index % TILE_X_SIZE == 0){
  		tilesToCheck[0] = false;
  		tilesToCheck[3] = false;
  		tilesToCheck[5] = false;
  	}else if(index % TILE_X_SIZE == (TILE_X_SIZE - 1)){
  		tilesToCheck[2] = false;
  		tilesToCheck[4] = false;
  		tilesToCheck[7] = false;
  	}
  	var self = this;
  	tilesToCheck.forEach(function(tile,index,array){
  		if(tile&&!tile.opened&&!tile.isBomb){
  			self.open(self.tiles.indexOf(tile));
  		}
  	});
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

  p.checkBombIsOpend = function(){
  	var bombIsOpened = false;
  	this.tiles.forEach(function(tile, index, array){
  		if(tile.opened && tile.isBomb) bombIsOpened = true;
  	});
  	return bombIsOpened;
  }


  return TileManager;
})();
/////	


/////GameManager　クラス
/*

##プロパティ##

tileManager: タイルマネージャーインスタンス
bombArray: Array
finished: boolean

##メソッド##
checkClear: 
 クリア判定

*/
var GameManager = (function() {

  // constructor
  var GameManager = function(tileManager_arg,bombArray_arg) {
  	this.tileManager = tileManager_arg;
  	this.bombArray = bombArray_arg;
  	this.finished = false;
  };

  var p = GameManager.prototype;

  p.checkGameState= function(){
  	if(this.finished)return;
  	var numOfSafeTiles = TILE_X_SIZE * TILE_Y_SIZE - NUM_OF_BOMB;
  	var opened = this.tileManager.countOpenedTIles();
  	var isGameOver = this.tileManager.checkBombIsOpend();
  	if(isGameOver){
  		this.finished = true;
  		alert("ゲームオーバー");
  	}else if(opened >= numOfSafeTiles){
  		this.finished = true;
  		alert("クリア");
  	}
  }

  //ユーティリティ
  p.getTileValue = function(index){
  	var tilesToCheck = new Array();
  	var bombCount = 0;
  	tilesToCheck.push(this.bombArray[index - TILE_X_SIZE -1]);
  	tilesToCheck.push(this.bombArray[index - TILE_X_SIZE]);
  	tilesToCheck.push(this.bombArray[index - TILE_X_SIZE + 1]);
  	tilesToCheck.push(this.bombArray[index - 1]);
  	tilesToCheck.push(this.bombArray[index + 1]);
  	tilesToCheck.push(this.bombArray[index + TILE_X_SIZE -1]);
  	tilesToCheck.push(this.bombArray[index + TILE_X_SIZE]);
  	tilesToCheck.push(this.bombArray[index + TILE_X_SIZE + 1]);
  	if(index % TILE_X_SIZE == 0){
  		tilesToCheck[0] = false;
  		tilesToCheck[3] = false;
  		tilesToCheck[5] = false;
  	}else if(index % TILE_X_SIZE == (TILE_X_SIZE - 1)){
  		tilesToCheck[2] = false;
  		tilesToCheck[4] = false;
  		tilesToCheck[7] = false;
  	}

  	tilesToCheck.forEach(function(tile,index,array){
  		if(tile){
  			bombCount ++;

  		}
  	});
  	console.log(tilesToCheck);
  	return bombCount;

  }

  return GameManager;
})();
/////	



var tileManager = new TileManager();
//爆弾の場所を格納する配列
var bombArray = new Array();

var gameManager = new GameManager(tileManager,bombArray);

window.onload = function(){
	//init();
}

function onButtonClick(){
	var columSelect = document.getElementById("num_of_colum");
	var bombSelect = document.getElementById("num_of_bomb");

	TILE_X_SIZE = Number(columSelect.options[columSelect.selectedIndex].value);
	TILE_Y_SIZE = Number(columSelect.options[columSelect.selectedIndex].value);

	NUM_OF_BOMB = Number(bombSelect.options[bombSelect.selectedIndex].value);
	init();

}

function init(){
	document.body.innerText = "";
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

			var tmptile = new Tile(j,i,tile,bombArray[index],gameManager.getTileValue(index));
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
			gameManager.checkGameState();
	
		    str = "left click";
		    break;
		case 1 :

		    str = "middle click";
		    break;
		case 2 :
			tileManager.check(this.id);
		    str = "right click";
   		break;
    }
}

