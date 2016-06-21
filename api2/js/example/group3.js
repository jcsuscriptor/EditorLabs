diamantes = group();
for (i=1;i<=10;i++){
	diamantes.create(random(800),random(400),'diamante');
}

diamantes.setAll('x',200)

function eliminar(sprite){
	sprite.destroy();
}
