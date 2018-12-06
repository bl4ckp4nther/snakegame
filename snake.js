var canvas = document.getElementById('gameboard');
var ctx = canvas.getContext('2d');

var W = canvas.width;
var H = canvas.height;

var cell_width= 10;
var cell_height= 10;

var snake = {
		color: '#43464B',
		coods: [],
		cell_width: 10,
		cell_height: 10,
		speed_x: 10,
		speed_y: 10,
		direction: "right",
		score: 0,
		pause: false,
		init: function(){
			this.coods = [{'x':0,'y':0}];
			console.log('xxxxxxxxxxxx INIT xxxxxxxxxxxxxxx');
			console.log('canvas width:'+W+' height:'+H);
			snake.direction = 'right';
			snake.score = 0;
		},

		draw: function(){
			
			ctx.clearRect(0,0,W,H);
			
			for(i=0; i<this.coods.length; i++){
				var x = this.coods[i].x;
				var y = this.coods[i].y;
				ctx.fillStyle = this.color;
				ctx.fillRect(x*this.cell_width,y*this.cell_height,this.cell_width,this.cell_height);
			}
			food.draw();
			
		},
		
		play: function(){
			if(this.pause){
				clearInterval(game);
			}
			else{
				game = setInterval(update,100);
			}
		},
		
		checkIntersection: function(point){
			for(i=0; i<this.coods.length; i++){
				if (point.x == this.coods[i].x && point.y == this.coods[i].y){
					return true;
				}
			}
			return false;
		},
		
		ateSelf: function(point){
			if(this.coods.length>1){
				for(i=1; i<this.coods.length; i++){
					if (point.x == this.coods[i].x && point.y == this.coods[i].y){
						return true;
					}
				}
			}
			return false;
		},
		
		gameStart: function(){
			this.init();
			this.draw();
			food.createNew();
			game = setInterval(update,100);
		},
		
		gameOver: function(head, sn_direction){
			clearInterval(game);
			if(confirm("Game Over. Start New?"/*+head.x+" "+head.y+sn_direction*/)){
				this.gameStart();
			}
		},
}

var food = {
		x: 0,
		y: 0,
		color: '#FF0000',
		createNew: function(){
			var food_x = Math.floor(Math.random() * W/10);
			var food_y = Math.floor(Math.random() * H/10);
			var new_food_node = {'x': food_x, 'y': food_y}
			if (snake.checkIntersection(new_food_node)){
				this.createNew();
			}
			else{
				this.x = food_x;
				this.y = food_y;
				console.log('food x:'+this.x+' y:'+this.y);
				this.draw();
				return;
			}
		},
		draw: function(){
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x*cell_width,this.y*cell_height,cell_width,cell_height);
		},
		
}

snake.gameStart();
document.addEventListener('keydown',keyPress);

function update(){
	snake_len = snake.coods.length;

	var head = snake.coods[snake_len-1];
	snake.coods.shift();
	var new_node = JSON.parse(JSON.stringify(head));
	
	if(snake.direction=='right'){
		new_node.x += 1;
		snake.coods.push(new_node);
	}
	else if(snake.direction=='down'){
		new_node.y += 1;
		snake.coods.push(new_node);
	}
	else if(snake.direction=='left'){
		new_node.x -= 1;
		snake.coods.push(new_node);
	}
	else if(snake.direction=='up'){
		new_node.y -= 1;
		snake.coods.push(new_node);
	}
	
	if(head.x == food.x && head.y == food.y){
		snake.score += 1;
		document.getElementById('scorediv_span').innerHTML = snake.score;
		var tail = snake.coods[0];
		var new_tail = JSON.parse(JSON.stringify(tail));
		new_tail.x -= 1
		snake.coods.unshift(new_tail);
		food.createNew();
	}
	
	if(
		((head.x+1)*snake.cell_width >= W && snake.direction=='right')
		|| (head.x <= 0 && snake.direction=='left')
		|| ((head.y+1)*snake.cell_height >= H && snake.direction=='down')
		|| (head.y <= 0 && snake.direction=='up')
		//||snake.checkIntersection(head)
		){
		snake.gameOver(head, snake.direction);
		return;
	}
	
	snake.draw();
}

function keyPress(e){
//	console.log(e);
	if(e.key=="ArrowRight" && snake.direction != 'left'){
        snake.direction = "right";
    }
    else if(e.key=="ArrowLeft" && snake.direction != 'right'){
        snake.direction = "left";
    }
    else if(e.key=="ArrowDown" && snake.direction != 'up'){
        snake.direction = "down";
    }
    else if(e.key=="ArrowUp" && snake.direction != 'down'){
        snake.direction = "up";
    }
    else if(e.key==" "){
    	snake.pause = !snake.pause;
    	snake.play();
    }
	
	run_key_pressed = (e.key=="ArrowRight" || e.key=="ArrowLeft" || e.key=="ArrowDown" || e.key=="ArrowUp")
	if (run_key_pressed){
		if(snake.pause){
			snake.pause = false;
			snake.play();
		}
		update();
	}
	
	if(e.key=="i"){
		snake_len = snake.coods.length;
		head = snake.coods[snake_len-1];
		console.log(head);
		console.log(snake.direction);
	}
	
}
