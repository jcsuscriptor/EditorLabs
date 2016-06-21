colors = []
colors[1] = 'blue';
colors[2] = 'red';
colors[3] = 'yellow';
colors[4] = 'green';
colors[5] = 'orange';
colors[6] = 'Brown';
colors[7] = 'Violet';
colors[8] = 'pink';
colors[9] = 'black';
colors[10] = 'Purple';


fill('blue')
text('Tap change background',20,0,'white')
function tap(){
	r = random(10);
	console.info(r);
	nuevoColor = Math.round(r);
	console.info('#:'+nuevoColor+ ', color: '+colors[nuevoColor]);
	fill(colors[nuevoColor]);
}

