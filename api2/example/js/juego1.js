diamantes = group();
projectiles = group();
for (i=1;i<=20;i++){
	diamante = sprite('diamante',random(800),random(400))
	console.info('diamante.body: ' + diamante.body);
	diamantes.add(diamante);
}

nave = sprite('starship',0,500)
nave.scale.set(0.3)

animation = tween(nave).to({x:800},3000,"Linear",true,0,-1,true)

collide(projectiles,diamantes,eliminar);

function tap(){
	projectile = sprite('projectile2')
	projectile.x = nave.x
	projectile.y = nave.y - (nave.height)
	console.info('projectile.body: ' + projectile.body);
	projectiles.add(projectile)
	
	animation = tween(projectile).to({y:-projectile.height},1000) 
}

function eliminar(projectile,diamante){
	//diamante.destroy()
	diamante.kill()
	//projectile.destroy()
	projectile.kill()
}