snake = sprite('snake2',10,100)
snake.drag(mover)

original_x = snake.x
original_y = snake.y
 
function mover(sprite,pointer){
	 console.info('pointer.x: '+pointer.x + " pointer.y: "+pointer.y)
	 sprite.move(original_x,original_y) 
}