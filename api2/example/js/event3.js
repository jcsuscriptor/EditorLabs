snake = sprite('snake2',10,100)
snake.drag(crear)
 
function crear(element,pointer){
	 sprite('diamante',pointer.x,pointer.y)
}