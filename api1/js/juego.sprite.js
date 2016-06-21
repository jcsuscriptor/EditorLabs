console.log('iniciar');
perro = sprite('perro',10,100);
perro.move(20,10);

 

function loop() {
   perro.move(perro.x+1,perro.y);
   if (perro.x>600){
	   perro.x = 0;
   }
}

