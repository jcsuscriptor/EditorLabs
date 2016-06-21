diamantes = group();
for (i=1;i<=10;i++){
	diamanteSprite = sprite('diamante',random(800),random(400))
	diamantes.add(diamanteSprite);
}

pig = sprite('pig',300,500);
pig.scale.set(0.5)
 
collide(pig,diamantes,choque);

function choque(pig,diamante){
	console.info('choque');
	diamante.destroy();
}

function tap(){
	animation = tween(pig).to({x:x,y:y},1000);
}
