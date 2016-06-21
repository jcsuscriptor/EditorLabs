diamantes = group();

for (i=1;i<=10;i++){
	diamantes.add(sprite('diamante',random(250),random(400)));
}


pig = sprite('pig',300,100);

collide(pig,diamantes,recolectar);

function recolectar(player,diamante){
	//todo: como saber cual objeto del gruop choco.??
	diamante.destroy();
}

function tap(){
	pig.move(x,y);
}