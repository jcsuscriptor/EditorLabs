fill('city');
text('Tap!! para animar el objeto a x,y en el lugar del tap'); 
diamante = sprite('diamante',100,200);

function tap(){
	diamante.animation({x:x,y:y});	
}
