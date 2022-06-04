const _WIDTH = 200;
const _HEIGHT = 400;
const _COLS = 10;
const _ROWS = 20;
const _SIZE = 20;

const _NEXTWIDTH = 90;
const _NEXTHEIGHT =75;
const _NEXTCOLS = 6;
const _NEXTROWS = 5;
const _NEXTSIZE = 15;

const _ = null;
const x = "x";
var _colorBw = 'white';
var _colorBr = 'black';
var _colorBl = 'black';

const _BaseBrick = [
					[
						[x,x,x,x]
					],
					[
						[x,x],
						[x,x]
					],
					[
						[x,x,x],
						[0,0,x]
					],
					[
						[0,0,x],
						[x,x,x]
					],
					[
						[x,0],
						[x,x],
						[0,x]
					],
					[
						[0,x],
						[x,x],
						[x,0]
					],
					[
						[x,x,x],
						[0,x,0]
					],
				];
				
class board{
	constructor(game){
		this.game = game;
		this.data = [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
			];
		this.nextData =[ 
			[0,0,0,0,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0],
			[0,0,0,0,0,0]
		];
		this.rowDestroy = 0;
		this.countSpeed = 0;
	}
	resetNextData(){
		for(let r = 0; r< this.nextData.length;r++){
			for(let c = 0; c < this.nextData[0].length;c++){
				this.nextData[r][c] = 0;
			}
		}
	}
	emptyCell(c, r){
		return this.data[r][c] === 0;
	}
	drawBackground(){		
		this.drawMainScreen();
		this.drawNextScreen();
	}
	drawMainScreen(){
		for(let r = 0; r < this.data.length; r++){
			for(let c = 0; c < this.data[0].length; c++){
				let cl = _colorBw;
				if(this.data[r][c] === x){
					cl = _colorBr;
				}
				let bl = new block(this.game, c, r, cl);
				bl.drawMainScreen();				
			}
		}
	}
	drawNextScreen(){
		for(let r = 0; r < this.nextData.length; r++){
			for(let c = 0; c < this.nextData[0].length; c++){
				let cl = "gray";
				if(this.nextData[r][c] === x){
					cl = "black";
				}
				let bl = new block(this.game, c, r, cl);
				bl.drawNextScreen();				
			}
		}
	}
	checkFullRow(r){
		let isFull = true;
		for(let c = 0; c < this.data[r].length; c++){
			if(this.data[r][c] === 0){
				isFull = false;
				break;
			}
		}
		return isFull;
	}
	checkEndGame(){
		let endGame = false;
		for(let c =0; c < this.data[0].length; c++){
			if(this.data[0][c] === x){
				endGame = true;
				alert("game over");
				break;
			}
		}
		return endGame;
	}
	updateBoard(){
		for(let r = 0; r < _ROWS; r++){
			if(this.checkFullRow(r)){
				this.data.splice(r,1);
				this.data.unshift([0,0,0,0,0,0,0,0,0,0]);
				this.rowDestroy+=1;
				this.countSpeed+=1;
			}
		}
		if(this.checkEndGame()){
			clearInterval(this.game.status);
		}
		if(this.countSpeed == 10){
			this.game.speed -= 100;
			this.countSpeed = 0;
			clearInterval(this.game.status);
			this.game.status = this.game.startGame();
		}
		const score = document.getElementById('txt_score').value = this.rowDestroy;
		if(document.getElementById('txt_choselevel').value == 0){
			if(score < 5){
				document.getElementById('txt_level').value = 0;
				document.getElementById("cslv").innerHTML = "Level 0";
				document.getElementById('cslv').style.display = "block";
				this.data.slice(10,1,[0,0,0,x,0,0,0,0,0,0]);
			} else if (score < 10) {
				document.getElementById('txt_level').value = 1;	
				document.getElementById("cslv").innerHTML = "Level 1";
				document.getElementById('cslv').style.display = "block";
				document.getElementById('nextScreen').style.display = "none";
			} else if (score < 15)  {
				document.getElementById('txt_level').value = 2;
				document.getElementById("cslv").innerHTML = "Level 2";
				document.getElementById('cslv').style.display = "block";
				setInterval(()=>{
					_colorBl = "black";
				}, 500)
				setInterval(()=>{
					_colorBl = "white";
				}, 1000)
			} else if (score < 20) {
				document.getElementById('txt_level').value = 3;
				document.getElementById("cslv").innerHTML = "Level 3";
				document.getElementById('cslv').style.display = "block";
				setInterval(()=>{
					_colorBr = "black";
				}, 250)
				setInterval(()=>{
					_colorBr = "white";
				}, 750)
			} else if (score < 25) {
				document.getElementById('txt_level').value = 4;
				document.getElementById("cslv").innerHTML = "Level 4";
				document.getElementById('cslv').style.display = "block";
				setInterval(()=>{
					_colorBw = "black";
				}, 500)
				setInterval(()=>{
					_colorBw = "white";
				}, 1000)
			} else if (score < 30){
				document.getElementById('txt_level').value = 5;
				document.getElementById("cslv").innerHTML = "Level 5";
				document.getElementById('cslv').style.display = "block";
				setInterval(()=>{	
					this.brick.rotateBrick();		
				}, 500);
			}
		}		
	}	
}
