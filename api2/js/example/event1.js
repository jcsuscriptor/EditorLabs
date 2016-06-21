perro = sprite('perro',10,100)
perro.tap(disminuir)

function disminuir(sprite){
	if (sprite.alpha>0)
		sprite.alpha -= 0.1
}