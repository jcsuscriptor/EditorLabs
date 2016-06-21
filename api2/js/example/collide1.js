diamante = sprite('diamante',60,300);
pig = sprite('pig',300,100);

collide(pig,diamante,choque);

function choque(){
	diamante.destroy();
}

function tap(){
	pig.move(x,y);
}