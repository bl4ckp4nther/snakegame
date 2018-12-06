var snake = {
		color: '#43464B',
		coods: [],
		cell_width: 10,
		cell_height: 10,
		speed_x: 10,
		speed_y: 10,
		direction: "right",
		init: function(){
			for(i=0; i<=4; i++){
				console.log('x',i,' y',0);
				this.coods.push({'x':i,'y':0});
				console.log(this.coods);
			}
			console.log('xxxxxxxxxxxx INIT xxxxxxxxxxxxxxx');
		},

		draw: function(){
			
			var canvas = document.getElementById('gameboard');
			var ctx = canvas.getContext('2d');
			
			var W = canvas.width;
			var H = canvas.height;
			
			ctx.clearRect(0,0,W,H);
			
			for(i=0; i<this.coods.length; i++){
				var x = this.coods[i].x;
				var y = this.coods[i].y;
				ctx.fillStyle = this.color;
				ctx.fillRect(x*this.cell_width,y*this.cell_height,this.cell_width,this.cell_height);
			}
			
		},
}

document.addEventListener('keydown',keyPress);

snake.init();
snake.draw();
setInterval(update,100);

function update(){
	/*for(i=0; i<snake.coods.length; i++){
		snake.coods[i].x += 1;
	}*/
	console.log(snake.direction);
	snake_len = snake.coods.length;

//	var head = snake.coods[snake_len-1];
//	snake.coods.shift();
//	var new_node = JSON.parse(JSON.stringify(head));
//	new_node.y += 1;
//	snake.coods.push(new_node);

	var head = snake.coods[snake_len-1];
	snake.coods.shift();
	var new_node = JSON.parse(JSON.stringify(head));
	
	if(snake.direction=='right'){
		console.log('right move');
		new_node.x += 1;
		snake.coods.push(new_node);
	}
	else if(snake.direction=='down'){
		console.log('down move');
		new_node.y += 1;
		snake.coods.push(new_node);
	}
	else if(snake.direction=='left'){
		console.log('left move');
		new_node.x -= 1;
		snake.coods.push(new_node);
	}
	else if(snake.direction=='up'){
		console.log('up move');
		new_node.y -= 1;
		snake.coods.push(new_node);
	}
	snake.draw();
}

function keyPress(e){
	if(e.key=="ArrowRight"){
		console.log('right');
        snake.direction = "right";
    }
    else if(e.key=="ArrowLeft"){
		console.log('left');
        snake.direction = "left";
    }
    else if(e.key=="ArrowDown"){
		console.log('down');
        snake.direction = "down";
    }
    else if(e.key=="ArrowUp"){
		console.log('up');
        snake.direction = "up";
    }
	update();
}
