nave = sprite('starship')
nave.scale = 50
nave.y = game.height - (nave.height/2)
nave.x =  nave.width/2
nave.tap(disparar)

createEnemigo()
derecha = true
//1000 ms = 1 second.
setInterval(disparar_enemigo, 1000);
 
function createEnemigo(){
	enemigo = sprite('starshipdark')
	enemigo.scale = 50
	enemigo.y = enemigo.height/2
	enemigo.x = random(800)
	enemigo.rotate = 180
	collide(enemigo,nave,perder);	
	
	//Todo: MEJORAR
	//game.physics.startSystem(Phaser.Physics.ARCADE);
	//game.physics.arcade.enable(enemigo.wrapper);
	
} 

function loop(){
	if (!enemigo.wrapper.alive){
		createEnemigo()
	}
	
	if (derecha) 
		enemigo.wrapper.body.velocity.x = 250;	
	else
		enemigo.wrapper.body.velocity.x = -250;	
	
	if (enemigo.x < 50){
		derecha = true
	}
	
	if (enemigo.x > game.width){
		console.info('cambiar')
		derecha = false
	}
	
	//enemigo.move(random(800), enemigo.y)
} 

function tap(){
	if (x>nave.x){
		nave.x = nave.x + 40
	}else if(x<nave.x){
		nave.x = nave.x - 40
	}
}
function disparar_enemigo(){
	console.info('disparar_enemigo')

	projectile_enemigo = sprite('projectile1')
	projectile_enemigo.x = enemigo.x
	projectile_enemigo.y = enemigo.y
	projectile_enemigo.animation({y:game.height+projectile_enemigo.height},1000);
	collide(nave,projectile_enemigo,perder);
}
function disparar(){
	projectile = sprite('projectile2')
	projectile.x = nave.x
	projectile.y = nave.y - (nave.height)
	projectile.animation({y:-projectile.height},1000);
	collide(enemigo,projectile,destruir);	
}

function destruir(){
	enemigo.destroy()
	disparos_enemigo = false
}

function perder(){
	nave.destroy()
}