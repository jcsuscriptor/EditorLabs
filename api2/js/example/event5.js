diamante = sprite('diamante',20,30)
diamante.tap(eliminar)
	
function tap(){
	diamante = sprite('diamante',x,y)
	diamante.tap(eliminar)
	console.info('tap')
}

function eliminar(sprite){
	sprite.destroy()
	console.info('sprite.tap')
}