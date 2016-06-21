gato = sprite('gato',30);
text('Tap en el personaje!! para aumentar-disminuir trasparencia');

gato.tap(tapGato);

alpha = 1;
restar = true;
function tapGato(){
	
	if (restar){
		alpha -= 0.1;
	}else{
		alpha += 0.1;
	}
	if (alpha<=0){
		restar = false;
	}else if (alpha>=1){
		restar = true;
	}
	
	gato.alpha = alpha;
	 
}

/* PROBLEMAS A TENER LISTER ASOCIADO AL JUEGO Y UN OBJETO.
SE EJECUTA AMBOS

function tap(){
	alpha += 0.1;
	gato.alpha(alpha);
	
}

*/