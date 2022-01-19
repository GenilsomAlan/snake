const state = document.querySelector('#canvas')
const context = state.getContext('2d')
let pontuacao = document.querySelector('#score')

let arrayBody = [], Snakelength = 1
let positionX = positionY = 190
let direction = "up"
let score = 0

/*loop=()=>{//função que atualiza os frames do jogo
	snake()
	snakeBody()
	colisionBody()
	foodFruit()
	border()
	pontuacao.innerHTML = score
	requestAnimationFrame(loop)
}
requestAnimationFrame(loop)*/
let loop = setInterval(()=>{//função que atualiza os frames do jogo
	snake()
	snakeBody()
	colisionBody()
	foodFruit()
	clear()
	border()
	pontuacao.innerHTML = score
},1)
snake=()=>{//renderiza o movimento da snake
	context.fillStyle = "red"
	context.fillRect(positionX,positionY, 10, 10)
}
snakeBody=()=>{//mantem o array sempre do mesmo tamanho da cobra
	while(arrayBody.length > Snakelength)	arrayBody.shift()
}
registerPositions=()=>{//registra novo objeto com as posições atuais
	arrayBody.push({X: positionX, Y: positionY})
}
clear=()=>{//apaga rectangulo na posição do primeiro objeto no arrey
	context.fillStyle = "black"
	if(arrayBody.length > Snakelength)context.clearRect(arrayBody[0].X,arrayBody[0].Y,10,10)
}
move =event=>{
	registerPositions()
	let keyPressed = event.key
	if(keyPressed == 'ArrowUp'){
		direction = "up"
		positionY -= 10
	}
	if(keyPressed == 'ArrowDown'){
		direction = "down"
		positionY += 10
	}
	if(keyPressed == 'ArrowLeft'){
		direction = "left"
		positionX -= 10
	}
	if(keyPressed == 'ArrowRight'){
		direction = "right"
		positionX += 10
	}
	clear()
}
document.addEventListener('keydown', move)
draw=()=>{//desenha a fruta
	context.fillStyle = "green"
	context.fillRect(fruit.positionX,fruit.positionY,10,10)
}
randomic = () =>{
	let i = -1, randNumber
	do{//loop para garantir quer vai ser retornado um numero multiplo de 10
		randNumber = Math.floor(Math.random() * 400)
		if(randNumber%10 == 0) i = 1
	}while(i != 1)
	return randNumber
}
let fruit = {
	positionX: randomic(),
	positionY: randomic()
}
setTimeout(drawFruit=()=>{//desenha a primeira fruta
	draw()
},1000)

foodFruit=()=>{//altera a positção da fruta e o tamanho do corpo da cobra
	if (positionX == fruit.positionX && positionY == fruit.positionY){
		fruit.positionX = randomic()
		fruit.positionY = randomic()
		Snakelength += 1
		score++
		draw()
	}
}
let moving = setInterval(()=>{//move a cobra dinamicamente
	registerPositions()
	if(direction == 'up') positionY -= 10
	if(direction == 'down') positionY += 10
	if(direction == 'left') positionX -= 10
	if(direction == 'right') positionX += 10
	clear()
},250)

border=()=>{//mantem a cobra dentro do canvas
	if (positionX < 0) positionX = 390
	if (positionX > 390) positionX = 0
	if (positionY < 0) positionY = 390
	if (positionY > 390) positionY = 0
}
printGameOver=()=>{
	context.fillStyle = "white"
	context.font = "50px arial"
	context.fillText("Game Over!", 60, 200)
	context.font = "23px arial"
	context.fillText("pontuaçâo: " + score, 120, 250)
}
colisionBody=()=>{
	for (var i = 1; i < arrayBody.length; i++) {
		if (positionX == arrayBody[i].X && positionY == arrayBody[i].Y){
			printGameOver()
			clearInterval(moving)
			document.removeEventListener('keydown', move)
		}
	}
}