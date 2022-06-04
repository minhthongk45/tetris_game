class brick{
	constructor(game,col,row){
		console.log('build brick');
		this.game = game;
		this.col = col;
		this.row = row;
		this.data = [];
		this.blocks = [];
		this.randomBrick();
	}
	randomBrick(){
		this.data = [];		
		let index = Math.floor(Math.random() * 7);
		this.data = _BaseBrick[index];
	}
	builBrick(){
		this.blocks = [];
		for(let r = 0; r < this.data.length; r++){
			for(let c = 0; c < this.data[0].length; c++){
				if(this.data[r][c] === x){
					let bl = new block(this.game, this.col + c, this.row + r,_colorBl);
					this.blocks.push(bl);
				}
			}
		}
	}
	drawBrickToNextScreen(){
		this.game.board.resetNextData();
		for(let r = 0; r < this.data.length; r++){
			for(let c = 0; c < this.data[0].length; c++){
				if(this.data[r][c] === x){
					this.game.board.nextData[r + 1][c + 1] = x;
				}
			}
		}
	}
	drawBrickMainScreen(){
		this.builBrick();
		this.blocks.forEach((bl)=>bl.drawMainScreen());
	}
	rotateBrick(){
		let canRotate = true;
		let _newBrick = [];
		for(let c = 0 ; c < this.data[0].length; c++){
			let _r = [];
			for(let r = this.data.length - 1; r >=0; r--){
				_r.push(this.data[r][c]);
			}
			_newBrick.push(_r);
		}
		let oldCol = this.col;
		
		if((this.col + _newBrick[0].length) > _COLS - 1){
			this.col = _COLS - _newBrick[0].length;
		}
		
		if((this.row + _newBrick.length) < _ROWS){
			for(let _r = 0; _r < _newBrick.length; _r++){
				for(let _c = 0; _c < _newBrick[0].length; _c++){
					if(_newBrick[_r][_c] === x){
						if(!this.game.board.emptyCell(this.col + _c, this.row + _r)){
							canRotate = false;
							break;
						}
					}
				}
			}

		}else{
			canRotate = false;
		}
		if(canRotate){
			this.data = _newBrick;	
			
		}else{
			this.col = oldCol;
		}
		this.builBrick();		
		
	}
	canMoveRight(){
		let canmoveRight = true;
		for(let i = 0; i < this.blocks.length; i++){
			if(!this.blocks[i].canMoveRight()){
				canmoveRight = false;
				break;
			}
		}
		return canmoveRight;
	}
	moveRight(){
		if(this.canMoveRight()){
			this.col++;
			this.builBrick();
		}
	}
	canMoveLeft(){
		let canmoveleft = true;
		for(let i = 0; i < this.blocks.length; i++){
			if(!this.blocks[i].canMoveLeft()){
				canmoveleft = false;
				break;
			}
		}
		return canmoveleft;
	}
	moveLeft(){
		if(this.canMoveLeft()){
			this.col--;
			this.builBrick();
		}
	}
	canFall(){
		let canfall = true;
		for(let i = 0; i < this.blocks.length; i++){
			if(!this.blocks[i].canMoveDown()){
				canfall = false;
				break;
			}
		}
		return canfall;
	}
	fall(){
		if(this.canFall()){
			this.row++;
			this.builBrick();
		}else{
			this.appendToBoard();
			this.game.board.updateBoard();
			this.game.startNextBrick();			
			this.game.createNextBrick();
		}
	}
	down(){
		while (this.canFall()) {
			this.fall();
		}
	}
	appendToBoard(){
		for(let i = 0 ; i< this.blocks.length; i++){
			let c = this.blocks[i].col;
			let r = this.blocks[i].row;
			this.game.board.data[r][c] = x;
		}
	}
}
