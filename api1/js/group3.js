diamantes = group();
for (i=1;i<=10;i++){
	element = sprite('diamante',random(800),random(400))
	element.tap(quitar);
	diamantes.add(element);
}

function tap(){
	console.info("tap: ");
	element = sprite('diamante',x,y)
	element.tap(quitar);
	diamantes.add(element);
}
 
function quitar(){
	console.info("quitar: ");
	if (diamantes.length>0){
		item = diamantes.getAt(0);
		item.destroy();
		console.info("Length: " + diamantes.length);
	}
} 


 