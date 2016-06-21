fill('city');
text('Tap!! para animar el trasparencia del personaje'); 
perro = sprite('perro',100,200);

function tap(){
	perro.animation({alpha:0.5},2000);	
}