fill('city');
text('Tap!! para animar el tamaño'); 
diamante = sprite('diamante',100,200);

var aumentar = true;
function tap(){
	if (aumentar){
		diamante.animation({width:200,height:180});	
	}else{
		diamante.animation({width:32,height:28});	
	}
	aumentar = !aumentar;
}
