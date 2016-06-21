diamantes = group();
for (i=1;i<=10;i++){
	element = sprite('diamante',random(800),random(400))
	element.tap(quitar);
	diamantes.add(element);
}

enemigos = group();
for (i=1;i<=8;i++){
	enemigos.add(sprite('enemigo',random(800),random(420)));
}

function quitar(event){
	
	console.info(event)
	if (event instanceof campusoft.spriteObj){
		console.info('tipo: campusoft.spriteObj')
	}
	
	if (event instanceof Phaser.Sprite){
		console.info('tipo: Phaser.Sprite')
	}
	
}