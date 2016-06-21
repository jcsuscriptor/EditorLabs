diamantes = group();
for (i=1;i<=10;i++){
	diamanteSprite = sprite('diamante',random(800),random(400))
	diamantes.add(diamanteSprite);
}

estrellas = group();
for (i=1;i<=10;i++){
	estrellaSprite = sprite('star',random(800),random(400))
	estrellas.add(estrellaSprite);
}

pig = sprite('pig',300,500);
pig.scale.set(0.5)
 
collide(pig,diamantes,choque);

collide(pig,estrellas,morir);

function choque(pig,diamante){
	console.info('choque');
	diamante.destroy();
}

function morir(pig,star){
	console.info('morir');
	//pig.destroy();
	pig.kill();
}

function tap(){
	animation = tween(pig).to({x:x,y:y},1000);
}
