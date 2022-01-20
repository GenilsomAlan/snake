const state = document.querySelector('#canvas')
const context = state.getContext('2d')
let pontuacao = document.querySelector('#score')

let arrayBody = [], Snakelength = 0
let positionX = positionY = 190
let direction = "up", score = 0
let arrayWall = [], arrayFruit = []

let loop = setInterval(()=>{//função que atualiza os frames do jogo
	context.fillStyle = "red"
	context.fillRect(positionX,positionY, 10, 10)
	snakeBody()
	pontuacao.innerHTML = score
})
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
document.addEventListener('keydown', move=event=>{
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
	snakeBody()
})
let moving = setInterval(()=>{//move a cobra dinamicamente
	registerPositions()
	if(direction == 'up') positionY -= 10
	if(direction == 'down') positionY += 10
	if(direction == 'left') positionX -= 10
	if(direction == 'right') positionX += 10
	clear()
	snakeBody()
},100)
border= setInterval(()=>{//mantem a cobra dentro do canvas
	if (positionX < 0) positionX = 390
	if (positionX > 390) positionX = 0
	if (positionY < 0) positionY = 390
	if (positionY > 390) positionY = 0
})
randomic = () =>{
	let i = -1, randNumber
	do{//loop para garantir quer vai ser retornado um numero multiplo de 10
		randNumber = Math.floor(Math.random() * 400)
		if(randNumber%10 == 0) i = 1
	}while(i != 1)
	return randNumber
}
let fruit = {
	positionX: randomic(),//
	positionY: randomic(),
	draw: ()=>{//desenha a fruta
		context.fillStyle = "green"
		context.fillRect(fruit.positionX,fruit.positionY,10,10)
	},
	clear: ()=>{
		context.fillStyle = "black"
		context.fillRect(fruit.positionX,fruit.positionY,10,10)
	}
}
let drawFruit = setInterval(()=>{//desenha a primeira fruta e a parede
	fruit.draw()
	arrayWall.push({wallX: wall.positionX, wallY: wall.positionY})
	wall.draw()
},10)
let foodFruit = setInterval(()=>{//altera a positção da fruta e o tamanho do corpo da cobra
	if (positionX == fruit.positionX && positionY == fruit.positionY){
		fruit.positionX = randomic()
		fruit.positionY = randomic()
		Snakelength += 1
		score++
		fruit.draw()
	}
})
let wall = {
	positionX: randomic(),
	positionY: randomic(),
	draw: ()=>{//desenha a parede
		context.fillStyle = "gray"
		context.fillRect(wall.positionX,wall.positionY,10,10)
	}
}
let drawWall = setInterval(()=>{//desenha a parede a cada 8 s
	wall.positionX = randomic()
	wall.positionY = randomic()
	arrayWall.push({wallX: wall.positionX, wallY: wall.positionY})
	wall.draw()
},8000)
gameOver=()=>{
	printGameOver()
	clearInterval(loop)
	clearInterval(moving)
	clearInterval(drawWall)
	clearInterval(drawFruit)
	document.removeEventListener('keydown', move)
}
let colision = setInterval(()=>{
	for (var i = 0; i < arrayBody.length; i++) {//colisão com si mesmo
		if (positionX == arrayBody[i].X && positionY == arrayBody[i].Y){
			gameOver()
		}
	}
	for (var i = 0; i < arrayWall.length; i++) {//colisão com a parede "gray"
		if (positionX == arrayWall[i].wallX && positionY == arrayWall[i].wallY){
			gameOver()
		}
	}
})
printGameOver=()=>{
	context.fillStyle = "white"
	context.font = "50px arial"
	context.fillText("Game Over!", 60, 200)
	context.font = "23px arial"
	context.fillText("pontuaçâo: " + score, 120, 250)
}
///mobile
const arrowLeftButton = document.querySelector('#arrowLeft')
const arrowRigthButton = document.querySelector('#arrowRigth')
const arrowTopButton = document.querySelector('#arrowTop')
const arrowBottomButton = document.querySelector('#arrowBottom')

arrowLeftButton.addEventListener('click',()=>{
	registerPositions()
	direction = "left"
	positionX -= 10
	clear()
	snakeBody()	
})
arrowRigthButton.addEventListener('click',()=>{
	registerPositions()
	direction = "right"
	positionX += 10
	clear()
	snakeBody()
})
arrowTopButton.addEventListener('click',()=>{
	registerPositions()
	direction = "up"
	positionY -= 10
	clear()
	snakeBody()	
})
arrowBottomButton.addEventListener('click',()=>{
	registerPositions()
	direction = "down"
	positionY += 10
	clear()
	snakeBody()	
})