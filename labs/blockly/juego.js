var canvas = null,
    ctx = null,
	x = 50, 
	y = 50;

 
function paint(ctx) {
	
	ctx.fillStyle = '#999'; 
	ctx.fillRect(0, 0, canvas.width, canvas.height); 
	
    ctx.fillStyle = '#0f0';
    ctx.fillRect(x,y, 100, 60);
}

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    paint(ctx);
}

function avanzar(){
	
	x += 50; 
	if (x > canvas.width) { 
		x = 50; 
	} 
	
	paint(ctx);
}

window.addEventListener('load', init, false);  