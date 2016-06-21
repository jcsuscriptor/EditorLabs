fondos = []
fondos[0] = 'sky';
fondos[1] = 'dreaming';
fondos[2] = 'Zebras';
fondos[3] = 'Puffin';
fondos[4] = 'koala';
fondos[5] = 'Flowers';
fondos[6] = 'Bear';
fondos[7] = 'Starfish';
fondos[8] = 'mooseduo';
fondos[9] = 'PenguinOrnaments';

fill('koala')
text('Tap change background',20,0,'white')
function tap(){
	num = random(fondos);
	console.info('num:'+num);
	newFill = fondos[num];
	console.info('fondo:'+newFill);
	fill(newFill);
}

