class game{
	constructor(){
		console.log('game start');
		this.canvas = null;
		this.context = null;

		this.nextCanvas = null;
		this.nextContext = null;

		this.btnStart = null;
		this.btnResume = null;		
		this.btnPause = null;
		this.status = null;	
		this.speed = 1000;
		this.init();		
		this.eventListener();
		this.loop();
	}
	eventListener(){
		document.addEventListener('keydown', (event)=>{					
			if(this.status != null){
							switch(event.key) {
								case 'ArrowUp':
									this.brick.rotateBrick();
									break;
								case 'ArrowDown':
								this.brick.down();
									break;
								case 'ArrowLeft':
									this.brick.moveLeft();								
									break;
								case 'ArrowRight':
									this.brick.moveRight();
									break;
							};
				}
		} );
		this.btnStart.addEventListener('click', (event)=>{
			let status = event.srcElement.attributes.status.value;
			if(status === 'start'){
				this.status = this.startGame();
				document.getElementById("btn_start").style.display = "none";
				document.getElementById("btn_resume").style.display = "block";
				document.getElementById("btn_pause").style.display = "block";
				if(document.getElementById('txt_choselevel').value == 1){
					document.getElementById("cslv").innerHTML = "Level 1";
					document.getElementById('cslv').style.display = "block";
					document.getElementById('txt_level').style.display = "none";
					document.getElementById('nextScreen').style.display = "none";

				} else if(document.getElementById('txt_choselevel').value == 2){
					document.getElementById("cslv").innerHTML = "Level 2";
					document.getElementById('cslv').style.display = "block";
					document.getElementById('txt_level').style.display = "none";
					document.getElementById('nextScreen').style.display = "none";
					setInterval(()=>{
						_colorBl = "black";
					}, 500)
					setInterval(()=>{
						_colorBl = "white";
					}, 1000)

				}else if(document.getElementById('txt_choselevel').value == 3){
					document.getElementById("cslv").innerHTML = "Level 3";
					document.getElementById('cslv').style.display = "block";
					document.getElementById('txt_level').style.display = "none";
					document.getElementById('nextScreen').style.display = "none";
					setInterval(()=>{
						_colorBl = "black";
						_colorBr = "black";
					}, 500)
					setInterval(()=>{
						_colorBl = "white";
						_colorBr = "white";
					}, 1000)
				}else if(document.getElementById('txt_choselevel').value == 4){
					document.getElementById("cslv").innerHTML = "Level 4";
					document.getElementById('cslv').style.display = "block";
					document.getElementById('txt_level').style.display = "none";
					document.getElementById('nextScreen').style.display = "none";
					setInterval(()=>{
						_colorBw = "black";
					}, 200)
					setInterval(()=>{
						_colorBw = "white";
					}, 400)
				}else if(document.getElementById('txt_choselevel').value == 5){
					document.getElementById("cslv").innerHTML = "Level 5";
					document.getElementById('cslv').style.display = "block";
					document.getElementById('txt_level').style.display = "none";
					setInterval(()=>{	
						this.brick.rotateBrick();		
					}, 500);
				}
			}
		});
		this.btnResume.addEventListener('click', (event)=>{
			let status = event.srcElement.attributes.status.value;
			if(status === 'resume'){
				this.status = this.startGame();
				document.getElementById("pause-tt").style.display = "none";
			}
		});
		this.btnPause.addEventListener('click', (event)=>{
			let status = event.srcElement.attributes.status.value;
			if(status === 'pause'){
				clearInterval(this.status);
				this.status = null;
				document.getElementById("pause-tt").style.display = "block";
			}
		});
	}
	init(){
		this.btnStart = document.getElementById('btn_start');
		this.btnResume = document.getElementById('btn_resume');
		this.btnPause = document.getElementById('btn_pause');

		this.canvas = document.createElement('canvas');
		this.canvas.width = _WIDTH;
		this.canvas.height = _HEIGHT;
		this.context = this.canvas.getContext('2d');
		document.getElementById('mainScreeen').appendChild(this.canvas);

		this.nextCanvas = document.createElement('canvas');
		this.nextCanvas.width = _NEXTWIDTH;
		this.nextCanvas.height = _NEXTHEIGHT;
		this.nextContext = this.nextCanvas.getContext('2d');
		document.getElementById('nextScreen').appendChild(this.nextCanvas);

		this.board = new board(this);
		this.board.drawBackground();

		this.brick = new brick(this,3,0);		
		this.brick.drawBrickMainScreen();
		this.nextBrick = new brick(this,3,0);
		this.nextBrick.drawBrickToNextScreen();
	}
	createNextBrick(){
		this.nextBrick = new brick(this,3,0);
		this.nextBrick.drawBrickToNextScreen();
	}
	startNextBrick(){
		this.brick = this.nextBrick;
	}
	startGame(){
		return setInterval(()=>{	
			this.brick.fall();		
		}, this.speed);
	}
	clearScreen(){
		this.context.clearRect(0, 0, _WIDTH, _HEIGHT);
		this.board.drawBackground();
	}
	draw(){
		this.clearScreen();			
		this.brick.drawBrickMainScreen();
	}
	loop(){
		this.draw();
		setTimeout(()=>this.loop(), 30);
	}

}
var g = new game();