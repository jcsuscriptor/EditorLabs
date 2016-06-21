gato = sprite('gato',30);
text('Tap en cualquier punto!! para aumentar-disminuir trasparencia');
alpha = 1;
restar = true;
function tap(){
	
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