fill('city');
text('Tap!! para iniciar Animacion'); 
perro = sprite('perro',100,200);

function tap(){
	perro.animation({x:x},2000);	
}
