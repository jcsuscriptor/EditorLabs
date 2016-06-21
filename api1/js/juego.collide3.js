diamantes = group();
for (i=1;i<=10;i++){
	diamantes.add(sprite('diamante',random(800),random(400)));
}

enemigos = group();
for (i=1;i<=5;i++){
	enemigos.add(sprite('enemigo',random(800),random(420)));
}

pig = sprite('pig',300,460);
pig.scale = 50;

collide(pig,diamantes,recolectar);
collide(pig,enemigos,juego_perder);

perdio = false;
function recolectar(player,diamante){
	//todo: como saber cual objeto del gruop choco.??
	diamante.destroy();
}

function juego_perder(player,enemigo){
	text('Perdio...',enemigo.x,enemigo.y,'red');
	//player.destroy();
	perdio = true;
}

function tap(){
	if (!perdio){
		pig.move(x,y);
	}
}