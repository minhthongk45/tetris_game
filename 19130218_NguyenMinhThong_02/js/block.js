class block{
	constructor(game, col, row, color){		
		this.game = game;
		this.col = col;
		this.row = row;
		this.color = color;
	}
	drawMainScreen(){
		let _x = this.col * _SIZE;
		let _y = this.row * _SIZE;
		this.game.context.beginPath();
		this.game.context.strokeStyle = 'black';
		this.game.context.rect(_x, _y, _SIZE, _SIZE);
		this.game.context.stroke();
		this.game.context.fillStyle = this.color;
		this.game.context.fillRect(_x + 2, _y + 2, _SIZE - 4, _SIZE - 4);
	}
	drawNextScreen(){
		let _x = this.col * _NEXTSIZE;
		let _y = this.row * _NEXTSIZE;
		this.game.nextContext.beginPath();
		this.game.nextContext.strokeStyle = this.color;
		this.game.nextContext.rect(_x, _y, _NEXTSIZE, _NEXTSIZE);
		this.game.nextContext.stroke();

		this.game.nextContext.fillStyle = this.color;
		this.game.nextContext.fillRect(_x + 2, _y + 2, _NEXTSIZE - 4, _NEXTSIZE - 4);	
	}
	hitLeft(){
		return this.col === 0;
	}
	canMoveLeft(){
		if(!this.hitLeft() && this.game.board.emptyCell(this.col - 1, this.row)){
			return true;
		}else{
			return false;
		}
	}
	moveLeft(){
		if(this.canMoveLeft()){
				this.col--;
			}		
	}
	hitRight(){
		return this.col === _COLS - 1;
	}
	canMoveRight(){
		if(!this.hitRight() && this.game.board.emptyCell(this.col+1,this.row)){
			return true;
		}else {
			return false;
		}
	}
	moveRight(){
		if(this.canMoveRight()){
			this.col++;		
		}
	}
	hitBottom(){
		return this.row === _ROWS - 1;
	}
	canMoveDown(){
		if(!this.hitBottom() && this.game.board.emptyCell(this.col, this.row + 1)){
			return true;
		}else{ 
			return false;
		}
	}
	fall(){
		if(this.canMoveDown()){
			this.row++;
		}		
	}		
}