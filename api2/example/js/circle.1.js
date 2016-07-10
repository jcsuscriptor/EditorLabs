
var cantidad_circulos = 25;
var animaciones = [];
var anchoLinea = 6;

//trasparante
color('black',0);
stroke('cyan',anchoLinea-1);  //blue, orange, cyan,deeppink


for (var i = 0; i < cantidad_circulos; i++) {
   
    var circulo = circle(random(50,550), random(50,550),  (i + 1) * anchoLinea);
    circulo.alpha = 1 - i * 0.02;
    var ani = tween(circulo).to({x: 275, y: 200},(0.5 + i * 0.04) * 1500,"Elastic.easeOut"); //"Bounce.easeOut");
    animaciones.push({tween: ani, ref: circulo});

}


function tap(){
    for (var i = 0; i < cantidad_circulos; i++) {
        var circulo = animaciones[i].ref;
        var ani = animaciones[i].tween;
		//ani.to({x: x, y: y},(0.5 + i * 0.04) * 1500, "Bounce.easeOut");
        tween(circulo).to({x: x, y: y},(0.5 + i * 0.04) * 1500,"Elastic.easeOut"); //"Bounce.easeOut");
	}
}

