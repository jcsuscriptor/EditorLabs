obj = sprite('perro',50,20);

var es_perro = true;

function tap(){
	if (es_perro){
		obj.change('gato');
	}else{
		obj.change('perro');
	}
	es_perro = !es_perro;
}

